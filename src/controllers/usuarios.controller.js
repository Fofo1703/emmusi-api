import supabase from '../database/database.js';
import { Mensajes } from './messages'


export const validarCredenciales = async (req, res) => {

    try {
        const { usuario, password } = req.body;

        // Consultamos la base de datos para encontrar el usuario
        const { data: user, error } = await supabase
            .from('Usuarios') // Asegúrate de que la tabla se llama 'Usuarios'
            .select('usuario, password') // Traer solo los campos relevantes
            .eq('usuario', usuario)
            .single();; // Esperamos solo un usuario único
        if (error) {
            if (error.code === 'PGRST116') {
               return res.status(404).json({ message: 'El usuario no existe' });
            }
            res.status(400).json({ message: Mensajes(4) });
        }

        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' }); // Credenciales incorrectas
        }

        return res.status(200).json({ message: 'Credenciales correctas' }); // Usuario autenticado exitosamente
    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};









