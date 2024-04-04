import {useSession} from "next-auth/react";
import {FaDebian, FaUbuntu, FaWindows} from "react-icons/fa6";
import {UserValided} from "@/interface/User";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {router} from "next/client";
import {useRouter} from "next/navigation";

export default function Virtual() {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({});
    const [result, setResult] = useState(false);
    const [timer, setTimer] = useState(600);
    const router = useRouter();


    useEffect(() => {
        const countdown = setTimeout(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(countdown);
                handleTimerEnd();
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [timer]);

    const handleTimerEnd = async () => {
        await fetch("/api/vm", {
            method: "DELETE"
        });
        toast.success("Machine virtuelle supprimé !");
        setCredentials({});
        setResult(false);
        router.refresh();
    };

    async function startHandling(param) {
        try {
            setLoading(true);
            const response = await fetch("/api/vm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ param })
            });
            if (response.ok) {
                const data = await response.json();
                setCredentials(credentials => ({
                    ...credentials,
                    [param]: {
                        username: data.resourceGroupName.adminUsername,
                        password: data.resourceGroupName.adminPassword
                    }
                }));
                setResult(true);
                setTimer(600);
            } else {
                console.error("La requête a échoué avec le statut :", response.status);
            }
        } catch (error) {
            console.error("Erreur lors de la création de la machine virtuelle !", error);
        } finally {
            setLoading(false);
        }
    }
    

    const { data: session } = useSession();
    const user = session?.user as UserValided;
    return (
        <div className={"h-screen flex flex-col gap-2"}>
            {session ? (
                <>
                    <div className={"flex flex-row justify-between gap-5 mx-20 mt-20 text-center"}>
                        {user.role === "basic" && (
                            <div className={"w-screen"}>
                                <h2 className={"text-center text-4xl mt-10"}>Mettre à jour votre compte pour avoir la machine virtuelle</h2>
                            </div>
                        )}
                        {user.role === "prenium" && (
                            <div>
                                <FaDebian onClick={() => startHandling("WindowsServer")}
                                          className={"text-[15rem] text-rose-500 cursor-pointer"}/>
                                <h2>Debian</h2>
                                {credentials["WindowsServer"] && ( 
                                    <>
                                        <h2>Username: {credentials["WindowsServer"].username}</h2>
                                        <h2>Password: {credentials["WindowsServer"].password}</h2>
                                    </>
                                )}
                            </div>
                        )}
                        {user.role === "senior" && (
                            <>
                                <div>
                                    <FaDebian onClick={() => startHandling("debian-12")}
                                              className={"text-[15rem] text-rose-500 cursor-pointer"}/>
                                    <h2>Debian</h2>
                                    {credentials["debian-12"] && ( 
                                        <>
                                            <h2>Username: {credentials["debian-12"].username}</h2>
                                            <h2>Password: {credentials["debian-12"].password}</h2>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <FaUbuntu onClick={() => startHandling("UbuntuServer")}
                                              className={"text-[15rem] text-orange-500 cursor-pointer"}/>
                                    <h2>Ubuntu</h2>
                                    {credentials["UbuntuServer"] && (
                                        <>
                                            <h2>Username: {credentials["UbuntuServer"].username}</h2>
                                            <h2>Password: {credentials["UbuntuServer"].password}</h2>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <FaWindows onClick={() => startHandling("WindowsServer")}
                                               className={"text-[15rem] text-blue-500 cursor-pointer"}/>
                                    <h2>Windows</h2>
                                    {credentials["WindowsServer"] && (
                                        <>
                                            <h2>Username: {credentials["WindowsServer"].username}</h2>
                                            <h2>Password: {credentials["WindowsServer"].password}</h2>
                                        </>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h1 className={"text-center mt-10 text-4xl"}>Page de connexion à la machine virtuelle</h1>
                </>)}
            {loading && <div className={"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"}>
                <div className={"bg-white p-10 rounded-lg"}>
                    <h1 className={"text-2xl text-center text-black"}>Votre machine virtuelle est en cours de création <br/> Elle sera crée dans quelques instants.
                        ...</h1>
                </div>
            </div>}

            {result && (
                <h2 className={"mt-20 text-red-600 text-5xl text-center "}>Votre machine virtuelle sera détruite automatiquemant dans une dizaine de minute</h2>
            )}
        </div>
    );
}
