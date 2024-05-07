"use client";
import { Session } from "inspector";
import { Button } from "@/components/ui/button";
import LoginWithGoogle from "@/components/ui/loginWithGoogle";
import { signIn, signOut, useSession } from "next-auth/react";
import SparklesText from "../hero/LandingSparkles";

export default function Landing({ session }: { session?: any }) {
  return (
    <div>
      <SparklesText></SparklesText>
      {!session && (
        <div className="justify-center items-center flex ">
          <LoginWithGoogle></LoginWithGoogle>
        </div>
      )}
    </div>
  );
}
