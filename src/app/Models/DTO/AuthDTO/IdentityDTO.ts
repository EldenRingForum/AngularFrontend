export interface IdentityDTO{
    id: number;
    userName: string
    email: string,
    password: string,
    confirmPassword: string,
    address: string,
    rememberMe: boolean
}

export class ClassIdentityDTO{
    id: number
    userName: string
    email: string
    password: string
    confirmPassword: string
    address: string
    rememberMe: boolean

    constructor(){
        
    }
}