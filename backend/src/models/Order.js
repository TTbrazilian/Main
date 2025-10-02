import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qty:     { type: Number, required: true, min: 1 },
      price:   { type: Number, required: true, min: 0 }
    }],
    total:  { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['PLACED','PAID','CANCELED'], default: 'PLACED' }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
