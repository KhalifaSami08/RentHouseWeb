import {
    ADD_PROPERTY,
    DELETE_PROPERTY,
    GET_ALL_PROPERTIES,
    GET_PROPERTY_BY_ID,
    UPDATE_PROPERTY
} from "../action/PropertyAction";

const initialState={
    allProperties:[],
    currentProp:{}
}

export const PropertyReducer = (state=initialState, action) => {

    switch (action.type) {
        case GET_ALL_PROPERTIES:
            return {...state,allProperties:action.listOfPropertiesKEY}

        case GET_PROPERTY_BY_ID:
            return {...state, currentProp : action.myPropKEY}

        case ADD_PROPERTY:
            return {...state, allProperties : [...state.allProperties, action.newPropKEY]};

        case UPDATE_PROPERTY:
            const propIndex = state.allProperties.findIndex(
                property => property.idProperty === action.updatedPropKey.idProperty
            );
            const updatedAllProperties = [...state.allProperties];
            updatedAllProperties[propIndex] = action.updatedPropKey;

            return {...state, allProperties: updatedAllProperties};
        case DELETE_PROPERTY:
            return {...state, allProperties: state.allProperties.filter(prop => prop.idProperty !== action.deletedPropKey)}
        default:
            // console.log("RETURN DEFAULT PROPERTY")
            return state;

    }
}