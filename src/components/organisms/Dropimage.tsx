import { X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type IDropimageProps = {
  putImage: (file: Blob) => void;
  imageUrnSaved?: string;
};

const Dropimage: React.FC<IDropimageProps> = ({ putImage, imageUrnSaved }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null | undefined>(
    ""
  );
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result);
        putImage(file);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const removeImageFromState = () => {
    setImage("");
    putImage({} as Blob);
  };

  return (
    <div className="relative">
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-md border border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-white ${
          image ? "h-48" : "h-16"
        }`}
      >
        {imageUrnSaved ? (
          <img
            alt=""
            src={imageUrnSaved}
            className="object-cover w-full h-full scale-110"
          />
        ) : (
          <>
            {!image ? (
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
                src={image?.toString()}
                className="object-cover w-full h-full scale-110"
              />
            )}
          </>
        )}
      </div>

      {image || imageUrnSaved ? (
        <div className="absolute top-1.5 right-1.5">
          <button
            className="inline-flex items-center p-1 text-sm font-medium text-center text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-600"
            type="button"
            onClick={removeImageFromState}
          >
            <X />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Dropimage;
