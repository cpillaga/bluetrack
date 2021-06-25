export class Request {
    constructor(
        public date: Date, 
        public subtotal: number, 
        public iva: number, 
        public descuento: number, 
        public ice: number, 
        public total: number, 
        public status: string, 
        public comment: string, 
        public guide: string,
        public client: string, 
        public branchOffice: string,
        public receiver: string,
        public _id?: string
    ){}
}

export class DetailRequest {
    constructor (
        public description: string,
        public quantity: number,
        public price: number,
        public total: number,
        public img: string,
        public request: string,
        public _id?: string
    ){}
}