import express from 'express';
import connectDB from './db.js';
import questionRouter from './controller/question.js';
import userRouter from './controller/user.js';
import cors from 'cors';

const app = express()
const port = 4000
connectDB();

app.use(express.json())
app.use(cors({origin: '*'}))

app.get('/', (req, res) => {
  res.send('Full Stack Training Backend Server is up and running')
})

app.use(questionRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Full Stack Training Backend Server is running on Port No. ${port}`)
})
