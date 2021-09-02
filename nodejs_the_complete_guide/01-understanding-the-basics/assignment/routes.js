const fs = require("fs");

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.write("<html>");
        res.write("<head><title>This is Assignment</title></head>");
        res.write("<body><br>");
        res.write("Hey, Welcome to your assignment");
        res.write(
            '<br><br><form action="/create-user" method="POST"><input tupe="text" name="username">'
        );
        res.write('<button type="submit">Send</button>');
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }

    if (url === "/users") {
        res.write("<html>");
        res.write("<head><title>This is UsersList</title></head>");
        res.write("<body><br>");
        res.write("<ul>");
        res.write("<li>User 1</li>");
        res.write("<li>User 2</li>");
        res.write("<li>User 3</li>");
        res.write("<li>User 4</li>");
        res.write("</ul>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }

    if (url === "/create-user" && method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        return req.on("end", () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];
            console.log("Entered user is: ", message);
            res.statusCode = 302;
            res.setHeader("Location", "/users");
            return res.end();
        });
    }
};

exports.handler = requestHandler;
