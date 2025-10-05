import { Schema, model, Types } from 'mongoose';

const orderItemSchema = new Schema({
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  name: String,
  price: Number,
  qty: { type: Number, required: true, min: 1 },
  image: String
}, { _id: false });

const addressSchema = new Schema({
  street: String,
  number: String,
  complement: String,
  district: String,
  city: String,
  state: String,
  zip: String,
}, { _id: false });

const orderSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  items: { type: [orderItemSchema], required: true },

  subtotal: { type: Number, required: true, min: 0 },
  shipping: { type: Number, required: true, min: 0, default: 0 },
  discount: { type: Number, required: true, min: 0, default: 0 },
  total:    { type: Number, required: true, min: 0 },

  shippingAddress: addressSchema,
  status: { type: String, enum: ['PLACED','PAID','CANCELED'], default: 'PLACED', index: true },
  paidAt: Date,

  idempotencyKey: { type: String }
}, { timestamps: true });

orderSchema.index({ user: 1, idempotencyKey: 1 }, { unique: true, sparse: true });

export default model('Order', orderSchema);
