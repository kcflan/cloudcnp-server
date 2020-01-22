// src/controllers/paste.controller.ts
import PasteModel, { Paste } from '../models/paste.model'
import { PASTE_CREATED } from '../constants'
import { pubsub } from '../app'
import path from 'path'
export interface CreatePasteInput {
    url: string
    pastedBy: string
    content: string
    duration_period: string
}

// Create a new paste from the given input
export async function createPaste({
    url,
    pastedBy,
    content,
    duration_period,
}: CreatePasteInput): Promise<Paste | Error> {
    const paste = await PasteModel.create({
        url,
        pastedBy,
        content,
        duration_period,
    })
        .then((data: Paste) => data)
        .catch((error: Error) => {
            throw error
        })

    // Publish the creation of a new paste to whomever is listening
    pubsub.publish(PASTE_CREATED, { PasteCreated: paste })

    return paste
}

export interface GetAllPastesInput {
    limit?: number
}

export function getAllPastes({ limit }: GetAllPastesInput) {
    return PasteModel.find({})
        .limit(limit ? limit : 0)
        .then((data: Paste[]) => data)
        .catch((error: Error) => {
            throw error
        })
}
export interface GetOnePasteInput {
    url: string
}

export function getOnePaste(url: GetOnePasteInput) {
    return PasteModel.find({ url: url })
        .then((data: Paste[]) => data)
        .catch((error: Error) => {
            throw error
        })
}
