import { userModel } from "../Dao/models/user.js";

export const userRepository = {
  getUserByEmail: async (email) => {
    return await userModel.findOne({ email: email });
  },
  createUser: async (first_name, last_name, age, email, password, role) => {
    const user = new userModel({
      first_name,
      last_name,
      age,
      email,
      password,
      role,
    });
    return await user.save();
  },
};
