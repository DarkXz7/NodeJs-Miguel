const exp = require("express");
const modeloProducto = require("./src/models/producto");

const app = exp();

app.get("/", (req, res) => {
    res.write("BIENVENIDO");
    res.end();
});

//callback

app.get("/productos", async (res, req) => {
    let listaProductos = await modeloProducto.find({});
    console.log(listaProductos);
});

app.get("/productos/:nombre", async (req, res) => {
    let listaProductos = await modeloProducto.find({ nombre: req.params.nombre });
    console.log(listaProductos);
});

app.post("/productos", async (req, res) => {
    const nuevoProducto = new modeloProducto({
        referencia: req.body.referencia,
        nombre: "juan",
        precio: 50000,
    });
    await nuevoProducto.save();
    console.log("exitoso");
});
app.listen(9333);
