const removeObjKeys = (object, keys) => {
  let newObject = {};

  Object.keys(object).forEach((key) => {
    if (!key in keys) {
      newObject[key] = object[key];
    }
  });

  return Object.freeze(newObject);
};

module.exports = { removeObjKeys };
