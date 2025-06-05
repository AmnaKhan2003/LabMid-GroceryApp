import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './Database/db.js';
import UserRouter from './routes/UserRoutes/UserRoute.js'
import cors from 'cors'
const port = 5000;
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser()); 
app.use('/api/User',UserRouter)



app.get('/', (req, res) => {
  res.send('Server is running on port 5000');
});

app.listen(port, () => {
  db();
  console.log(`Listening on port ${port}`);
  
});
