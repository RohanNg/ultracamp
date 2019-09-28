import { db } from '../services';

export interface ProductItemData {
    id: string,
    price: number,
    discount: {
        start: string,
        end: string,
        discountRate: number
    }
    name: string,
    imgURL: string,
    brand: string,
    description: string
}

const PRODUCT_COLLECTION = db.collection('product');

export async function saveItem(data: ProductItemData): Promise<void> {
    return await PRODUCT_COLLECTION.doc(data.id).set(data)
}

// example getItemById('1').then(i => console.info('item retrieve ', i))
export async function getItemById(id: string): Promise<ProductItemData> {
    const doc =  await PRODUCT_COLLECTION.doc(id).get()
    return doc.data() as ProductItemData
}

