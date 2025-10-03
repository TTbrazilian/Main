import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email:{ type: String, required: true, unique: true },
    password:{ type: String, required: true },

    isAdmin: { type: Boolean, default: false },
    
    // ⬇️ NOVO: carrinho do usuário
    cart: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      qty: { type: Number, required: true, min: 1, default: 1 }
    }]
  },
  { timestamps: true }
);

// hash de senha (mantém)
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);


export default User;
