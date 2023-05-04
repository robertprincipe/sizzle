import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

type IConfirmOperationProps = {
  title: string;
  description?: string;
  showDeleteAlert: boolean;
  setShowDeleteAlert: (value: boolean) => void;
  onConfirm: () => void;
};

const ConfirmOperation = ({
  title,
  description,
  setShowDeleteAlert,
  showDeleteAlert,
  onConfirm,
}: IConfirmOperationProps) => {
  return (
    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => onConfirm()}
            className="bg-red-600 focus:ring-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmOperation;
