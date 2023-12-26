import { cert, getApp, initializeApp } from "firebase-admin/app";

const getAppAdmin = () => {  
  try {
    return getApp();
  } catch {
    return initializeApp({
      credential: cert({
        projectId: process.env.ADMIN_PROJECT_ID,
        clientEmail: process.env.ADMIN_CLIENT_EMAIL,
        privateKey: process.env.ADMIN_PRIVATE_KEY?.replace(/\\n/gm, "\n"),
      }),
    });
  }
};

export const app = getAppAdmin();
