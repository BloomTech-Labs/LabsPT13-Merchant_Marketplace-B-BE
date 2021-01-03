const db = require('../../data/db-config');
const { findBy } = require('../globalDbModels');

const getSellerInventory = (profile_id) => {
  return db('products').where({ profile_id });
};

const getProductImages = (product_id) => {
  return db('products_images').where({ product_id });
};

const create = async (profile) => {
  return db('profiles').insert(profile).returning('*');
};

const findOrCreateProfile = async (profileObj) => {
  try {
    const foundProfile = await findBy('profiles', { id: profileObj.id }).then(
      (profile) => profile
    );

    if (foundProfile) {
      return foundProfile;
    } else {
      return await create(profileObj).then((newProfile) => {
        return newProfile ? newProfile[0] : newProfile;
      });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getSellerInventory,
  create,
  findOrCreateProfile,
  getProductImages,
};
