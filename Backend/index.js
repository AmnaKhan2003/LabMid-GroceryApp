import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import db from './Database/db.js';

const port = 5000;
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser()); 


app.get('/', (req, res) => {
  res.send('Server is running on port 5000');
});

app.listen(port, () => {
  db();
  console.log(`Listening on port ${port}`);
  
});
