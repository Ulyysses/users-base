"use server";

import { getAuth } from "firebase-admin/auth";
import { app } from "../firebase-admin";

export async function deleteUserAdmin(userUid: string, token: string) {
  getAuth(app)
    .verifyIdToken(token)
    .then(() => {
      getAuth(app)
        .deleteUser(userUid)
        .then(() => {
          console.log("Successfully deleted user");
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
