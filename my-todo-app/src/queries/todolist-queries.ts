import { listagemSchema } from "../models/todolist-schema";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import {firebaseConfig} from "../service/firebase"


const firebaseApp = initializeApp( firebaseConfig );
const db = getFirestore(firebaseApp);

// Referência para a coleção no Firestore
const listagemCollection = collection(db, "to-do-list");

export function useListagemQuery() {
    const queryClient = useQueryClient();

    // Consulta principal usando getDocs
    const result = useQuery({
        queryKey: ["getListagem"],
        queryFn: async () => {
            const snapshot = await getDocs(query(listagemCollection));
            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return listagemSchema.parse(data); 
            });
        },
    });

    // Configura um listener para atualizações em tempo real
    useEffect(() => {
        const unsubscribe = onSnapshot(listagemCollection, (snapshot) => {
            const validatedData = snapshot.docs.map((doc) => {
                const data = doc.data();
                return listagemSchema.parse(data); // Validação com zod
            });
            queryClient.setQueryData(["getListagem"], validatedData);
        });

        // Cancela o listener quando o componente desmonta
        return () => unsubscribe();
    }, [queryClient]);

    return result;
}
