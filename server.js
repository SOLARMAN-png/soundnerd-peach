const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const staticPath = path.join(__dirname, "dist");
app.use(express.static(staticPath));

// SPA fallback: serve index.html for any non-static route
app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
