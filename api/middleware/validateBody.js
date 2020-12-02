const validateBody = (req, res, next) => {
  const body = req.body;

  if (body.constructor === Object && Object.keys(body).length > 0) {
    next();
  } else {
    res.status(404).json({ message: 'Body info is missing' });
  }
};

module.exports = validateBody;
