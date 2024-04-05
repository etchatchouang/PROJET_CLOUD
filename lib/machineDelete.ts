const { DefaultAzureCredential } = require("@azure/identity");
const { ResourceManagementClient } = require("@azure/arm-resources");

const clientId = process.env["AZURE_CLIENT_ID"];
const domain = process.env["AZURE_TENANT_ID"];
const secret = process.env["AZURE_CLIENT_SECRET"];
const subscriptionId = process.env["AZURE_SUBSCRIPTION_ID"];

if (!clientId || !domain || !secret || !subscriptionId) {
    console.log("Default credentials couldn't be found");
}

const resourceGroupName = process.argv[2];
if (!resourceGroupName) {
    console.log("resourceGroupName couldn't be found");
}

export const deleteResourceGroup = async (resourceGroupName: string | null) => {
    console.log("\nDeleting resource group: " + resourceGroupName);
    return await resourceClient.resourceGroups.beginDeleteAndWait(resourceGroupName);
};

const credentials = new DefaultAzureCredential();
const resourceClient = new ResourceManagementClient(credentials, subscriptionId);
