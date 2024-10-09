"use client";

import { useAuthStore } from "@/store/auth";

import { z } from "zod";
import UpdateAccountForm from "./update-account-form";
import Heading from "@/components/layouts/components/Heading";

const AccountPage = () => {
  const user = useAuthStore((state) => state.user);

  return <>
<Heading title="Actualizar perfil" description="Como quieras" />
  {user && <UpdateAccountForm user={user} />}
  </>;
};

export default AccountPage;


