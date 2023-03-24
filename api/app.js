const express = require('express');
const cors = require('cors');
require('./database');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const streamRouter = require('./routes/stream');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/stream', streamRouter);

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});