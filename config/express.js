import { engine } from 'express-handlebars';
import express from "express";
import cookieParser from 'cookie-parser';
import { auth } from '../middlewares/auth.js';


export function setupExpress(app) {
    app.engine('hbs', engine({
        extname: "hbs"
    }));
    app.set('view engine', 'hbs');

    app.use(express.static('public'));

    app.use(express.urlencoded({extended:true}))

    app.use(cookieParser());

    app.use(auth());

}