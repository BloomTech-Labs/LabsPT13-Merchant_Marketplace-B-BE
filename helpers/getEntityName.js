const getEntityName = (tableName) => {
  switch (tableName) {
    case 'profiles':
      return 'profile';
    case 'products':
      return 'product';
    case 'orders':
      return 'order';
    case 'tags':
      return 'tag';
    default:
      return 'review';
  }
};

module.exports = getEntityName;
