import { Schema, model, Types } from 'mongoose';

const orderItemSchema = new Schema({
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  name: String,           
  price: Number,          
  qty: { type: Number, required: true, min: 1 },
  image: String
}, { _id: false });

const orderSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  items: { type: [orderItemSchema], required: true },
  subtotal: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ['PLACED', 'PAID', 'CANCELED'],
    default: 'PLACED',
    index: true
  },
  paidAt: Date,
}, { timestamps: true });

export default model('Order', orderSchema);
