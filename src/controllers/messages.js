import { json } from "express";

export function Mensajes(type){

    switch(type) {
        case 1:
            return 'No se realizó la solicitud. Datos vacios';
          break;
        case 2:
            return 'No se encontraron datos en el sistema';
          break;
        case 3:
            return 'La operación concluyo exitosamente';
        break;
        case 4:
            return 'Error inesperado en el servidor. No se pudo procesar la operación';
        break;        
        case 5:
        return 'Error inesperado en el api. No se pudo ejecutar la funcion';
        break;
        case 6:
          return 'El numero de cédula ya se encuentra registrado en el sistema';
          break;
        default:
            return 'Bad request';
      }
}    

