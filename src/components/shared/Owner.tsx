import { useAuthStore } from "@/store/auth";
import { ROLES } from "@/types/iuser";

type IOwnerProps = {
  authorId: string;
  children: React.ReactNode;
};

const Owner = ({ authorId, children }: IOwnerProps) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!user) return null;
  const hasRole = [ROLES.ADMIN, ROLES.MODERATOR].includes(
    user.role || ROLES.USER
  );
  const isAuthor = user?.id === authorId;
  const canView = isAuthenticated && hasRole && isAuthor;

  return canView ? <>{children}</> : null;
};

export default Owner;
