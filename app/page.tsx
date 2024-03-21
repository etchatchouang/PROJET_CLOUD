"use client"
import {signIn, signOut, useSession} from "next-auth/react";

export default function Home() {
    const {data: session} = useSession()
  return (
   <div>
     <button onClick={() => signIn()}>Sign in</button>
       {session ? (
           <div>
               <h1>Welcome {session.user?.email}</h1>
                <button onClick={() => signOut()}>Sign out</button>
           </div>
         ) : null}
   </div>
  );
}
