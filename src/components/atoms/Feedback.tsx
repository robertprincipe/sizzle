import { FieldError } from "react-hook-form";

type IFeedbackProps = {
  field?: FieldError;
};

const Feedback = ({ field }: IFeedbackProps) => {
  return (
    <>
      {field && (
        <span className="text-red-500 text-xs">
          {field.message || "Hubo un error"}
        </span>
      )}
    </>
  );
};

export default Feedback;
