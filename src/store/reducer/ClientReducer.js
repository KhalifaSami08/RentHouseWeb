import {ADD_CLIENT, DELETE_CLIENT, GET_ALL_CLIENTS, GET_CLIENT_BY_ID, UPDATE_CLIENT} from "../action/ClientAction";

const initialState = {
    allClient : [],
    currentClient: {}
};

export const ClientReducer = (state=initialState, action) => {

    switch (action.type) {
        case GET_ALL_CLIENTS:
            return {...state, allClient: action.listOfClientsKEY}

        case GET_CLIENT_BY_ID:
            return {...state, currentClient: action.myCliKEY}

        case ADD_CLIENT:
            return {...state, allClient: [...state.allClient, action.newCliKEY]};

        case UPDATE_CLIENT:
            const cliIndex = state.allClient.findIndex(
                cli => cli.idClient === action.updatedCliKey.idClient
            );
            const updatedAllClient = [...state.allClient];
            updatedAllClient[cliIndex] = action.updatedCliKey;

            return {...state, allClient: updatedAllClient};
        
        case DELETE_CLIENT:
            return {...state, allClient: state.allClient.filter(cli => cli.idClient !== action.idClientRemoved)};

        default:
            // console.log("RETURN DEFAULT CLIENT")
            return state;

    }

}