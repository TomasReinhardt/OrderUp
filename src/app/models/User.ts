import { Role } from "./Role";

export class User {
    constructor(
        public id: number,
        public username: string,
        public surname: string,
        public password: string,
        public email: string,
        public phone: number,
        public role: Role
    ){}

}