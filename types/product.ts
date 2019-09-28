import * as firebase from "firebase";

export interface Product {
  id: string;
  name: string;
  imgURL: string;
  expiredDate?: firebase.firestore.Timestamp;
  discountRate?: number;
  price: number;
  brand: string;
}
