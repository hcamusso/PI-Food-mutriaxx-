export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPE_ID = 'GET_RECIPE_ID';
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME';
export const GET_DIETS = 'GET_DIETS';
export const CLEAN_RECIPE = 'CLEAN_RECIPE';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const ORDER_FILTER = 'ORDER_FILTER';
export const NO_HAY_BACKEND = 'NO_HAY_BACKEND'



export const getAllRecipes = () => dispatch => {
    return fetch(`http://localhost:3001/recipes`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: 'GET_ALL_RECIPES', payload: json})
        })
};

export const getRecipeName = (name) => dispatch => {
    return fetch (`http://localhost:3001/recipes?name=${name}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: 'GET_RECIPE_NAME', payload: json})
        }) 
};

export const orderFilter = (data) => {
    return {
        type: 'ORDER_FILTER', payload: data
    }
};

export const getRecipeId = (id) => dispatch => {
    return fetch (`http://localhost:3001/recipes/${id}`)
        .then(response => response.json())
        .then(json => {
            dispatch({type: 'GET_RECIPE_ID', payload: json})
        })
};

export const getDiets = () => dispatch => {
    return fetch (`http://localhost:3001/types`)
    .then(response => response.json())
    .then(json => {
        dispatch({type: 'GET_DIETS', payload: json})
    })
    .catch(e=>{
        dispatch({type: 'NO_HAY_BACKEND', payload: {fail: 'No hay backend jejeje'}})
    })
};

export const cleanRecipe = () => {
    return {
        type: 'CLEAN_RECIPE',
        payload: []
    }
}


export const createRecipe = (data) => dispatch => {
    return fetch(`http://localhost:3001/recipe`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    .then(response => response.json())
    .then(json => {
        dispatch({type: 'CREATE_RECIPE', payload: json})
    })
    
}


// // Desde el componente ejecutamos la action creator, pasandole como argumento los values que vamos a utilizar para crear la house.
// export const createHouse = (values) => {
//     const id2 = id + 1;
//     values.id = id2;
//     const action = {type: 'CREATE_HOUSE', payload: values}
//     id = id2;
//     return action
// };

// // Desde el componente ejecutamos la action creator, pasandole como argumento el id de la house que queremos eliminar.
// export const deleteHouse = (id) => {
//     return {
//         type: 'DELETE_HOUSE', payload: id
//     }
// }
