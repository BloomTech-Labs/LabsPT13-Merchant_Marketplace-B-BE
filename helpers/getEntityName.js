const getEntityName = (tableName) => {
  switch (tableName) {
    case 'profiles':
      return 'profile';
    case 'products':
      return 'product';
    case 'orders':
      return 'order';
    case 'users-carts':
      return 'cart_item';
    default:
      return 'review';
  }
};

module.exports = getEntityName;
