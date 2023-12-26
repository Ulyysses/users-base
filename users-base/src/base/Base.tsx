"use client";

import { useState } from "react";
import { auth, db } from "../config";
import Table from "../table";
import css from "./index.module.css";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { RowSelectionState } from "@tanstack/react-table";
import {
  blockUserAdmin,
  deleteUserAdmin,
  unblockUserAdmin,
} from "../app/actions";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authUtils";

const Base = () => {
  const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
  const router = useRouter();
  const { authState, logoutUser } = useAuth();
  const { userName, isAuthenticated } = authState;

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push("authentication");
      logoutUser();
      console.log("Logout completed successfully");
    } catch (error) {
      console.error("Error when logging out:", error);
    }
  };

  const collectionRef = collection(db, "users-base");
  const documentsUid: string[] = [];

  getDocs(collectionRef).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      documentsUid.push(doc.id);
    });
  });

  const selectedRowIndexes = Object.keys(selectedRows)
    .filter((id: string) => selectedRows[id])
    .map(Number);

  const deleteUserButton = async (indexes: number[]) => {
    try {
      for (const index of indexes) {
        const docUidToDelete = documentsUid[index];
        const userDocRef = doc(db, "users-base", docUidToDelete);

        await auth.currentUser
          ?.getIdToken(true)
          .then(function (idToken) {
            deleteUserAdmin(docUidToDelete, idToken);
          })
          .catch(function (error) {
            if (error.code === "auth/user-disabled") {
              auth.signOut();
              router.push("authentication");
              logoutUser();
              return;
            }
          });

        await deleteDoc(userDocRef);

        if (auth.currentUser?.uid === docUidToDelete) {
          await auth.signOut();
          router.push("authentication");
          logoutUser();
        }

        console.log("Пользователь удален:");
      }
    } catch (error) {
      console.error("Ошибка при удалении пользователя", error);
    }
  };

  const blockUserButton = async (indexes: number[]) => {
    try {
      for (const index of indexes) {
        const docUidToBlock = documentsUid[index];
        const userDocRef = doc(db, "users-base", docUidToBlock);

        await auth.currentUser
          ?.getIdToken(true)
          .then(function (idToken) {
            return blockUserAdmin(docUidToBlock, idToken);
          })
          .catch(function (error) {
            if (error.code === "auth/user-disabled") {
              auth.signOut();
              router.push("authentication");
              logoutUser();
              return;
            }
          });

        await updateDoc(userDocRef, {
          status: "Block",
        });

        if (auth.currentUser?.uid === docUidToBlock) {
          await auth.signOut();
          router.push("authentication");
          logoutUser();
        }

        console.log("Пользователь заблокирован:");
      }
    } catch (error) {
      console.error("Ошибка при блокировании пользователя", error);
    }
  };

  const unblockUserButton = async (indexes: number[]) => {
    try {
      for (const index of indexes) {
        const docUidToUnblock = documentsUid[index];
        const userDocRef = doc(db, "users-base", docUidToUnblock);

        await auth.currentUser
          ?.getIdToken(true)
          .then(function (idToken) {
            unblockUserAdmin(docUidToUnblock, idToken);
          })
          .catch(function (error) {
            if (error.code === "auth/user-disabled") {
              auth.signOut();
              router.push("authentication");
              logoutUser();
              return;
            }
          });

        await updateDoc(userDocRef, {
          status: "Active",
        });

        console.log("Пользователь разблокирован:");
      }
    } catch (error) {
      console.error("Ошибка при разблокировании пользователя", error);
    }
  };

  return isAuthenticated ? (
    <>
      <div className={css.user_info_wrapper}>
        <div className={css.user_info}>
          <p className={css.hello}>Hello,</p>
          <p className={css.user}>{userName}!</p>
        </div>
        <button onClick={signOut} className={css.button}>
          Sign out
        </button>
      </div>
      <div className={css.table_container}>
        <div className={css.buttons_group}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => blockUserButton(selectedRowIndexes)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => unblockUserButton(selectedRowIndexes)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-unlock"
              viewBox="0 0 16 16"
            >
              <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"></path>
            </svg>
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteUserButton(selectedRowIndexes)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
            </svg>
          </button>
        </div>
        <Table setSelectedRows={setSelectedRows} selectedRows={selectedRows} />
      </div>
    </>
  ) : (
    router.push("authentication")
  );
};

export default Base;
