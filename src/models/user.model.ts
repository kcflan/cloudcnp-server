// src/models/user.model.ts
import mongoose, { Document } from 'mongoose'

export interface User extends Document {
    name: string
    email: string
    password: string
    pastes: []
}

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        pastes: Array,
    },
    // Adds createdAt and updatedAt to the model
    { timestamps: true }
)

export default mongoose.model<User>('User', UserSchema)
