import * as uuid from 'uuid';
import { ProductItemData, saveItem } from './';

const items: Array<ProductItemData> = [{
    id: uuid.v4(),
    brand: 'K',
    discount: {
        discountRate: 10,
        end: new Date().toISOString(),
        start: new Date().toISOString(),
    },
    imgURL: 'https://i5.walmartimages.com/asr/209bb8a0-30ab-46be-b38d-58c2feb93e4a_1.1a15fb5bcbecbadd4a45822a11bf6257.jpeg',
    name: 'Banana',
    price: 10,
    description: 'big banana for everyone'
}];

async function saveAll() {
    for ( const i of items ) {
        await saveItem(i)
        console.info("item ", i.id, "saved")
    }
}

saveAll().then(() => {})
