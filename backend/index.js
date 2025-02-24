import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './src/lib/db.js';
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
const port = process.env.PORT || 3000; 
app.use(express.json());

app.use('/api/auth', authRoutes); 
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.listen(port, () => {
    console.log(`Server is running on PORT:${port}`);
    connectDB();
});