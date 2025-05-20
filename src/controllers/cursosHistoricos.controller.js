import supabase from '../database/database.js';
import { Mensajes } from './messages.js'

export const getCursosHistoricos = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { data: cursosHistoricos, error } = await supabase
            .from('CursosHistoricos').select(`
            id, Cursos ( nombre ), ciclo, nota,  estado`);

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (cursosHistoricos && cursosHistoricos.length > 0) {
            const datosFormateados = cursosHistoricos.map(cal => ({
                id: cal.id,
                curso: cal.Cursos.nombre,
                ciclo: cal.ciclo,
                nota: cal.nota,
                estado: cal.estado
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

export const getCursoHistorico = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { id } = req.params;
        const { data: calificacion, error } = await supabase.from('CursosHistoricos').select('*').eq('id', id);

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (calificacion && calificacion.length > 0) {
            // Si hay registros, se retornan
            res.status(200).json(calificacion);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
}

export const insertCursoHistorico = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Crea el curso histrico
        const { id } = req.params;
        const { error } = await supabase.rpc('InsertarCursoHistorico', { _id: id });
        console.log(id);
        
        if (error) {
            console.log(error);
            if (error.code === '23502') {
                return res.status(400).json({ message: 'Este curso aun no tiene una nota asignada' });
            }
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(400).json({ message: Mensajes(4) });
        }
        res.status(200).json({ message: Mensajes(3) });
    }catch (error) {
        
        
        res.status(500).json({ message: Mensajes(5) });
    }
};





export const updateCursoHistorico = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;
        const { idCursoMatriculado, nota, estado } = req.body;
        const calificacion = { id, idCursoMatriculado, nota, estado };


        if (!calificacion.id || !calificacion.idCursoMatriculado || !calificacion.nota || !calificacion.estado) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se actualiza el registro en la base de datos
        const { data, error } = await supabase
            .from('CursosHistoricos').update([calificacion])
            .eq('id', calificacion.id) // Actualizar el registro basado en el id
            .select(); // Agregamos .select() para obtener los registros afectados

        if (error) {
            return res.status(400).json({ message: Mensajes(4) });
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

export const deleteCursoHistorico = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se elimina el registro de la base de datos
        const { error } = await supabase
            .from('CursosHistoricos')
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









