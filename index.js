const express = require('express');
const app = express();

app.get('/a', (req, res) => { 
  res.send({ "false || 0": false || 0 });
})

app.get('/b', (req, res) => { 
  res.send({ "qweqdw || 012ked": "qweqdw" || "012ked" });
})

const PORT = process.env.PORT || 5000;
app.listen(5000);