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

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "src", "public")));

// Middleware para configurar la sesión
app.use(cookieParser());
app.use(
  session({
    secret: "LuHlA#$%&/nASDArsDfDGrsodfAST$%W#RTGHS",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000, // 1 día
    },
  })
);

// Middleware para parsear el body de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para sobrescribir métodos HTTP
app.use(methodOverride("_method"));

// Configuración de vistas EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

// Middleware para configurar Passport
passportConfig(app);

// Configuración de las rutas
app.use('/auth', authRouter);
app.use('/inventory', inventoryRouter);
app.use('/categories', categoriesRouter);

// Ruta principal para renderizar el index
app.get('/', (req, res) => {
    res.render('index'); // Renderiza la vista index.ejs desde la carpeta de vistas
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
