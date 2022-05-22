/**
 * @module Helpers
 */

/**
 * funcion para obtener el formato de los números
 * @param {Number} num 
 * @returns numero formateado
 */

const formatNumber=(num)=> {
    if(num===null){
        return 0
    }
    return num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}



const porcentajepersona=(total=100, num=20)=> {
    const resultado=Math.round((num * 100) / total);
    if(isNaN(resultado) || resultado===Number.POSITIVE_INFINITY) return 0;
    return resultado;
}



export {
    formatNumber,
    porcentajepersona,
}