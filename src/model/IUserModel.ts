export interface IUserModel {
  id: number;
  name: string;
  username: string;
  email: string;
  address: any;
  phone: string;
  website: string;
  company: any;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
