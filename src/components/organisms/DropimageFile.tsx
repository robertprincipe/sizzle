import { X } from "lucide-react";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type IDropImageFileProps = {
  value?: File | string | null;
  onChange: (file?: Blob | string | null) => void;
};

type IImagePreviewProps = {
  image?: Blob | string | null;
  onRemove: Function;
};

const ImagePreview = ({ image, onRemove }: IImagePreviewProps) => {
  const [preview, setPreview] = useState<string>();

  const getPreview = async (image: string | Blob) => {
    let file = image;
    if (image && typeof image === "string") {
      file = await fetch(image).then((r) => r.blob());
    }
    if (!preview && file instanceof Blob) {
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (image) getPreview(image);
  }, []);

  const remove = () => {
    setPreview(undefined);
    onRemove();
  };

  return (
    <>
      {preview ? (
        <div className="relative w-full h-40">
          <img
            alt="Image preview"
            src={preview}
            className={`object-cover w-full h-64 scale-110 rounded-xl m-0`}
          />
          <div className={`absolute top-1.5 right-1.5`}>
            <button
              className="inline-flex items-center text-sm font-medium text-center text-light bg-red-600 rounded-md px-0.5 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-600"
              type="button"
              onClick={() => remove()}
            >
              <X className="w-5" />
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

const DropImageFile: React.FC<IDropImageFileProps> = ({ value, onChange }) => {
  const imageUrl = useMemo(() => {
    if (value && value instanceof File) {
      return URL.createObjectURL(value);
    }

    return value;
  }, [value]);

  const [file, setFile] = useState<any>();
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    // console.log(acceptedFiles[0]);
  }, []);

  useEffect(() => {
    onChange(file);
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept: { images: ["*"] },
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className={cn(
        `flex cursor-pointer items-center justify-center overflow-hidden border border-dotted rounded-lg shadow-lg border-border`,
        imageUrl ? "h-64" : "h-20"
      )}
    >
      {!imageUrl ? (
        <>
          <input
            type="file"
            {...getInputProps({
              onChange: (e) => {
                // e.target.files ? onChange(e.target?.files[0]) : null;
              },
            })}
            multiple={false}
            className="hidden"
          />
          <div className="flex flex-col items-center p-2 text-center">
            {isDragActive ? (
              <span className="text-xs font-light">Suelta la imágen</span>
            ) : (
              <span className="text-xs">
                <span className="font-bold">Abrir imagen</span> o arrastra y
                suelta las imágenes que deseas subir
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="relative w-full h-full">
          <img
            alt="Image preview"
            src={imageUrl}
            className={`object-cover object-center w-full m-0`}
          />
          <div className={`absolute top-1.5 right-1.5 z-10`}>
            <Button
              variant="destructive"
              type="button"
              size="sm"
              onClick={() => setFile(null)}
            >
              <X className="w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropImageFile;
