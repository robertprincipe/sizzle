from django.core.files.storage import Storage
from imagekitio import ImageKit
from base64 import b64encode
from core import settings


class ImageKitStorage(Storage):
    url_endpoint = settings.IMAGEKIT_URL_ENDPOINT

    def __init__(self):
        self.imagekit = ImageKit(
            private_key=settings.IMAGEKIT_PRIVATE_KEY,
            public_key=settings.IMAGEKIT_PUBLIC_KEY,
            url_endpoint=self.url_endpoint,
        )

    def _save(self, name, content):
        image_info = self.imagekit.upload_file(
            file=b64encode(content.read()),
            file_name=name,
        )
        return f"{image_info.file_id}-{image_info.name}"

    def url(self, name):
        url = name[25:] if "-" in name else ""

        return f"{self.url_endpoint}/{url}"

    def exists(self, name):
        pass

    def delete(self, name):
        try:
            file_id = name[:24] if "-" in name else ""
            self.imagekit.delete_file(file_id=file_id)
            return True
        except:
            return False
