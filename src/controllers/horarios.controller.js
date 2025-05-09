import supabase from '../database/database.js';
import { Mensajes } from './messages'

export const getHorarios = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { data: horarios, error } = await supabase
            .from('Horarios').select('id, Cursos(nombre), Profesores(nombre), dia , horaInicio, horaFin, ciclo');

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (horarios && horarios.length > 0) {
            const datosFormateados = horarios.map(cm => ({
                id: cm.id,
                curso: cm.Cursos.nombre,
                profesor: cm.Profesores.nombre,
                dia: cm.dia,
                horaInicio: cm.horaInicio,
                horaFin: cm.horaFin,
                ciclo: cm.ciclo,
            }));
            // Si hay registros, se retornan
            res.status(200).json(datosFormateados);
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
        const { idCurso, idProfesor, dia, horaInicio, horaFin, ciclo } = req.body;
        const horario = { idCurso, idProfesor, dia, horaInicio, horaFin, ciclo };

        // Validación de campos requeridos
        if (!horario.idCurso || !horario.idProfesor || !horario.dia || !horario.horaInicio || !horario.horaFin || !horario.ciclo) {
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
        const { idCurso, idProfesor, dia, horaInicio, horaFin, ciclo } = req.body;
        const horario = { id, idCurso, idProfesor, dia, horaInicio, horaFin, ciclo };


        if (!horario.id || !horario.idCurso || !horario.idProfesor || !horario.dia || !horario.horaInicio || !horario.horaFin || !horario.ciclo) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se actualiza el registro en la base de datos
        const { data, error } = await supabase
            .from('Horarios').update([horario])
            .eq('id', horario.id)
            .select(); // Agregamos .select() para obtener los registros afectados

        if (error) {
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (data.length > 0) {
            return res.status(200).json({ message: Mensajes(3) });
        } else {
            return res.status(404).json({ message: 'No se encontró el registro a actualizar' });
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









