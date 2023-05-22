import API from "@/lib/api";

export const uploadByFile = (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return API.post("upload-image", formData).then(({ data }) => {
        return {
            success: 1,
            file: {
                url: `https://ik.imagekit.io/huvmeuk1y/${data.name}`,
                imageId: data.image_id,
            },
        };
    });
};