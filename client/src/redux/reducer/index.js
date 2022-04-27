// Importa las actions types que necesites acá:
import { GET_ALL_RECIPES, GET_RECIPE_ID, GET_DIETS, GET_RECIPE_NAME, CLEAN_RECIPE, ORDER_FILTER, CREATE_RECIPE } from "../actions";


const initialState = {
    recipes: [],
    backup: [],
    initial: [],
    recipe: {},
    diets: [],
    info: {},
    backend: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        // Acá va tu código:
        case GET_ALL_RECIPES:
        return {
            ...state,
            recipes: action.payload,
            backup: action.payload,
            initial: action.payload

        }
        
        
        case ORDER_FILTER:
        return {
            ...state,
            recipes: action.payload
        }
        
        case GET_RECIPE_ID:
        return {
            ...state,
            recipe: action.payload
        } 
            
        case GET_DIETS:
        return {
            ...state,
            diets: action.payload
        }

        case GET_RECIPE_NAME:
        return {
            ...state,
            recipes: action.payload
        } 
        case CLEAN_RECIPE:
        return {
            ...state,
            recipes: action.payload
        }  
        case CREATE_RECIPE:
            return{
                ...state,
                info: action.payload
            }
        default:
            return state
       
    };
};

export default rootReducer;
