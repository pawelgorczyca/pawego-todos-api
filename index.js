const express = require('express');
const mongoose = require('mongoose');
const todosConfigs = require('./src/configs/todos.config');
const app = express();
const port = todosConfigs.port;

const todosRouter = require('./src/routes/todos.routes');
const mongoDB = todosConfigs.mongoDbHost;
const cors = require('cors');
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(cors());
app.use(express.json());
app.use('/todos', todosRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})