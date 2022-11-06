const flash = require('connect-flash')
const {auth} = require('./middleware/auth')
const express = require("express");
const app = express();
const path = require("path");
const exhbs = require("express-handlebars");
const session = require('express-session')

require("dotenv").config();

const indexRouter = require("./routes/index");
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth')
const newsRouter = require('./routes/news')

const hbs = exhbs.create({
  layoutsDir: "views/layouts",
  layout: "main",
  extname: "hbs",
  runtimeOptions: {
    allowProtoMethodsByDefault: true,
    allowProtoPropertiesByDefault: true,
  },
});
app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs.engine);
app.set("view engine", ".hbs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false
}))
app.use(flash());
app.use('/cucumber', adminRouter)
app.use('/', authRouter)

app.use(auth)

app.use("/", indexRouter);
app.use('/news', newsRouter)

require("./helper/db")(process.env.MONGO_URI);
const port = normalizePort(process.env.PORT || 3000);
app.listen(port, () => {
  console.log("Server is working on port", port);
});

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
