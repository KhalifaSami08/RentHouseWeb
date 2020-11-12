import {
    addPropertyAPI,
    deletePropertyAPI,
    getAllPropertiesAPI,
    getPropertyByIdAPI,
    updatePropertyAPI
} from "../../api/ApiProperty";

export const GET_ALL_PROPERTIES='GET_ALL_PROPERTIES';
export const GET_PROPERTY_BY_ID='GET_PROPERTY_BY_ID';

export const ADD_PROPERTY='ADD_PROPERTY';
export const UPDATE_PROPERTY='UPDATE_PROPERTY';
export const DELETE_PROPERTY='DELETE_PROPERTY';

export const getAllPropertiesAction = () => {
    return async dispatch => {
        const allProperties = await getAllPropertiesAPI().then();
        dispatch({type: GET_ALL_PROPERTIES, listOfPropertiesKEY: allProperties})
    }
}
export const getPropertyByIDAction = idProperty => {
    return async dispatch => {
        const myProp = await getPropertyByIdAPI(idProperty).then();
        dispatch({type: GET_PROPERTY_BY_ID, myPropKEY: myProp})
    }
}
export const addPropertyAction = property => {
    return async dispatch => {
        await addPropertyAPI(property).then();
        dispatch({type: ADD_PROPERTY, newPropKEY: property})
    }
}

export const updatePropertyAction = property => {
    return async dispatch => {
        await updatePropertyAPI(property).then();
        dispatch({type: UPDATE_PROPERTY, updatedPropKey: property})
    }
}

export const deletePropertyAction = idproperty => {
    return async dispatch => {
        await deletePropertyAPI(idproperty).then();
        dispatch({type: DELETE_PROPERTY, deletedPropKey: idproperty})
    }
}