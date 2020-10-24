import {addClientApi, deleteClientAPI, getAllClientsAPI, getClientByIdAPI, updateClientAPI} from "../../api/ApiClient";

export const GET_ALL_CLIENTS='GET_ALL_CLIENTS';
export const GET_CLIENT_BY_ID='GET_CLIENT_BY_ID';

export const ADD_CLIENT='ADD_CLIENT';
export const UPDATE_CLIENT='UPDATE_CLIENT';
export const DELETE_CLIENT='DELETE_CLIENT';

export const getAllClientsAction = () => {
    return async dispatch => {
        const allClients = await getAllClientsAPI().then();
        dispatch({type: GET_ALL_CLIENTS, listOfClientsKEY: allClients})
    }
}
export const getClientByIDAction = idClient => {
    return async dispatch => {
        const myCli = await getClientByIdAPI(idClient).then();
        dispatch({type: GET_CLIENT_BY_ID, myCliKEY: myCli})
    }
}
export const addClientAction = client => {
    return async dispatch => {
        await addClientApi(client).then();
        dispatch({type: ADD_CLIENT, newCliKEY: client})
    }
}

export const updateClientAction = client => {
    return async dispatch => {
        await updateClientAPI(client).then();
        dispatch({type: UPDATE_CLIENT, updatedCliKey: client})
    }
}
export const deleteClientAction = idClient => {
    return async dispatch => {
        await deleteClientAPI(idClient).then();
        dispatch({type: DELETE_CLIENT, idClientRemoved: idClient})
    }
}