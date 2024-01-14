import mongoose, { connect } from "mongoose";
import UserModel from "./Models/User.model";
import { hash } from "bcrypt";
import { PASSWOD_DEFAULT } from "./Constants";

connect("mongodb://127.0.0.1:27017/backend", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connect success"))
  .catch((err) => console.log("Database connect failed", err));

const sampleData = async () => {
  return [
    {
      email: "admin@gmail.com",
      username: "admin",
      password: await hash(PASSWOD_DEFAULT, 8),
      phone_number: "0123456789",
      date_of_birth: "2024-01-09T17:28:40.630Z",
      address: "Ha Noi",
      role: 1,
    },
  ];
};

const seedDatabase = async () => {
  try {
    await UserModel.deleteMany({});
    await UserModel.insertMany(await sampleData());
    console.log("Seeder: Dữ liệu đã được thêm thành công.");
  } catch (error) {
    console.error("Seeder Error:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Gọi hàm seed
seedDatabase();
