const Handlebars = require('handlebars');
const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
const hbs = require("express-handlebars");
const {mongoDbUrl, PORT, globalVariables} = require('./config/config')
const flash = require("connect-flash")
const session = require("express-session")
const methodOverride = require("method-override")
const {selectOption} = require('./config/customFunctions')
const {includes} = require('./config/customFunctions')
const {eqw} = require('./config/customFunctions')
const fileUpload = require('express-fileupload')
const passport = require('passport')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const MongoStore = require('connect-mongo')
const bodyParser = require('body-parser')
const {eq} = require('./node_modules/just-handlebars-helpers/lib/helpers/conditionals')




const app = express();


//configure mongoose to connect to mongoDB
mongoose.connect(mongoDbUrl,
    {
    useNewUrlParser: true,
  }
)
    .then(response => {
        console.log("MongoDB Connected Successfully.")
    }).catch(err => {
        console.log("Database connection failed.")
})

//config express
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', [__dirname + '/views', __dirname + '/admin']);


//flash and session
app.use(session({
    secret: 'anysecret',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: null},
    store: new MongoStore ({ mongoUrl: mongoDbUrl})
}))

app.use(flash())
//passport initializing
app.use(passport.initialize());
app.use(passport.session());


//global variables
app.use(globalVariables)

//fileUpload Middleware
app.use(fileUpload())


//setup to use handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', hbs.engine({ 
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'default',
    partialsDir: 'views/layouts/partials',
    helpers: {
            select: selectOption,
            includes: includes,
            equal: eqw,
            eq: eq},
 }))


//method override middleware
app.use(methodOverride('newMethod'))

/* Routes */
const defaultRoutes = require('./routes/defaultRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/', defaultRoutes);
app.use('/admin', adminRoutes);


// Start The Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



