import supabase from '../database/database.js';
import { Mensajes } from './messages'

export const getHorarios = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { data: horarios, error } = await supabase.from('Horarios').select('*');

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (horarios && horarios.length > 0) {
            // Si hay registros, se retornan
            res.status(200).json(horarios);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const insertHorario = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Crea el horario
        const { curso, profe, dia, horaInicio, horaFin, ciclo } = req.body;
        const horario = { curso, profe, dia, horaInicio, horaFin, ciclo };
        console.log(horario.curso);
        
        // Validación de campos requeridos
        if (!horario.curso || !horario.profe || !horario.dia || !horario.horaInicio || !horario.horaFin || !horario.ciclo) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se registra el horario en la base de datos
        const { data, error } = await supabase.from('Horarios').insert([horario]);

        if (error) {
            res.status(400).json({ message: Mensajes(4) });
        } else {
            // Si el registro es exitoso, devuelve el mensaje 3
            res.status(201).json({ message: Mensajes(3) });
        }
    } catch (error) {
        // Si el método falla, devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
};


export const updateHorario = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params; 
        const { curso, profe, dia, horaInicio, horaFin, ciclo } = req.body;
        const horario = { id, curso, profe, dia, horaInicio, horaFin, ciclo };
        

        if (!horario.id ||!horario.curso || !horario.profe || !horario.dia || !horario.horaInicio || !horario.horaFin || !horario.ciclo) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se actualiza el registro en la base de datos
        const { error } = await supabase
            .from('Horarios').update([horario])
            .eq('id', horario.id); // Actualizar el registro basado en el id


        if (error) {
            res.status(500).json({ message: Mensajes(4) });
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const deleteHorario = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se elimina el registro de la base de datos
        const { error } = await supabase
            .from('Horarios')
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









