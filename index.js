const exp = require("express");
const modeloProducto = require("./src/models/producto");
require('dotenv').config();
const app = exp();
app.use(exp.json());
app.use(exp.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.write("BIENVENIDO");
    res.end();
});

//callback

app.get("/productos", async (req, res) => {
    let listaProductos = await modeloProducto.find({});
    console.log(listaProductos);
    if(listaProductos){
        res.json(listaProductos);
    }else{
        res.json({"error": "No hay productos"});
    }
});

app.get("/productos/:nombre", async (req, res) => {
    let listaProductos = await modeloProducto.findOne({ nombre: req.params.nombre });
    console.log(listaProductos);
    if(listaProductos){
        res.json(listaProductos);
    }else{
        res.json({"error": "No hay productos"});
    }
});

app.post('/productos', async (req,res)=>{ //constructor para POST que es para enviar datos, req y res quiere decir que espera una request y luego da una respuesta
    const nuevoProducto = { //le enviamos un producto como objeto
        "referencia":req.params.referencia, //campos que tenmos en la bd para llenar el objeto que vamos a insertar
        "nombre" : req.body.nombre,
        "precio": req.body.precio
    }

    let insercion = await modeloProducto.create(nuevoProducto); //varibale para guardar los datos del producto
    if (insercion){
        res.json(insercion); //muestra el json con el producto creado
    }else{
        res.json({"error": "No se pudo insertar"}); // sino, muestra un error
    }
})

app.put('/productos/:referencia', async (req,res)=>{
    const productoEditado = { //le enviamos un producto como objeto
        "referencia":req.params.referencia, //campos que tenemos en la bd para llenar el objeto que vamos a insertar
        "nombre" : req.body.nombre,
        "precio": req.body.precio
    }

    let actualizacion = await modeloProducto.findOneAndUpdate({"referencia": req.params.referencia}, productoEditado); 
    if(actualizacion){
        res.json({"El producto: " : actualizacion});
    }else{
        res.json({"error": "No se pudo actualizar"});
    }
});



app.listen(process.env.PORT, () => {
    console.log(`Servidor en linea, Puerto ${process.env.PORT}`);
});
