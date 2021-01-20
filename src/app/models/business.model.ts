export class Business {
    constructor(
        public email: string,
        public password: string,
        public ruc?: string,
        public businessName?: string,
        public agent?: string,
        public address?: string,
        public phone?: string,
        public _id?: string
    ){}
  }