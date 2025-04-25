require('dotenv').config();
import cors from 'cors'
 import express from 'express'
 import morgan from 'morgan';
 import router from './routes.js';
 const app = express();



// Config request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Config puerto/host client
app.listen(process.env.PORT_API, '0.0.0.0',function(){
    console.log('Conexión en el puerto: ',  process.env.PORT_API);
  } );
  
app.use('/api',router);
