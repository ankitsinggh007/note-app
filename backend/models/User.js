import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
    console.log("password has been hashed");
    next();  // Proceed to save the document
  } catch (error) {
    next(error);  // Pass error to next middleware (like error handler)
  }
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);
export default User;
