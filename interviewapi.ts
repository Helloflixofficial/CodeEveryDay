import exprss from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

const app = exprss();

app.use(cors({
    credentials: true,

}))


app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json())


const server = http.createServer(app);
server.listen(8080, () => {
    console.log("Server is running on port 8080");
})


const MANGO_URL = ""


mongoose.Promise = Promise;
mongoose.connect(MANGO_URL);
mongoose.connection.on("error", (Error) =>
    console.log(Error));
