const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/posting"));
app.use(require("./routes/user"));
app.use(require("./routes/transaction"));
app.use(require("./routes/message"));
// get driver connection
const dbo = require("./db/conn");
console.log(app);

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
