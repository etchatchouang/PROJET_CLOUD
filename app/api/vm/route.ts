import { NextResponse } from "next/server";
import { createResources } from "@/lib/machineStart";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

interface ResourceDetails {
    resourceGroupName: string;
    adminUsername: string;
    adminPassword: string;
}

const resourceConfig = {
    
    "WindowsServer": { version: "2016-Datacenter", description: "MicrosoftWindowsServer" },
    "debian-12": { version: "12", description: "Debian" },
    "UbuntuServer": { version: "16.04.0-LTS", description: "Canonical" }
};

export async function POST(req: Request): Promise<Response> {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" });
    }

    const system = JSON.parse(await req.text());
    const config = resourceConfig[system.param];

    let resourceGroupName: ResourceDetails | undefined;

    if (config) {
        resourceGroupName = await createResources(system.param, config.version, config.description);
    }

    return NextResponse.json({ resourceGroupName });
}

async function handleDeleteOperation() {
    try {
        await deleteResourceGroup(resourceGroupName.resourceGroupName);
        resourceGroupName = null;
        return NextResponse.json({ message: "Le groupe de ressources a été éliminé avec succès." });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Erreur, Impossible de supprimer le groupe de ressources" });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" });
    }

    return handleDeleteOperation();
}