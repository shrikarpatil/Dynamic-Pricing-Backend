require('dotenv').config({ path: '.env.local' });
const express = require('express');
const db = require('./models');
const app = express();

app.use(express.json());

//Routers
const userRouter = require('./routes/Users');
app.use("/users", userRouter);

db, db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port", process.env.PORT);
    });
});