const  express = require ("express");
const ejs = require("ejs");
const path = require("path");
const qrcode = require("qrcode");//
const exp = require("constants");//
const app = express(); //crea una app de express
const port= process.env.port || 3000;

require('./database');
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
//carga los archivos de css
app.use(express.static("estilosQR"));

app.get("/", (req, res, next) => {//principal
    res.render("principal");
});

app.get("/index", (req, res, next) => {//codigo qr
  res.render("index");
});

app.get("/acerca", (req, res, next) => {//submenu
  res.render("acerca");
});

app.post("/scan",(req, res, next) => {//
const input_text = req.body.text;
console.log(input_text);
qrcode.toDataURL(input_text, (err,src) => {//
   // if (err) res.send("Something went wrong!!");
    res.render("scan", {
      qr_code: src,
    });
});
});

app.listen(port, console.log("listening on port ${port}"));
