import supabase from '../database/database.js';
import { Mensajes } from './messages.js'

export const getCursosMatriculados = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;
        // Se obtienen los registros desde la base de datos
        const { data: cursosMatriculados, error } = await supabase
            .from('CursosMatriculados')
            .select(`id, Cursos ( nombre ), Horarios (dia, horaInicio, horaFin, Profesores ( nombre )), ciclo, nota`).eq('idEstudiante', id);

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (cursosMatriculados && cursosMatriculados.length > 0) {
            const datosFormateados = cursosMatriculados.map(cm => {
                const tieneNotaEspecial = cm.nota && cm.nota.trim() !== "";

                return {
                    id: cm.id,
                    curso: cm.Cursos.nombre,
                    horario: tieneNotaEspecial
                        ? cm.nota
                        : `${cm.Horarios.dia} ${cm.Horarios.horaInicio}-${cm.Horarios.horaFin}`,
                    profesor: tieneNotaEspecial
                        ? ""
                        : cm.Horarios.Profesores.nombre,
                    ciclo: cm.ciclo,
                };
            });

            // Si hay registros, se retornan
            res.status(200).json(datosFormateados);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        console.log(error);

        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
};

export const getCursoMatriculado = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Se obtienen los registros desde la base de datos
        const { id } = req.params;
        const { data: cursoMatriculado, error } = await supabase.from('CursosMatriculados').select('*').eq('id', id);

        if (error) {
            // Si ocurre un error al llamar al servidor, devuelve el mensaje 4
            return res.status(500).json({ message: Mensajes(4) });
        }

        if (cursoMatriculado && cursoMatriculado.length > 0) {
            // Si hay registros, se retornan
            res.status(200).json(cursoMatriculado);
        } else {
            // Si no se encontraron registros, devuelve el mensaje 2
            res.status(404).json({ message: Mensajes(2) });
        }

    } catch (error) {
        // Si el método falla devuelve el mensaje 5
        res.status(500).json({ message: Mensajes(5) });
    }
}

export const insertCursoMatriculado = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        // Crea el curso matriculado
        const { idEstudiante, idCurso, idHorario, ciclo, nota } = req.body;
        const cursoMatriculado = { idEstudiante, idCurso, idHorario, ciclo, nota, estado: "", justificadas: 0, injustificadas: 0 };

        if (nota === "Retiro Justificado" || nota === "No Oferta") {
            cursoMatriculado.estado = "Reprobado";
        } else {
            cursoMatriculado.nota = null;
        }

        // Validación de campos requeridos
        if (!cursoMatriculado.idEstudiante || !cursoMatriculado.idCurso || !cursoMatriculado.idHorario || !cursoMatriculado.ciclo) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se registra el curso matriculado en la base de datos
        const { data, error } = await supabase.from('CursosMatriculados').insert([cursoMatriculado]);

        if (error) {
            console.log(error);

            res.status(400).json({ message: Mensajes(4) });
        } else {
            // Si el registro es exitoso, devuelve el mensaje 3
            res.status(201).json({ message: Mensajes(3) });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: Mensajes(5) });
    }
};


export const updateCursoMatriculado = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;
        const { idEstudiante, idCurso, idHorario, ciclo, nota, estado } = req.body;
        const cursoMatriculado = { id, idEstudiante, idCurso, idHorario, ciclo, nota, estado };

        if (!cursoMatriculado.id || !cursoMatriculado.idEstudiante || !cursoMatriculado.idCurso || !cursoMatriculado.idHorario || !cursoMatriculado.ciclo || !cursoMatriculado.nota || !cursoMatriculado.estado) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        // Se actualiza el registro en la base de datos
        const { data, error } = await supabase
            .from('CursosMatriculados').update([cursoMatriculado])
            .eq('id', cursoMatriculado.id)
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

export const agregarNota = async (req, res) => {
    try {
        // throw new Error("Simulación de fallo en el método");
        const { id } = req.params;
        const { nota } = req.body;
        let estado = "Reprobado";

        // Validación básica
        if (!id || !nota) {
            return res.status(400).json({ message: Mensajes(1) });
        }

        if (!isNaN(nota) && Number(nota) >= 70 && Number(nota) <= 100) {
            estado = "Aprobado";
        } else if (["Retiro Justificado", "No Oferta"].includes(nota.trim())) {
            estado = "Reprobado";
        }
        
        // Se actualiza solo la nota en la base de datos
        const { data, error } = await supabase.from('CursosMatriculados')
            .update({ nota, estado })
            .eq('id', id)
            .select(); // Agregamos .select() para obtener los registros afectados

        if (error) {
            console.log(error);
            
            return res.status(400).json({ message: Mensajes(4) });
        }

        if (data.length > 0) {
            return res.status(200).json({ message: Mensajes(3) });
        } else {
            return res.status(404).json({ message: 'No se encontró el registro a actualizar' });
        }

    } catch (error) {
        console.log(error);

        res.status(500).json({ message: Mensajes(5) });
    }
};

export const updateAusencias = async (req, res) => {
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









