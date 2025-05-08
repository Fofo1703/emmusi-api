import supabase from '../database/database.js';
import { Mensajes } from './messages.js'

export const getCursosMatriculados = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { data: cursosMatriculados, error } = await supabase.from('CursosMatriculados').select('*');

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (cursosMatriculados && cursosMatriculados.length > 0) {
            // Si hay registros, se retornan
            res.status(200).json(cursosMatriculados);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const insertCursoMatriculado = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Crea el curso matriculado
        const { cedulaEst, curso, ciclo } = req.body;
        const cursoMatriculado = { cedulaEst, curso, ciclo };

        // Validación de campos requeridos
        if (!cursoMatriculado.cedulaEst || !cursoMatriculado.curso || !cursoMatriculado.ciclo) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se registra el curso matriculado en la base de datos
        const { data, error } = await supabase.from('CursosMatriculados').insert([cursoMatriculado]);

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


export const updateCursoMatriculado = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params; 
        const { cedulaEst, curso, ciclo } = req.body;
        const cursoMatriculado = { id, cedulaEst, curso, ciclo };
        

        if (!cursoMatriculado.id || !cursoMatriculado.cedulaEst || !cursoMatriculado.curso || !cursoMatriculado.ciclo) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se actualiza el registro en la base de datos
        const { error } = await supabase
            .from('CursosMatriculados').update([cursoMatriculado])
            .eq('id', cursoMatriculado.id); // Actualizar el registro basado en el id


        if (error) {
            res.status(500).json({ message: Mensajes(4) });
        } else {
            res.status(200).json({ message: Mensajes(3) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const deleteCursoMatriculado = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params; 

        if (!id) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se elimina el registro de la base de datos
        const { error } = await supabase
            .from('CursosMatriculados')
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









