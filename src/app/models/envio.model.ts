

export class ShippingAgreement {
    constructor(
        public date: string,
        public subtotal: number,
        public iva: number,
        public total: number,
        public status: string,
        public guide: string,
        public type: string,
        public tracking: string,
        public carrier: string,
        public client: string,
        public branchOffice: string,
        public receiver: string,
        public _id?: string
    ){}
}

export class DetailShippingAgreement {
    constructor (
        public description: string,
        public quantity: number,
        public price: number,
        public total: number,
        public img: string,
        public shippingAgreement: string,
        public _id?: string
    ){}
}


export class StatusShippingAgreement {
    constructor (
        public description: string,
        public date: string,
        public shippingAgreement: string,
        public _id?: string
    ){}
}