const { EVERYTHING_OK } = require('../config/statusCodes');

const getDashboard = async (req, res) => {
  const { _id, username, email } = req.user;
  return res.status(EVERYTHING_OK).json({_id, username, email});
};

module.exports = {
  getDashboard
};