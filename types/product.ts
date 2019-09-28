import * as firebase from "firebase";

export interface Product {
  name: string;
  imgURL: string;
  expiredDate?: firebase.firestore.Timestamp;
  discountRate: number;
  price: number;
}
