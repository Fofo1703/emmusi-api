import supabase from '../database/database.js';
import { Mensajes } from './messages'

export const getProfesores = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros de la base de datos
        const { data: profesores, error } = await supabase.from('Profesores').select('*');

        if (error) {
            // Si ocurre un error al llamar al servidor, devolvemos el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (profesores && profesores.length > 0) {
            // Si hay registros, los retornamos
            res.status(200).json(profesores);
        } else {
            // Si no se encontraron registros, devolvemos el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla inesperadamente, enviamos el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const insertProfesor = async (req, res) => {

    try {
        // throw new Error("Simulación de fallo en el método");

        // Crear el profesor 
        const { nombre } = req.body;
        const profesor = { nombre };

        // Validación de campos requeridos
        if (!profesor.nombre) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se registrar el profesor en la base de datos
        const { data, error } = await supabase.from('Profesores').insert([profesor]);

        if (error) {
            if (error.code === '23505') {
                // Si el numero de ceduala ya existe en la base de datos, devuelve el mensaje 6
                return res.status(400).json({ message: 'Este profesor ya se encuentra registrado' });
            }

            res.status(400).json({ message: Mensajes(4) });
        } else {
            // Si el registro es exitoso, devolvemos el mensaje 3
            res.status(201).json({ message: Mensajes(3) });
        }
    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};


export const updateProfesor = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
 
        const { id, nombre } = req.body;
        const profesor = { id, nombre };
        
        
        if (!profesor.id || !profesor.nombre) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Actualiza el registro en la base de datos
        const { error } = await supabase.from('Profesores').update([profesor])
            .eq('id', profesor.id); // Actualizar el registro basado en el id


        if (error) {
            res.status(500).json({ message: Mensajes(4) });
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const deleteProfesor= async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se elimina el registro de la base de datos
        const { error } = await supabase
            .from('Profesores').delete().eq('id', id); // Eliminar basado en el id

        if (error) {
            res.status(500).json({ message: Mensajes(4) });
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};





