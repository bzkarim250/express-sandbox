import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './database/dbConnect';
import route from './routes/index';

dotenv.config();

const app = express();
app.use(express.json());
dbConnect();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use("/api", route);
