// src/model.ts
import mongoose, { Document, Error, Schema } from "mongoose";
import bcrypt from "bcrypt";

type comparePasswordFunction = (
  candidatePassword: string,
  cb: (err: Error, isMatch: boolean) => void
) => void;

export type User = Document & {
  _id: string;
  email: string;
  name: string;
  password: string;
  comparePasswords: comparePasswordFunction;
};

delete mongoose.connection.models["User"];

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 32,
  },
  password: {
    type: String,
    required: true,
  },
});

const SALT_WORK_FACTOR: number = 10;

UserSchema.pre("save", function (next) {
  const user = this as User;
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePasswords = function (
  candidatePassword: string,
  cb: (err: Error | null, same: boolean | null) => void
) {
  const user = this as User;
  bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
    if (err) {
      return cb(err, null);
    }
    cb(null, isMatch);
  });
};

export const userModel = mongoose.model<User>("User", UserSchema);
