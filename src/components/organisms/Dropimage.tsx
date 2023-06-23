import { X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

type IDropimageProps = {
  imageUrl?: Blob | string | null;
  setImageFile: (file?: Blob | string | null) => void;
  isCircle?: boolean;
  size?: "sm" | "md" | "lg";
  previewSize?: "sm" | "md" | "lg";
  onChange?: Function;
};

const Dropimage: React.FC<IDropimageProps> = ({
  imageUrl,
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
    setImagePreview(undefined);
    setImageFile(null);
  };

  const SIZES = {
    sm: "h-8 w-8",
    md: "h-20",
    lg: "h-12 w-12",
  };

  const PREVIEW_SIZES = {
    sm: "h-8 w-8",
    md: "h-64",
    lg: "h-12 w-12",
  };

  return (
    <div className={`relative ${isCircle ? "w-fit" : "w-full"}`}>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`flex cursor-pointer items-center justify-center overflow-hidden ${
          imagePreview ? "" : "border border-muted"
        } bg-gray-50 dark:bg-dark dark:text-light ${
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
                  <span className="font-bold text-app-dark dark:text-light">
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
            className="inline-flex items-center text-sm font-medium text-center text-light bg-red-600 rounded-md px-0.5 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-600"
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
