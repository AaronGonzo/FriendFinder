var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 7500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//This will point our server to the route files
require("./Routing/apiRoutes")(app);
require("./Routing/htmlRoutes")(app);

//Listener and starts the server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
