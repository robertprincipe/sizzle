import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type IDropimageProps = {
  imageUrl?: Blob | string;
  onRemoveImageUrl?: () => void;
  setImageFile: (file?: Blob | string) => void;
  isCircle?: boolean;
  size?: "sm" | "md" | "lg";
  previewSize?: "sm" | "md" | "lg";
};

const Dropimage: React.FC<IDropimageProps> = ({
  imageUrl,
  onRemoveImageUrl,
  setImageFile,
  isCircle,
  size,
  previewSize,
}) => {
  const [imagePreview, setImagePreview] = useState<
    string | ArrayBuffer | null | undefined
  >("");
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result);
        setImageFile(file);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    if (imageUrl && typeof imageUrl === "string")
      fetch(imageUrl)
        .then((r) => r.blob())
        .then((blob) => {
          setImagePreview(URL.createObjectURL(blob));
        });

    return () => {
      setImagePreview(undefined);
      setImageFile(undefined);
    };
  }, [imageUrl]);

  const removeImageFromState = () => {
    if (imageUrl && onRemoveImageUrl) {
      onRemoveImageUrl();
    }
    setImagePreview(undefined);
    setImageFile(undefined);
  };

  const SIZES = {
    sm: "h-8 w-8",
    md: "h-20",
    lg: "h-12 w-12",
  };

  const PREVIEW_SIZES = {
    sm: "h-8 w-8",
    md: "h-40",
    lg: "h-12 w-12",
  };

  return (
    <div className={`relative ${isCircle ? "w-fit" : "w-full"}`}>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`flex cursor-pointer items-center justify-center overflow-hidden ${
          imagePreview ? "" : "border border-gray-300"
        } bg-gray-50 dark:bg-gray-800 dark:text-white ${
          isCircle
            ? `${SIZES[size || "md"]} rounded-full`
            : imagePreview
            ? `h-${
                isCircle
                  ? "w-48 h-48"
                  : ` ${PREVIEW_SIZES[previewSize || "md"]}`
              } rounded-md`
            : `${SIZES[size || "md"]} rounded-md`
        }`}
      >
        {!imagePreview ? (
          <>
            <input type="file" {...getInputProps()} className="hidden" />
            <div className="flex flex-col items-center p-2 text-center">
              {isDragActive ? (
                <span className="text-xs font-light">Suelta la imágen</span>
              ) : (
                <span className="text-xs">
                  <span className="font-bold text-gray-900 dark:text-white">
                    Abrir imagen
                  </span>{" "}
                  o arrastra y suelta las imágenes que deseas subir
                </span>
              )}
            </div>
          </>
        ) : (
          <img
            alt=""
            src={imagePreview?.toString()}
            className={`object-cover w-full h-full scale-110 ${
              isCircle ? "rounded-full " : ""
            }`}
          />
        )}
      </div>

      {imagePreview ? (
        <div
          className={`absolute ${
            isCircle ? "bottom-7 right-7" : "top-1.5 right-1.5"
          }`}
        >
          <button
            className="inline-flex items-center text-sm font-medium text-center text-white bg-red-600 rounded-md px-0.5 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-600"
            type="button"
            onClick={removeImageFromState}
          >
            <X className="w-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Dropimage;
