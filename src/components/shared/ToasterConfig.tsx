import { useTheme } from "@/hooks/useTheme";
import { Toaster } from "sonner";

const ToasterConfig = () => {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      position="bottom-right"
      richColors
      // className="w-full"
      // expand
      // toastOptions={{ className: "w-full" }}
      closeButton
      theme={resolvedTheme}
    />
  );
};

export default ToasterConfig;
