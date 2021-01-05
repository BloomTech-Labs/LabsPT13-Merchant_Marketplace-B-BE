const { findAllBy } = require('../api/globalDbModels');

const appendImagesToProducts = (products) => {
  return products.map(async (p) => {
    try {
      const images = findAllBy('products_images', { product_id: p.id });
      return { ...p, images };
    } catch (err) {
      console.error(err);
    }
  });
};

module.exports = appendImagesToProducts;
