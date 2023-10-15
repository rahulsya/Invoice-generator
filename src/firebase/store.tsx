import {
  getFirestore,
  addDoc,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  CollectionReference,
} from "firebase/firestore";
import firebase_app from "./config";
import { CreateInvoiceDto, Invoice } from "@/models/invoices";

const db = getFirestore(firebase_app);

export const saveInvoice = async (data: CreateInvoiceDto) => {
  try {
    await setDoc(doc(db, "invoices", data.invoice_number), {
      ...data,
    });
    return {
      id: data.invoice_number,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getInvoiceDetail = async (id: string) => {
  try {
    const docRef = doc(db, "invoices", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllInvoices = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, "invoices") as CollectionReference<Invoice>
    );
    let data: Invoice[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
