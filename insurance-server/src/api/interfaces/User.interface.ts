import mongoose from "mongoose";

interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    username: string,
    phone: string,
}

export default User;