import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  label: String,              
  street: String,
  number: String,
  complement: String,
  district: String,
  city: String,
  state: String,
  zip: String                 
}, { _id: true });

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    addresses: { type: [addressSchema], default: [] },

  },
  { timestamps: true }
);

