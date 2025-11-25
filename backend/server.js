const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const uploadRoutes = require('./routes/upload');
const path = require('path');


const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/api/upload', uploadRoutes);


// serve uploads (for dev only)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
