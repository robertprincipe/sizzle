import API from "@/lib/api";
import ImageTool from "@editorjs/image";

export default class ImageKit extends ImageTool {
  async removed() {
    const imageId = this._data.file.imageId;
    if (imageId.length && imageId.length === 24) {
      try {
        await API.delete(`/remove-image/${imageId}`);
      } catch (_) { }
    }
  }
}
