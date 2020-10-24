import axios from 'axios';

export const getAllPropertiesAPI = async () => {
    let listOfProperties;
    await axios.get("http://localhost:5000/api/property")
        .then(res => listOfProperties = res.data)
        .catch(err => console.log(err));
    return listOfProperties;
}

export const getPropertyByIdAPI = async idProperty => {
 let property;
    await axios.get("http://localhost:5000/api/property/"+idProperty)
        .then(res => property = res.data)
        .catch(err => console.log(err));
    return property;
}

export const addPropertyAPI = async property => {
    await axios.post("http://localhost:5000/api/property/" , property)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const updatePropertyAPI = async property => {

    await axios.put("http://localhost:5000/api/property/"+property.idProperty , property)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

//Je ne récupére pas le Delete car celà peut poser un probleme au niveau des clés étrangéres(Table contrat)
