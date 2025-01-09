const dotenv = require('dotenv');
const express = require('express');
const apiRouter = require('./routes/api.js');
const viewsRouter = require('./routes/views.js');

const app = express();

dotenv.config();

app.use('/', viewsRouter);
app.use('/api', apiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})