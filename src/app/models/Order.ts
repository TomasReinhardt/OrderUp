import { Table } from "./Table";
import { User } from "./User";

export class Order {
    constructor(
        public comments: string,
        public id: number,
        public productlist: string,
        public table: Table,
        public user: User,
        public total: number
    ){}

}