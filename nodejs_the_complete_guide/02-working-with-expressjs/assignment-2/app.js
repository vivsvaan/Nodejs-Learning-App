const path = require("path");

const express = require("express");

const app = express();

const usersRoutes = require("./routes/users");

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRoutes);

app.use("/", (req, res, next) => {
    res.send("<h1>THIS IS DEFAULT PAGE</h1>");
});

app.listen(3000);
