import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name:       { type: String, required: true, index: true },
    description:{ type: String, default: '' },
    price:      { type: Number, required: true, min: 0 },
    stock:      { type: Number, required: true, min: 0, default: 0 },
    categories: [{ type: String, index: true }],
    images:     [{ type: String }],
    isActive:   { type: Boolean, default: true }
  },
  { timestamps: true }
);


productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ categories: 1 });


export default model('Product', productSchema);


