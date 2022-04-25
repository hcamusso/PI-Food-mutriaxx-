export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPE_ID = 'GET_RECIPE_ID';
export const GET_RECIPE_NAME = 'GET_RECIPE_NAME';
export const GET_DIETS = 'GET_DIETS';
export const CLEAN_RECIPE = 'CLEAN_RECIPE';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const ORDER_FILTER = 'ORDER_FILTER';




// Fijarse que la sintaxis de nuestra Action creator es distinta a lo que venimos haciendo. Esto es
// debido al uso del middleware "thunk", el cual nos permite trabajar con acciones asincrónicas.
// Necesitamos hacer uso de este middleware ya que nuestras peticiones al back siempre son asincrónicas,
// por lo tanto, necesitamos ese "delay" para despachar nuestra action hasta que la data nos llegue.
// Vas a tener que usar la funcion "dispatch" recibida en la funcion interna para despachar la action que
// va a llegar a nuestro reducer.
// Acá pueden ver un poco mejor la explicación y algunos ejemplos: https://github.com/reduxjs/redux-thunk

// Usar ruta 'http://localhost:3000/recipes' para buscar todas las houses en nuestro back.
// Esto lo vas a poder hacer utilizando fetch.
export const getAllRecipes = () => async dispatch => {
    const response = await fetch (`http://localhost:3001/recipes`);
    const json = await response.json();
    return dispatch({type: 'GET_ALL_RECIPES', payload: json})
};

export const getRecipeName = (name) => async dispatch => {
    const response = await fetch (`http://localhost:3001/recipes?name=${name}`)
    const json = await response.json();
    return dispatch({type: 'GET_RECIPE_NAME', payload: json})
};

export const orderFilter = (data) => {
    return {
        type: 'ORDER_FILTER', payload: data
    }
};


// Usar ruta 'http://localhost:3000/houses/:id' para buscar una house por el id pasado
// como parámetro de la action creator.
// Donde :id, el id recibido como argumento de la action creator.
// Ojo, hacer un console.log de la respuesta desde el back. En nuestro reducer esperamos un objeto;
export const getRecipeId = (id) => async dispatch => {
    const response = await fetch (`http://localhost:3001/recipes/${id}`)
    const json = await response.json();
    return dispatch({type: 'GET_RECIPE_ID', payload: json})
};

export const getDiets = () => dispatch => {
    return fetch (`http://localhost:3001/types`)
    .then(response => response.json())
    .then(json => {
        dispatch({type: 'GET_DIETS', payload: json})
    })
    
};

export const cleanRecipe = () => {
    return {
        type: 'CLEAN_RECIPE',
        payload: []
    }
}

export const createRecipe = (data) => {
    return async function(dispatch){
        const response = await fetch(`http://localhost:3001/recipe`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        })
    

        const json = await response.json();
        // console.log(json)
        return dispatch({type: 'CREATE_RECIPE', payload: json})
    }
}

// // Inicializamos id en 3, para que nuestros próximos ID's no se pisen con los existentes.
// // La vas a usar en la funcion createHouse, descomentala cuando te haga falta;
// let id = 3;

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
