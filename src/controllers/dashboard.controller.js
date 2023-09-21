const getDashboard = async (req, res) => {
  const { username } = req.user;
  return res.status(200).send(`<h1>Welcome ${username}!</h1>`);
};

module.exports = {
  getDashboard
};