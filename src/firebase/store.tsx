import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  CollectionReference,
  serverTimestamp,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import firebase_app from "./config";
import { CreateInvoiceDto, Invoice } from "@/models/invoices";

const db = getFirestore(firebase_app);

export const saveInvoice = async (data: CreateInvoiceDto) => {
  try {
    await setDoc(doc(db, "invoices", data.invoice_number), {
      ...data,
      timestamp: serverTimestamp(),
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

export const getAllInvoices = async (
  nextPage?: boolean,
  lastData?: QueryDocumentSnapshot<Invoice, DocumentData>
) => {
  try {
    const invoicesRef = collection(
      db,
      "invoices"
    ) as CollectionReference<Invoice>;
    let q = query(invoicesRef, orderBy("timestamp", "desc"), limit(10));

    if (nextPage) {
      q = query(
        invoicesRef,
        orderBy("timestamp", "desc"),
        startAfter(lastData),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(q);
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    let data: Invoice[] = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    return { data, lastVisible };
  } catch (error) {
    console.log(error);
  }
};
