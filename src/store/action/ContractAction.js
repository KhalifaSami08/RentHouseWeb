import {
    addContractAPI,
    deleteContractAPI,
    getAllContractsAPI,
    getContractByIdAPI,
    updateContractAPI
} from "../../api/ApiContract";

export const GET_ALL_CONTRACTS='GET_ALL_CONTRACTS';
export const GET_CONTRACT_BY_ID='GET_CONTRACT_BY_ID';
export const ADD_CONTRACT='ADD_CONTRACT';
export const UPDATE_CONTRACT='UPDATE_CONTRACT';
export const DELETE_CONTRACT='DELETE_CONTRACT';

export const getAllContractsAction = () => {
    return async dispatch => {
        const allContracts = await getAllContractsAPI().then();
        dispatch({type: GET_ALL_CONTRACTS, allContractsKEY: allContracts});
    }
}

export const getContractByIdAction = idContract => {
    return async dispatch => {
        const contract = await getContractByIdAPI(idContract).then();
        dispatch({type: GET_CONTRACT_BY_ID, currentContrKEY: contract})
    }
}

export const addContractAction = contract => {
    return async dispatch => {
        await addContractAPI(contract).then();
        dispatch({type: ADD_CONTRACT, newContract: contract})
    }
}

export const updateContractAction = contract => {
    return async dispatch => {
        await updateContractAPI(contract).then();
        dispatch({type: UPDATE_CONTRACT, updatedContractKey: contract})
    }
}
export const deleteContractAction = idContract => {
    return async dispatch => {
        await deleteContractAPI(idContract).then();
        dispatch({type: DELETE_CONTRACT, idContractRemoved: idContract})
    }
}
