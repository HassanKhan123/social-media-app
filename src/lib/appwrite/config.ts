import { Client, Account, Databases, Storage, Avatars } from "appwrite";

const VITE_APPWRITE_URL = "https://cloud.appwrite.io/v1";
const VITE_APPWRITE_PROJECT_ID = "657b631864d0476ad7f4";
const VITE_APPWRITE_DATABASE_ID = "657ddaa4c1aaa8468707";
const VITE_APPWRITE_STORAGE_ID = "657dda5bbb3d1f5eb5db";
const VITE_APPWRITE_USER_COLLECTION_ID = "657ddbc38d14fc53e429";
const VITE_APPWRITE_POST_COLLECTION_ID = "657ddb5a81744e38f80e";
const VITE_APPWRITE_SAVES_COLLECTION_ID = "657ddbea1635c16740d0";
const VITE_APPWRITE_LOGS_COLLECTION_ID = "65c4bfa740e50458b9e4";

export const appwriteConfig = {
  url: VITE_APPWRITE_URL,
  // import.meta.env.VITE_APPWRITE_URL
  projectId: VITE_APPWRITE_PROJECT_ID,
  // import.meta.env.VITE_APPWRITE_PROJECT_ID
  databaseId: VITE_APPWRITE_DATABASE_ID,
  // import.meta.env.VITE_APPWRITE_DATABASE_ID
  storageId: VITE_APPWRITE_STORAGE_ID,
  // import.meta.env.VITE_APPWRITE_STORAGE_ID
  userCollectionId: VITE_APPWRITE_USER_COLLECTION_ID,
  // import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID
  postCollectionId: VITE_APPWRITE_POST_COLLECTION_ID,
  // import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID
  savesCollectionId: VITE_APPWRITE_SAVES_COLLECTION_ID,
  // import.meta.env.VITE_APPWRITE_SAVES_COLLECTION_ID
  logsCollectionId: VITE_APPWRITE_LOGS_COLLECTION_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
