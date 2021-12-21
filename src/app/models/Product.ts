export class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public stock: number,
        public category: {
            id: number,
            image: string,
            name: string
        },
        public description: string
    ){}
}