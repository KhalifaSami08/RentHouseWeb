import {
    ADD_CONTRACT,
    DELETE_CONTRACT,
    GET_ALL_CONTRACTS,
    GET_CONTRACT_BY_ID,
    UPDATE_CONTRACT
} from "../action/ContractAction";

const initialState = {
    allContracts: [],
    currentContract: {}
};

export const ContractReducer = (state=initialState, action) => {
    switch(action.type){

        case GET_ALL_CONTRACTS:
            return {...state, allContracts: action.allContractsKEY}

        case GET_CONTRACT_BY_ID:
            return {...state,currentContract: action.currentContrKEY}

        case ADD_CONTRACT:
            return {...state, allContracts: [...state.allContracts,action.newContract]}

        case UPDATE_CONTRACT:

            const contrIndex = state.allContracts.findIndex(
                contr => contr.idContract === action.updatedContractKey.idContract
            );
            const updatedAllContracts = [...state.allContracts];
            updatedAllContracts[contrIndex] = action.updatedContractKey;

            return {...state, allContracts: updatedAllContracts}

        case DELETE_CONTRACT:
            return {...state, allContracts: state.allContracts.filter(contr => contr.idContract !== action.idContractRemoved)}

        default:
            return state;
    }
}