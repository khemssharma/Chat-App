import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';

import cors from 'cors';
import path from 'path'

import { connectDB } from './src/lib/db.js';
import authRoutes from "./src/routes/auth.routes.js";
import messageRoutes from "./src/routes/message.routes.js";

import { app, server } from './src/lib/socket.js';

const port = process.env.PORT; 
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use('/api/auth', authRoutes); 
app.use('/api/message', messageRoutes)

// TODO: check path dist or build

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'));
    });
}

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Your Server is up and running!' })
});

server.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
    connectDB();
});