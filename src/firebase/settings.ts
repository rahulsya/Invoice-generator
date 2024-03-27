import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import firebase_app from "./config";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { Setting } from "@/models/invoices";
import { Settings } from "@/@types/types";

const db = getFirestore(firebase_app);

export const getSettings = async () => {
  const id = process.env.NEXT_PUBLIC_SETTING_ID as string;
  try {
    const docRef = doc(db, "settings", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Setting;
    }
  } catch (error) {
    console.log(error);
  }
};

export const saveSetting = async (data: Setting) => {
  const id = process.env.NEXT_PUBLIC_SETTING_ID as string;
  try {
    await setDoc(doc(db, "settings", id), {
      ...data,
    });
    return {
      ...data,
    };
  } catch (error) {
    console.log(error);
  }
};

export const storeImage = async (file: File, payload: Settings) => {
  try {
    const storage = getStorage(firebase_app);
    const storageRef = ref(storage, `logo/${file.name}`);

    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);

    if (imageUrl) {
      const id = process.env.NEXT_PUBLIC_SETTING_ID as string;
      await setDoc(doc(db, "settings", id), {
        application_name: payload.application_name,
        address: payload.address,
        bank_name: payload.bank_name,
        bank_account_number: payload.bank_account_number,
        phone_number: payload.phone_number,
        logo_url: imageUrl,
      });
    }
    return imageUrl;
  } catch (error) {
    console.log(error);
  }
};
