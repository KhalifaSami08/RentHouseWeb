import axios from 'axios';


// Clients
export const getAllClientsAPI = async () => {
    let listofClient;
    await axios.get("http://localhost:5000/api/client")
        .then(res => listofClient = res.data )
        .catch(err => console.log(err));
    return listofClient;
}

export const getClientByIdAPI = async idClient => {
    let client;
    await axios.get("http://localhost:5000/api/client/"+idClient)
        .then(res => {
            client = res.data;
        })
        .catch(err => console.log(err));
    return client;
}

export const addClientApi = async client => {
    await axios.post("http://localhost:5000/api/client/" , client)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const updateClientAPI = async client => {
    await axios.put("http://localhost:5000/api/client/"+client.idClient , client)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const deleteClientAPI = async idClient => {
    await axios.delete("http://localhost:5000/api/client/"+idClient)
        .then(res => console.log(res) )
        .catch(err => console.log(err));
}
