// src/models/paste.model.ts
import mongoose, { Document } from 'mongoose'
// import { composeWithMongoose } from 'graphql-compose-mongoose'

export interface Paste extends Document {
    url: string
    pastedBy: string
    content: string
    duration_period: string
}

const PasteSchema = new mongoose.Schema(
    {
        url: String,
        pastedBy: String,
        content: String,
        duration_period: String,
    },
    // Adds createdAt and updatedAt to the model
    { timestamps: true }
)

export default mongoose.model<Paste>('Paste', PasteSchema)
// export const Paste = mongoose.model('Paste', PasteSchema)
// export const PasteTC = composeWithMongoose(Paste)
