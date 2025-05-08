import supabase from '../database/database.js';
import { Mensajes } from './messages.js'

export const getCalificaciones = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { data: calificaciones, error } = await supabase.from('Calificaciones').select('*');

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (calificaciones && calificaciones.length > 0) {
            // Si hay registros, se retornan
            res.status(200).json(calificaciones);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const insertCalificacion = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Crea la calificacion
        const { idCursoMatriculado, nota, estado } = req.body;
        const calificacion = { idCursoMatriculado, nota, estado };

        // Validación de campos requeridos
        if (!calificacion.idCursoMatriculado || !calificacion.nota || !calificacion.estado) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se registra la calificacion en la base de datos
        const { data, error } = await supabase.from('Calificaciones').insert([calificacion]);

        if (error) {
            
            res.status(400).json({ message: Mensajes(4) });
        } else {
            // Si el registro es exitoso, devuelve el mensaje 3
            res.status(201).json({ message: Mensajes(3) });
        }
    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};


export const updateCalificacion = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params; 
        const { idCursoMatriculado, nota, estado } = req.body;
        const calificacion = { id, idCursoMatriculado, nota, estado };
        

        if (!calificacion.id || !calificacion.idCursoMatriculado || !calificacion.nota || !calificacion.estado) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se actualiza el registro en la base de datos
        const { error } = await supabase
            .from('Calificaciones').update([calificacion])
            .eq('id', calificacion.id); // Actualizar el registro basado en el id

        if (error) {
            res.status(500).json({ message: Mensajes(4) });
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const deleteCalificacion = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se elimina el registro de la base de datos
        const { error } = await supabase
            .from('Calificaciones')
            .delete()
            .eq('id', id); // Eliminar basado en el id

        if (error) {
            res.status(500).json({ message: Mensajes(4) });
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};









