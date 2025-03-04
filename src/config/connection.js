const mongoose = require('mongoose'); //IMPORTA MONGOOSE
require('dotenv').config(); //IMPORTA DOTENV

const URI = `mongodb+srv://${process.env.USUARIOBD}:${process.env.PASSBD}@adso2846458.lz0nz.mongodb.net/adso58` //guarda la URI de mongo en constante URI
                                            
mongoose.connect(URI) //conectar mongoose a URI con el metodo Connect.URI


module.exports=mongoose;