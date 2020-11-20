const getEntityName = require('../../helpers/getEntityName');
const { findBy } = require('../globalDbModels');

const validateId = (tableName) => async (req, res, next) => {
  const entity = getEntityName(tableName);

  try {
    const id = req.params.id || 0;
    const item = await findBy(tableName, { id });

    if (item) {
      req[entity] = item;
      next();
    } else {
      res.status(404).json({ message: `Could not find ${entity} ${id}` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = validateId;
