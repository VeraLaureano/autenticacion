const notFound = (req, res) => {
  return res.status(404).send('ROUTE_DOES_NOT_EXIST');
};

module.exports = notFound;