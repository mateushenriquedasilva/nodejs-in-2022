const express = require("express");
const fs = require("fs");
// id random
const { randomUUID } = require("crypto");
const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    products = JSON.parse(data);
  }
});

/*
  Body = Sempre que eu quiser enviar dados para minha aplicação
  Params = /product/valor
  Query = /product?id=546564
*/

// route
app.get("/", (req, res) => {
  return res.send("Servidor Web");
});

app.get("/products", (req, res) => {
  return res.json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === id);
  return res.json(product);
});

app.post("/products", (req, res) => {
  const { name } = req.body;

  const product = {
    name: name,
    id: randomUUID(),
  };
  products.push(product);
  fs.writeFile("products.json", JSON.stringify(products), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Produto Inserido");
    }
  });
  return res.json(products);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const productIndex = products.findIndex((product) => product.id === id);
  products[productIndex] = {
    ...products[productIndex],
    name,
  };
  return res.json(products);
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;

  const productIndex = products.findIndex((product) => product.id === id);
  products.splice(productIndex, 1);
  return res.json(products);
});

app.listen(4002, () => console.log("Servidor está rodando na porta 4002💚"));
