const User = require("../models/model.user");

async function createUser({ name, email, password }) {
  return await User.create({ name, email, password });
}

async function listUsers() {
  return await User.findAll();
}

async function updateUser(id, { name, email }) {
  const user = await User.findByPk(id);
  if (!user) return null;

  user.name = name || user.name;
  user.email = email || user.email;
  await user.save();

  return user;
}

async function deleteUser(id) {
  const user = await User.findByPk(id);
  if (!user) return null;
  await user.destroy();
  return user;
}

module.exports = {
  createUser,
  listUsers,
  updateUser,
  deleteUser,
};
