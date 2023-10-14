"use client"
import React from 'react'
import firebase from '../../firebase/config'
import { getFirestore,addDoc } from 'firebase/firestore'
import { log } from 'console'
import { saveInvoiceDTO } from '@/utils/interface.dto'


const db=getFirestore(firebase)
function useInvoices() {
    const saveInvoice=async(data:saveInvoiceDTO)=>{
        try {
            
        } catch (error) {
            console.log(error);
            
        }
    }

    return {
        saveInvoice
    }
}

export default useInvoices