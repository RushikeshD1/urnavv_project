const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const plantRouter = require("./routes/plants.routes");
const mongoose = require("mongoose");

dotenv.config();

const port = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors({
    origin : process.env.LOCAL_HOST,
    credentials: true
}))

app.use("/api/v1/plant", plantRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected successfully"))
    .catch((err) => console.log("Error while connecting DB", err))

app.listen(port, () => {
    console.log(`server running at port ${port}`);
})