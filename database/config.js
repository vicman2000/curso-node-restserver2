
const mongoose = require('mongoose');
const { options } = require('../src/routes/usuarios.route');

const dbConnect = async () => {
    
    try {

        mongoose.set('strictQuery', true);
        mongoose.connect( process.env.MONGODB_CNN, {
          useNewUrlParser: true,
            useUnifiedTopology: true,
        //  useCreateIndex: true,
        // useFindAndModify: false,
              
        });


        

        console.log('Base de datos Online');
         
    } catch (error) {
        console.log(error);
        
        throw new Error('Error al momento de conectarse a la Base de Datos');
    }

    }



module.exports = {
    dbConnect
}