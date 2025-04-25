import supabase from '../database/database.js';
import { Mensajes } from './messages'

export const getCursos = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros de la base de datos
        const { data: cursos, error } = await supabase.from('Cursos').select('*');

        if (error) {
            // Si ocurre un error al llamar al servidor, devolvemos el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (cursos && cursos.length > 0) {
            // Si hay registros, los retornamos
            res.status(200).json(cursos);
        } else {
            // Si no se encontraron registros, devolvemos el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla inesperadamente, enviamos el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const insertCursos = async (req, res) => {

    try {
        // throw new Error("Simulación de fallo en el método");

        // Crear el estudiante 
        const { nombre } = req.body;
        const cursos = { nombre };

        // Validación de campos requeridos
        if (!cursos.nombre) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se registrar el cursos en la base de datos
        const { data, error } = await supabase.from('Cursos').insert([cursos]);

        if (error) {

            res.status(400).json({ message: Mensajes(4) });
        } else {
            // Si el registro es exitoso, devolvemos el mensaje 3
            res.status(201).json({ message: Mensajes(3) });
        }
    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};


export const updateCursos = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
 
        const { id, nombre } = req.body;
        const cursos = { id, nombre };
        
        
        if (!cursos.id || !cursos.nombre) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Actualiza el registro en la base de datos
        const { error } = await supabase.from('Cursos').update([cursos])
            .eq('id', cursos.id); // Actualizar el registro basado en el id

        if (error) {
            res.status(500).json({ message: Mensajes(4) });
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const deleteCursos = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se elimina el registro de la base de datos
        const { error } = await supabase
            .from('Cursos').delete().eq('id', id); // Eliminar basado en el id

        if (error) {
            res.status(500).json({ message: Mensajes(4) });
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};





