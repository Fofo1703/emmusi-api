import supabase from '../database/database.js';
import { Mensajes } from './messages.js'

export const getAusencias = async (req, res) => {
    try {
        const { id } = req.params;

        const { data: ausencias, error } = await supabase
            .from('CursosMatriculados')
            .select(`id, Cursos ( nombre ), ciclo, nota, justificadas, injustificadas`).eq('idEstudiante', id);

        if (error) {
            return res.status(400).json({ message: Mensajes(4) });
        }

        if (ausencias && ausencias.length > 0) {

            const datosFormateados = ausencias.map(cal => ({
                id: cal.id,
                curso: cal.Cursos.nombre,
                ciclo: cal.ciclo,
                nota: cal.nota,
                justificadas: cal.justificadas,
                injustificadas: cal.injustificadas
            }));
             res.status(200).json(datosFormateados);
        } else {
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        res.status(500).json({ message: Mensajes(5) });
    }
};


export const getAusencia = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { id } = req.params;
        const { data: ausencia, error } = await supabase.from('Ausencias').select('*').eq('id', id);

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (ausencia && ausencia.length > 0) {
            // Si hay registros, se retornan
            res.status(200).json(ausencia);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
}

export const insertAusencia = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Crea la ausencia
        const { idCursoMatriculado, justificadas, injustificadas } = req.body;
        const ausencia = { idCursoMatriculado, justificadas, injustificadas };

        // Validación de campos requeridos
        if (!ausencia.idCursoMatriculado || !ausencia.justificadas || !ausencia.injustificadas) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se registra el ausencia en la base de datos
        const { data, error } = await supabase.from('Ausencias').insert([ausencia]);

        if (error) {
            if (error.code === '23505') {
                // Si el numero de ceduala ya existe en la base de datos, devuelve el mensaje 6
                return res.status(400).json({ message: "Las ausencias ya se encuentran registradas" });
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


export const updateAusencia = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;
        const { idCursoMatriculado, justificadas, injustificadas } = req.body;
        const ausencia = { id, idCursoMatriculado, justificadas, injustificadas };

        if (!ausencia.id || !ausencia.idCursoMatriculado || !ausencia.justificadas || !ausencia.injustificadas) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se actualiza el registro en la base de datos
        const { data, error } = await supabase
            .from('Ausencias')
            .update({ idCursoMatriculado, justificadas, injustificadas })
            .eq('id', id)
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

export const deleteAusencia = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se elimina el registro de la base de datos
        const { error } = await supabase
            .from('Ausencias')
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









