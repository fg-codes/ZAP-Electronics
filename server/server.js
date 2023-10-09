require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { MONGO_URI, FE_ORIGIN_BASE_URL } = process.env;
const options = { useNewUrlParser: true, useunifiedTopology: true };

const client = new MongoClient(MONGO_URI, options);
client.connect();
const db = client.db('shop');

const PORT = 4000;

// Returns an array of all items.
const getItems = async (req, res) => {
  try {
    const result = await db.collection('items').find().toArray();
    if (result.length > 0) {
      res
        .status(200)
        .json({ status: 200, data: result, message: 'List of all items.' });
    } else {
      res.status(404).json({ status: 404, message: 'No items found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Returns an array of all categories.
const getCategories = async (req, res) => {
  try {
    const categories = await db.collection('items').distinct('category');
    if (categories.length > 0) {
      res
        .status(200)
        .json({
          status: 200,
          data: categories,
          message: 'List of all categories.',
        });
    } else {
      res.status(404).json({ status: 404, message: 'No categories found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Returns an array of items within a specified category.
const getItemsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const result = await db.collection('items').find({ category }).toArray();
    if (result.length > 0) {
      res
        .status(200)
        .json({
          status: 200,
          data: result,
          message: 'List of all items within a SPECIFIED category',
        });
    } else {
      res
        .status(404)
        .json({
          status: 404,
          data: result,
          message: `No items found in the ${category} category.`,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

//Return a single item based on its Id.
const getSingleItem = async (req, res) => {
  const itemId = parseInt(req.params.itemId);
  try {
    const item = await db.collection('items').findOne({ _id: itemId });
    if (item) {
      res.status(200).json({ status: 200, data: item, message: 'Item found' });
    } else {
      res.status(404).json({ status: 404, message: 'item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Return an array of all companies
const getBrands = async (req, res) => {
  try {
    const result = await db.collection('companies').find().toArray();
    if (result.length > 0) {
      res
        .status(200)
        .json({ status: 200, data: result, message: 'List of all brands' });
    } else {
      res.status(404).json({ status: 404, message: 'No brands found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

// Return an array of all items by a specific companyId
const getItemsByCompany = async (req, res) => {
  const companyId = parseInt(req.params.companyId);
  try {
    const items = await db.collection('items').find({ companyId }).toArray();
    if (items.length > 0) {
      res
        .status(200)
        .json({
          status: 200,
          data: items,
          message: 'List of items sold by the company',
        });
    } else {
      res
        .status(404)
        .json({
          status: 404,
          message: `No items found for company ID ${companyId}`,
        });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};

const getBrand = async (req, res) => {
  const brandId = parseInt(req.params.brandId);
  try {
    const brand = await db.collection('companies').findOne({ _id: brandId });
    brand
      ? res
        .status(200)
        .json({ status: 200, data: brand, message: 'Brand found' })
      : res.status(404).json({ status: 404, message: 'brand not found' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: 'Internal Server Error' });
  }
};

// Add an item to the cart.
const addToCart = async (req, res) => {
  const { id, name, price, category, numInStock, quantity, imageSrc } = req.body;
  try {
    const findResult = await db.collection('cart').findOne({ 'items.id': id });
    if (findResult) {
      // update the item quantity
      await db.collection('cart').updateOne(
        { 'items.id': id },
        {
          $inc: { [`items.$.quantity`]: quantity },
          $set: { [`items.$.numInStock`]: numInStock },
        }
      );
    } else {
      // add item to the cart with a quantity of 1
      await db.collection('cart').updateOne(
        { _id: 'global_cart' },
        { $push: { items: { id, name, price, category, numInStock, quantity, imageSrc } } }
      )
    }
    // decrementing stock quantity for this item
    await db
      .collection('items')
      .updateOne({ _id: +id }, { $inc: { numInStock: -quantity } });
    return res.status(200).json({ status: 200, message: 'item added to cart' });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: 'Internal Server Error' });
  }
};

// Handle checkout
const newOrder = async (req, res) => {
  const { _id, userDetails, orderSummary } = req.body;
  const date = new Date().toISOString().slice(0, 22);
  try {
    await db.collection('orders').insertOne({ _id, date, userDetails, orderSummary });

    orderSummary.cartItems.forEach((item) => {
      const { _id } = item.item
      const quantity = item.quantity
      db.collection('items').updateOne(
        { _id },
        { $inc: { numInStock: -quantity } }
      )
    })
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error' })
  }
  res.status(201).json({ status: 201, message: "Order created successfully" })
};

const getOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const findOrder = await db.collection('orders').findOne({ _id: orderId })
    if (findOrder) {
      return res.status(200).json({ status: 200, message: 'OK', data: findOrder })
    }
    throw new Error('order not found!')
  }
  catch (error) {
    return res.status(404).json({ status: 404, message: error.message })
  }
}

const searchItems = async (req, res) => {
  const { q } = req.query
  try {
    const result = await db.collection('items').find({ name: { $regex: new RegExp(q, 'i') } }).toArray();
    result.length > 0
      ? res.status(200).json({ status: 200, data: result })
      : res.status(404).json({ status: 404, data: result, message: `No items found for "${q}".` });
  }
  catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
}

express()
  .use(function (req, res, next) {
    res.header(
      'Access-Control-Allow-Methods',
      'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('dev'))
  .use(express.static('./server/assets'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cors({
    origin: FE_ORIGIN_BASE_URL,
    credentials: true,
  }))
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', FE_ORIGIN_BASE_URL);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    );
    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
      next();
    }
  })

  .get('/items', getItems) // Endpoint for getting all items.
  .get('/categories', getCategories) // Endpoint for getting all categories.
  .get('/category/:category', getItemsByCategory) // Endpoint for getting all items within a specified category.
  .get('/items/:itemId', getSingleItem) // Endpoint for getting a single item based on its ID
  .get('/brands', getBrands) // Endpoint for getting all companies
  .get('/brand/:companyId', getItemsByCompany) //Endpoint for getting items by a specific companyId
  .get('/brands/:brandId', getBrand) // Enpoint for getting a Brand details based on its id
  .get('/order/:orderId', getOrder) // Get an order based on an ID
  .post('/order', newOrder) // endpoints for submittimg an order
  .get('/search', searchItems) // Endpoint to search items

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));