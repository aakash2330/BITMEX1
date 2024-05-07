import { Button } from "@/components/ui/button";
import Landing from "@/components/ui/landing";
import LoginWithGoogle from "@/components/ui/loginWithGoogle";
import { authOptions, getServerAuthSession } from "@/lib/auth";
import { signIn, signOut, useSession } from "next-auth/react";

export default async function Page() {
  const session = await getServerAuthSession();
  return <Landing></Landing>;
}
