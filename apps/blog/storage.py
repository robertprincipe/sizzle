from django.core.files.storage import Storage
from imagekitio import ImageKit
from base64 import b64encode

class ImageKitStorage(Storage):
    def __init__(self):
        self.imagekit = ImageKit(
            private_key='private_ncPTBGlAm9HVVp0G+EyeKg8IzFs=',
            public_key='public_srYqfXrE2h730JGzsesFir4MMTI=',
            url_endpoint='https://ik.imagekit.io/huvmeuk1y'
        )
    def _save(self, name, content):
        image_info = self.imagekit.upload_file(
            file=b64encode(content.read()),
            file_name=name,
        )

        print(image_info.response_metadata.raw)

        return image_info.response_metadata.raw["fileId"]

    def url(self, name):
        return name

    def exists(self, name):
        print(name)
        # remote_file_url_metadata = self.imagekit.get_remote_file_url_metadata(remote_file_url="image_url")
        # Final Result
        # print(remote_file_url_metadata)

        # Raw Response
        # print(remote_file_url_metadata.response_metadata.raw)
        pass

    def _delete(self, name):

        # if self.exists(name):
        print(name)
        deleted_file = self.imagekit.delete_file(file_id=name)
        # print(deleted_file.response_metadata.raw)
            # return True
        return True