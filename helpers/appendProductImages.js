const appendProductImages = (product, images) => {
  return {
    ...product,
    images: images.filter((img) => img.product_id === product.id),
  };
};

module.exports = appendProductImages;
