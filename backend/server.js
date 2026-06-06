const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const sequelize = require('./config/database');
const router = require('./routes/router');

const app = express();
app.use(cors());
app.use(express.json());

//Serve uploads folder statically
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Test DB
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('DB connection failed:', err));

app.use('/api/', router);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
});
