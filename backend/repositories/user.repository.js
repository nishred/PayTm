import User from "../models/User.js";

class UserRepository {
  constructor() {
    this.model = User;
  }

  async create(data) {
    const user = await this.model.create(data);

    return user;
  }

  async update(id, data) {
    const updatedUser = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    return updatedUser;
  }

  async findByUsername(name) {
    const user = await this.model
      .findOne({ username: name })
      .select("password");

    return user;
  }

  async getAll(filter, userId) {
    const users = await this.model.find({
      $or: [
        { username: { $regex: filter } },
        { firstName: { $regex: filter } },
        { lastName: { $regex: filter } },
      ],
    });

    console.log("comparision");

    const filteredUsers = users.filter((user) => user._id.toString() !== userId);

    return filteredUsers;
  }

  async getById(userId) {
    const user = await this.model.findById(userId);

    return user;
  }
}

export default UserRepository;
