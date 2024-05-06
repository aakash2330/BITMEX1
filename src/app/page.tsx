import { Button } from "@/components/ui/button";
import Landing from "@/components/ui/landing";
import LoginWithGoogle from "@/components/ui/loginWithGoogle";
import { authOptions, getServerAuthSession } from "@/lib/auth";
import { signIn, signOut, useSession } from "next-auth/react";

export default async function Page() {
  const session = await getServerAuthSession();
  if (session?.user) {
    return <Landing session={session}></Landing>;
  } else {
    return (
      <div className="flex justify-center items-center gap-4 ">
        <div>Login With &nbsp;&nbsp; :</div>
        <LoginWithGoogle></LoginWithGoogle>
      </div>
    );
  }
}