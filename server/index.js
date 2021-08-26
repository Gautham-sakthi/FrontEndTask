const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const trackRoutes = require('./routes/tracks');
const albumRoutes = require('./routes/album');
const playlistRoutes = require('./routes/playlist');
dotenv.config();

async function connection(){
   await mongoose.connect(process.env.DB_CONNECT,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => {
            console.log('connected to DB')
        });
}
connection();

app.use(express.json());
app.use(cors())

app.use('/api/user', authRoutes);
app.use('/api/tracks', trackRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/playlist', playlistRoutes);

app.listen(5000, () => {
    console.log('Up and running')
})