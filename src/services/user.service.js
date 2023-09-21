const UserModel = require('../models/user.model');

const createUser = async (data) => {
  const responseUser = await UserModel.create(data);
  return responseUser;
};

const findOneUser = async (email) => {
  const responseUser = await UserModel.findOne({ email });
  return responseUser;
};

const findUserAuth = async (userId) => {
  const responseUser = await UserModel.findById({ _id: userId });
  return responseUser;
};

module.exports = {
  createUser,
  findOneUser,
  findUserAuth
};