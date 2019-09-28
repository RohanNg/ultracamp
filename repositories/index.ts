import { db } from '../services';

export interface ProductItemData {
    startDate: string,
    endDate: string,
    price: number,
    discountRate: number
}

const PRODUCT_COLLECTION = db.collection('product');

export async function getItemById(id: string): Promise<ProductItemData> {
    const doc =  await PRODUCT_COLLECTION.doc(id).get()
    return doc.data() as ProductItemData
}

