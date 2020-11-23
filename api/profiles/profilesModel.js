const db = require('../../data/db-config');
const { findBy } = require('../globalDbModels');

const create = async (profile) => {
  return db('profiles').insert(profile).returning('*');
};

const findOrCreateProfile = async (profileObj) => {
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
};

module.exports = { create, findOrCreateProfile };
