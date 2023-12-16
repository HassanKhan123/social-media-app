import { ID, Query } from "appwrite";

import { appwriteConfig, account, databases, storage, avatars } from "./config";
import { INewUser } from "@/types";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    // if (!newAccount) throw Error;

    // const avatarUrl = avatars.getInitials(user.name);

    // const newUser = await saveUserToDB({
    //   accountId: newAccount.$id,
    //   name: newAccount.name,
    //   email: newAccount.email,
    //   username: user.username,
    //   imageUrl: avatarUrl,
    // });

    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}
