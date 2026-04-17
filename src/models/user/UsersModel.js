import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true},
    firstName: { type: String},
    lastName: { type: String, unique: true},
    mobile: { type: String},
    password: { type: String, required: true},
    photo: { type: String, default: '' },
    createdDate: { type: Date, default: Date.now},
},{versionKey:false});

const UsersModel = mongoose.model('users', DataSchema);
export default UsersModel;