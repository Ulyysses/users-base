"use server";

import { getAuth } from "firebase-admin/auth";
import { app } from "../firebase-admin";

export async function deleteUserAdmin(userUid: string, token: string) {
  try {
    await getAuth(app).verifyIdToken(token, true);
    await getAuth(app).deleteUser(userUid);
    await getAuth(app).revokeRefreshTokens(userUid);
    console.log("User is deleted, token revoked");
  } catch (error) {
    console.error(error);
  }
}

export async function blockUserAdmin(userUid: string, token: string) {
  try {
    await getAuth(app).verifyIdToken(token, true);
    await getAuth(app).updateUser(userUid, {
      disabled: true,
    });
    await getAuth(app).revokeRefreshTokens(userUid);
    console.log("User is blocked, token revoked");
  } catch (error) {
    console.error(error);
  }
}

export async function unblockUserAdmin(userUid: string, token: string) {
  getAuth(app)
    .verifyIdToken(token)
    .then(() => {
      getAuth(app)
        .updateUser(userUid, {
          disabled: false,
        })
        .then(() => {
          console.log("Successfully unblocked user");
        })
        .catch((error) => {
          console.log("Error unblocking user:", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
