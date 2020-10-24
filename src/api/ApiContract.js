import axios from "axios";

export const getAllContractsAPI = async () => {
    let listOfContracts;
    await axios.get("http://localhost:5000/api/contract")
        .then(res => listOfContracts = res.data)
        .catch(err => console.log(err))

    return listOfContracts;
}

export const getContractByIdAPI = async idContract => {
    let contract;
    await axios.get("http://localhost:5000/api/contract/"+idContract)
        .then(res => contract = res.data)
        .catch(err => console.log(err));
    return contract;
}

export const addContractAPI = async contract => {
    await axios.post("http://localhost:5000/api/contract/" , contract)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const updateContractAPI = async contract => {
    await axios.put("http://localhost:5000/api/contract/"+contract.idContract, contract)
        .then(res => console.log(res))
        .catch(err => console.log(err))
}

export const deleteContractAPI = async idContract => {
    axios.delete("http://localhost:5000/api/contract/"+idContract)
        .then(res => {
            console.log(res);
            // alert("Contrat supprimé ! ");
        })
        .catch(err => console.log(err));
}

