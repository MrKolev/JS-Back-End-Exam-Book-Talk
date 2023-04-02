import mongoose from "mongoose";

export function setupMongoose(app) {
    mongoose.connect("mongodb+srv://IvanKolev:o9M8aKtzce5rmvap@cluster0.zodrwvl.mongodb.net/BookTalk")

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', console.log.bind(console, 'Db Connected!'));
}