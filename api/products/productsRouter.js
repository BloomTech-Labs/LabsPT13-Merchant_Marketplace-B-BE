const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../config/cloudinary');
const Products = require('./productsModel');
const authRequired = require('../middleware/authRequired');
const validateId = require('../middleware/validateId');
const validateBody = require('../middleware/validateBody');
const { findAll, create, update, remove } = require('../globalDbModels');
const appendProductImages = require('../../helpers/appendProductImages');

const TABLE_NAME = 'products';

// retrieve all existing products
router.get('/', authRequired, async (req, res) => {
  try {
    let products = await findAll(TABLE_NAME);
    let images = await findAll('products_images');

    products = products.map((p) => appendProductImages(p, images));
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// retrieve seller's inventory
router.get('/:id', authRequired, validateId('profiles'), async (req, res) => {
  try {
    const { id } = req.params;
    let products = await Products.getSellerInventory(id);
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// retrieve all available tags
router.get('/tags', authRequired, async (req, res) => {
  try {
    const tags = await Products.getAllTags();
    res.status(200).json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// retrieve a product by the given :id
router.get('/:id', authRequired, validateId(TABLE_NAME), async (req, res) => {
  try {
    let images = await findAll('products_images');

    res.status(200).json(appendProductImages(req.product, images));
  } catch (err) {
    console.error(err);
  }
});

// create a new product
router.post('/', authRequired, validateBody, async (req, res) => {
  try {
    const { product, images } = req.body;

    // create the product
    const newProduct = await Products.create(product);

    // upload all product images to cloudinary
    for (let i = 0; i < images.length; i++) {
      const { image, name } = images[i];
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'mmp_uploads',
      });

      // store the image url in DB
      await create('products_images', {
        product_id: newProduct[0].id,
        img_url: uploadedResponse.url,
        name,
      });
    }

    res
      .status(201)
      .json({ message: 'Product created.', product: newProduct[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// update the give product
router.put(
  '/:id',
  authRequired,
  validateId(TABLE_NAME),
  validateBody,
  async (req, res) => {
    const changes = { ...req.body, updated_at: new Date().toISOString() };

    try {
      const updated = await update(TABLE_NAME, changes, { id: req.product.id });
      res.status(200).json({ message: 'Product updated', product: updated });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Could not update product with ID: ${req.product.id}`,
        error: err.message,
      });
    }
  }
);

// delete the specified product
router.delete(
  '/:id',
  authRequired,
  validateId(TABLE_NAME),
  async (req, res) => {
    try {
      await remove(TABLE_NAME, { id: req.product.id });

      res.status(200).json({
        message: `Product '${req.product.id}' was deleted.`,
        product: req.product,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: `Could not delete product with ID: ${req.product.id}`,
        error: err.message,
      });
    }
  }
);

module.exports = router;
