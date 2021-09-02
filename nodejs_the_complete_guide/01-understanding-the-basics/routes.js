const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>TitleHere</title></head>");
        res.write(
            '<body><br><br><form action="/message" method="POST"><input tupe="text" name="message"><button type="submit">Send</button></body>'
        );

        res.write("</html>");
        return res.end();
    }

    if (url === "/message" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log("pushing data");
            console.log(chunk);
            body.push(chunk);
        });

        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            fs.writeFile("message.txt", message, (err) => {
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            });
        });
    }

    console.log(req.url, req.method, req.headers);
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Hello</title></head>");
    res.write("<body>Hellofsdfs</body>");
    res.write("<html>");
    res.end();
};

// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: "Some Hard Coded Texr",
// };

// module.exports.handler = requestHandler;
// module.exports.someText = "Some Hard Coded Text";

exports.handler = requestHandler;
exports.someText = "Some Hard Coded Text";
