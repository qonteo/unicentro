/**
 * @module Helpers
 */

const baseUrl=process.env.REACT_APP_API_URL;

/**
 * Fecth sin token
 * @param {String} endpoint endpoint a consultar
 * @param {Object} data Data a recibir
 * @param {String} method metodo del fecth
 * @returns {Object} Data
 */
const fetchSinToken=(endpoint,data,method='GET')=>{
    const token = localStorage.getItem('token-qonteo') || '';
    const url=`${baseUrl}/${endpoint}`;
    if(method==='GET'){
        return fetch(url,{
            headers:{
                Authorization:token
            }
        })
    }else{
        return fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
    }
}

/**
 * Fecth con token
 * @param {String} endpoint endpoint a consultar
 * @param {Object} data Data a recibir
 * @param {String} method metodo del fecth
 * @returns {Object} Data 
 */
const fetchConToken=(endpoint,data,method='GET')=>{
    
    const url=`${baseUrl}${endpoint}`;
    const token=localStorage.getItem('token-qonteo') || '';
    if(method==='GET'){
        return fetch(url,{
            method,
            headers:{
                'Authorization':token
            }
        })
    }else if(method==='POST'){
        return fetch(url,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':token
            },
            body: JSON.stringify(data)
        })
    }else{
        return fetch(url,{
            method:'POST',
            headers:{
                'Authorization':token
            },
            body:data 
        })
    }
}





export {
    fetchSinToken,
    fetchConToken
}