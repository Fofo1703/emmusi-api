import supabase from '../database/database.js';
import { Mensajes } from './messages'

export const getEstudiantes = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { data: estudiantes, error } = await supabase.from('Estudiantes').select('*');

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (estudiantes && estudiantes.length > 0) {
            // Si hay registros, se retornan
            res.status(200).json(estudiantes);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const getEstudiante = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { id } = req.params;
        const { data: estudiantes, error } = await supabase.from('Estudiantes').select('*').eq('id', id);

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (estudiantes && estudiantes.length > 0) {
            // Si hay registros, se retornan
            res.status(200).json(estudiantes);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
        }

export const insertEstudiante = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Crea el estudiante
        const { cedula, nombre, telefono, especialidad, subespecialidad } = req.body;
        const estudiante = { cedula, nombre, telefono, especialidad, subespecialidad };

        // Validación de campos requeridos
        if (!estudiante.cedula || !estudiante.nombre || !estudiante.telefono || !estudiante.especialidad || !estudiante.subespecialidad) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se registra el estudiante en la base de datos
        const { data, error } = await supabase.from('Estudiantes').insert([estudiante]);

        if (error) {
            if (error.code === '23505') {
                // Si el numero de ceduala ya existe en la base de datos, devuelve el mensaje 6
                return res.status(400).json({ message: Mensajes(6) });
            }
            
            res.status(400).json({ message: Mensajes(4) });
        } else {
            // Si el registro es exitoso, devuelve el mensaje 3
            res.status(201).json({ message: Mensajes(3) });
        }
    } catch (error) {

        res.status(500).json({ message: Mensajes(5) });
    }
};


export const updateEstudiante = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params; 
        const { cedula, nombre, telefono, especialidad, subespecialidad } = req.body;
        const estudiante = { id, cedula, nombre, telefono, especialidad, subespecialidad };
        

        if (!estudiante.id ||!estudiante.cedula || !estudiante.nombre || !estudiante.telefono || !estudiante.especialidad || !estudiante.subespecialidad) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se actualiza el registro en la base de datos
        const { error } = await supabase
            .from('Estudiantes').update([estudiante])
            .eq('id', estudiante.id); // Actualizar el registro basado en el id


        if (error) {
            if (error.code === '23505') {
                return res.status(400).json({ message: Mensajes(6) });
            }
            
            res.status(400).json({ message: Mensajes(4) });
            
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const deleteEstudiante = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se elimina el registro de la base de datos
        const { error } = await supabase
            .from('Estudiantes')
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









