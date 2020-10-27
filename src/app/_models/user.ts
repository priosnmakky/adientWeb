export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    jwtToken?: string;
    access?: string;
    refresh?:string
}