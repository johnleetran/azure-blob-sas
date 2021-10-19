var storage = require("@azure/storage-blob")

const accountname = "<YOUR_STORAGE_ACCOUNT_NAME>";
const key = "<YOUR_STORAGE_ACCOUNT_API_KEY>";
const containerName = "<YOUR_CONTINER_NAME>";

const cerds = new storage.StorageSharedKeyCredential(accountname, key);
const blobServiceClient = new storage.BlobServiceClient(`https://${accountname}.blob.core.windows.net`, cerds);
const client = blobServiceClient.getContainerClient(containerName)
const blobName = "image.jpg";
const blobClient = client.getBlobClient(blobName);

const blobSAS = storage.generateBlobSASQueryParameters({
  containerName,
  blobName,
  permissions: storage.BlobSASPermissions.parse("racwd"),
  startsOn: new Date(),
  expiresOn: new Date(new Date().valueOf() + 8886400)
},
  cerds
).toString();

const sasUrl = blobClient.url + "?" + blobSAS;
console.log(sasUrl);