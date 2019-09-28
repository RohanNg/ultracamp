import { db } from "../services";

export interface ProductItemData {
  id: string;
  price: number;
  discount: {
    start: string;
    end: string;
    discountRate: number;
  };
  name: string;
  imgURL: string;
  brand: string;
  description: string;
}

export interface CampaignData {
  id: string,
  campaignURL: string,
  title: string,
  start: string,
  end: string,
  imgURL: string
}

const PRODUCT_COLLECTION = db.collection("product");
const CAMPAIGN_COLLECTION = db.collection("campaigns");

export async function saveItem(data: ProductItemData): Promise<void> {
  return await PRODUCT_COLLECTION.doc(data.id).set(data);
}

// example getItemById('1').then(i => console.info('item retrieve ', i))
export async function getItemById(id: string): Promise<ProductItemData> {
  const doc = await PRODUCT_COLLECTION.doc(id).get();
  return doc.data() as ProductItemData;
}

export async function getDiscountedProducts(): Promise<ProductItemData[]> {
  const doc = await PRODUCT_COLLECTION.get();
  return doc.docs.map(doc => doc.data()) as ProductItemData[];
}

export async function saveCampaign(data: CampaignData): Promise<void> {
  return await CAMPAIGN_COLLECTION.doc(data.id).set(data);
}