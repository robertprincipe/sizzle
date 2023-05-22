import { useAuthStore } from "@/store/auth";
import { ROLES } from "@/types/iuser";

type IOwnerProps = {
  username: string;
  children: React.ReactNode;
};

const IsAuthenticatedSameUserProfile = ({
  username,
  children,
}: IOwnerProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const isSameUser = user?.username === username;
  const canView = isAuthenticated && isSameUser;

  return canView ? <>{children}</> : null;
};

export default IsAuthenticatedSameUserProfile;
