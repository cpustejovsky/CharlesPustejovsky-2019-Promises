const Express = require("express");
const app = Express();
const port = process.env.PORT || 3000;
app
  .listen(port, () => {
    console.log(`Running on port ${port}`);
  })
  .on("error", () => {
    app.listen(port + 1, () => {
      console.log(`Running on port ${port}`);
    });
  });
