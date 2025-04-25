require('dotenv').config();
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    process.env.SUPABASE_ANON_KEYPROJECT_URL, 
    // process.env.SUPABASE_ANON_KEY
    process.env.SUPABASE_SERVICE_ROLE
);

// supabase.connect((err) => {
//     if (err) {
//         throw err;
//     }
    console.log('Conectado a la base de datos');

// });

module.exports = supabase;
