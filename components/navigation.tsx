import {signIn, signOut, useSession} from "next-auth/react";
import {UserValided} from "@/interface/User";
export default function Navigation() {
    const {data: session} = useSession()
    const user = session?.user as  UserValided
    return (
        <nav className="mx-6 p-5 flex flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Projet Cloud</h1>
            </div>
            <div>
             {session ? (
                 <div className="flex flex-row items-center gap-5">
                        <h1>{user.email}</h1>
                        <h2>{user.role}</h2>
                        <button className="btn btn-error" onClick={signOut}>Sign out</button>
                    </div>
                ) : (
                 <button className="btn btn-primary" onClick={signIn}>Sign in</button>
              )}
            </div>
        </nav>
    );
}