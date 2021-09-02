const express = require("express");

const app = express();

app.use((req, res, next) => {
    console.log("First Middleware");
    next();
});

app.use((req, res, next) => {
    console.log("Second Middleware");
    console.log("Sending response");
    res.send("<h1>Response from server</h1>");
});

// app.use("/users", (req, res, next) => {
//     console.log("Users middleware");
//     res.send("<h1>Users List</h1>");
// });

// app.use("/", (req, res, next) => {
//     console.log("Default middleware");
//     res.send("<h1>Default</h1>");
// });

app.listen(3000);
