require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const passportConfig = require("./config/passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const authRouter = require('./routes/users/auth.router');
const inventoryRouter = require('./routes/inventory.router');
const categoriesRouter = require('./routes/categories.router');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname, "src")));
app.use(cookieParser());
app.use(
  session({
    secret: "LuHlA#$%&/nASDArsDfDGrsodfAST$%W#RTGHS",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use('/auth', authRouter);
app.use('/inventory', inventoryRouter);
app.use('/categories', categoriesRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
