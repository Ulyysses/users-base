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

export async function blockUserAdmin(userUid: string, token: string) {
  getAuth(app)
    .verifyIdToken(token)
    .then(() => {
      getAuth(app)
        .updateUser(userUid, {
          disabled: true,
        })
        .then(() => {
          console.log("Successfully blocked user");
        })
        .catch((error) => {
          console.log("Error blocking user:", error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
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
