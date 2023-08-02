const { MongoClient } = require('mongodb')
const items = require('./data/items.json')
const companies = require('./data/companies.json')

require('dotenv').config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const batchImport = async () => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('shop');
        const itemCollection = db.collection('items');
        const companyCollection = db.collection('companies');
        const insertItemData = await itemCollection.insertMany(items);
        const insertCompanyData = await companyCollection.insertMany(companies);

        if (insertItemData.insertedCount > 0 && insertCompanyData.insertedCount > 0) {
            console.log('Data import successful');
        } else {
            console.log('Data import failed');
        }
    } catch (error) {
        console.error('Error during data import:', error);
    } finally {
        client.close();
    }
};

batchImport();