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

// permite busca por texto
productSchema.index({ name: 'text', description: 'text' });

export default model('Product', productSchema);
