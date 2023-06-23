import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImagePreview = ({ file }: any) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (file) {
      if (typeof file === "string") {
        fetch(file)
          .then((r) => r.blob())
          .then((blob) => {
            setPreview(URL.createObjectURL(blob));
          });
      } else if (file instanceof Blob) {
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setPreview(null);
    }
  }, [file]);

  return <>{preview && <img src={preview} alt="Preview" />}</>;
};

const AnotherDropImage = ({ value, onChange }: any) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
  });
  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        className={`flex cursor-pointer items-center justify-center overflow-hidden border border-muted bg-gray-50 dark:bg-dark dark:text-light`}
      >
        <input
          type="file"
          {...getInputProps({
            name: "cover_image",
            //   value: value,
            onChange: onChange,
          })}
        />
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
      </div>
      <ImagePreview file={value} />
    </>
  );
};

export default AnotherDropImage;
