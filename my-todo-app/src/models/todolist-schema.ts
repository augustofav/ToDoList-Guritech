
import { z } from 'zod';



export const listagemSchema = z.object({
    listagem: z.string().min(2, { message: "não pode ser vazio" }) 

});


export type Listagem = z.infer<typeof listagemSchema>;