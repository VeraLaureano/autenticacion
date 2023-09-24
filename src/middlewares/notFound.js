const notFound = (req, res) => {
  return res.status(404).json({message: 'ROUTE_DOES_NOT_EXIST'});
};

module.exports = notFound;