import {Router} from 'express';
import Estudiante from './routes/estudiante.routes'
import Profesor from './routes/profesor.routes'
import Curso from './routes/curso.routes'
import Ausencia from './routes/ausencia.routes'
import CursosHistoricos from './routes/cursosHistoricos.routes'
import CursosMatriculados from './routes/cursosMatriculados.routes'
import Horario from './routes/horarios.routes'
import Usuario from './routes/usuario.routes'

const router = Router();

router.use('/estudiantes', Estudiante.routes);
router.use('/profesores', Profesor.routes);
router.use('/cursos', Curso.routes);
router.use('/ausencias', Ausencia.routes);
router.use('/cursos-historicos', CursosHistoricos.routes);
router.use('/cursos-matriculados', CursosMatriculados.routes);
router.use('/horarios', Horario.routes);
router.use('/usuarios', Usuario.routes);


export default router;