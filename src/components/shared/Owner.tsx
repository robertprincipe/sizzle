import { useAuthStore } from "@/store/auth";
import { ROLES } from "@/types/iuser";

type IOwnerProps = {
  authorId: string;
  children: React.ReactNode;
};

const Owner = ({ authorId, children }: IOwnerProps) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return null;
  if (user?.id !== authorId) return null;
  if ([ROLES.ADMIN, ROLES.MODERATOR].includes(user.role || ROLES.USER))
    return null;

  return <>{children}</>;
};

export default Owner;
