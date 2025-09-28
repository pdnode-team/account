import {Client, Account, Avatars} from "appwrite";
// Init your Web SDK
const client = new Client()
  .setEndpoint('https://sfo.cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('68d37234003c6f9deac7') // Your project ID
;

export const account = new Account(client);
export const avatars = new Avatars(client);