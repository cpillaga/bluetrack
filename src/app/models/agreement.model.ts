export class Agreement {
    constructor(
        public description: string,
        public price: string,
        public cantonOrigen: string,
        public cantonDestino: string,
        public img: string,
        public branchOffice: string,
        public client: string,
        public _id?: string
    ){}
}