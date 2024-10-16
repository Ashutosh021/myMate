const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const dbConnect = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/auth');
const postRoutes = require('./Routes/post');

app.use(express.json());
app.use(cookieParser());

// Enable CORS for all routes
// app.use(cors());
 
app.use(cors({
    origin: 'http://localhost:5173', // frontend address
    credentials: true // Allow cookies to be sent
  }));  

dbConnect();

app.get('/', (req, res) => {
  res.send("Home");
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
