"use client"
import { Session } from "inspector";
import { Button } from "@/components/ui/button";
import LoginWithGoogle from "@/components/ui/loginWithGoogle";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Landing({session}:{session?:any}){
return <div className="flex flex-col gap-10 justify-center items-center">
      {JSON.stringify(session?.user)}
      {session?.user && (
        <Button
          onClick={() => {
            signOut();
          }}
        >
          {" "}
          Logout{" "}
        </Button>
      )}
    </div>

}
