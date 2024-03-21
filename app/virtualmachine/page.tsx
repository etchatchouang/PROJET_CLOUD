"use client"
import {signIn, signOut, useSession} from "next-auth/react";
import { ConfirmedUser } from "@/interface/User";

export default function VirtualMachine() {
    const { data: session } = useSession();
    const user = session?.user as ConfirmedUser;

    return (
        <main>
            <div className={"flex flex-row justify-center items-center"}>
                {session ? (
                    <VirtualMachine/>) : null}
            </div>
        </main>
    );
}
