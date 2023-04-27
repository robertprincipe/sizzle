import { useToast } from "@/hooks/use-toast";
import { activation } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigation, useParams } from "react-router-dom";

const ActivatePage = () => {
  const { uid, token } = useParams();
  const router = useNavigation();
  const { toast } = useToast();
  const { isError } = useMutation(() => activation(uid || "", token || ""), {
    onSuccess: () => {
      // router
      toast({
        description: "Tu registro se realizo correctamente",
      });
    },
    onError: (error) => {},
  });
  return (
    <div>{isError ? <div>Token no valido</div> : <div>Bienvenido</div>}</div>
  );
};

export default ActivatePage;
