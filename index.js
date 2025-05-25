require('dotenv').config({ path: '.env.local' });
const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//Routers
const userRouter = require('./routes/Users');
app.use("/users", userRouter);
const userAuthRouter = require('./routes/UserAuth');
app.use('/userAuth', userAuthRouter);
const emailRoutes = require("./routes/Email");
app.use("/", emailRoutes);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port", process.env.PORT);
    });
});