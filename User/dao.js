import mongoose from 'mongoose';
import model from "./model.js";

const { ObjectId } = mongoose.Types;

export const createUser = (user) => {
  delete user._id;
  return model.create(user);
};

export const findAllUsers = () => model.find();

export const findUserById = (userId) => model.findById(new ObjectId(userId));

export const findUsersByRole = (role) => model.find({ role });

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

export const findUserByUsername = (username) => model.findOne({ username });

export const findUserByCredentials = (username, password) => model.findOne({ username, password });

export const updateUser = (userId, user) => model.updateOne({ _id: new ObjectId(userId) }, { $set: user });

export const deleteUser = (userId) => model.deleteOne({ _id: new ObjectId(userId) });
