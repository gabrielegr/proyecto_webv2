var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookie = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var debug = require("debug")("proyectowebv2:database");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var superviseRouter = require("./routes/supervise");
var reserveRouter = require("./routes/reserve");
var morgan = require("morgan");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
mongoose
  .connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    debug("success Connected to database");
  })
  .catch(err => {
    debug(err);
    process.exit(1);
  });
var db = mongoose.connection;

//static files

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookie(process.env.SECRET))
app.use(flash());
app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/", reserveRouter);
app.use("/", superviseRouter);
app.use(session({
    store: new MongoStore({
      mongooseConnection: db,
      collection: "session",
    }
    ),
    resave: true,
    secret: "uwu",
    proxy: true,
    resave: true,
    saveUninitialized: true
  })
);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/supervice', superviseRouter);
app.use('/reserve', reserveRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;