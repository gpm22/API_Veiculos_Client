import { Vehicle } from "./vehicle";

export interface Owner{
    id?: string,
    name: string,
    email: string,
    cpf: string,
    birthDate: string,
    vehicles?: Vehicle[]
}