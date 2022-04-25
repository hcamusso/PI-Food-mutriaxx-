const { Router } = require('express');
const {Recipe, Diet} = require('../db');
const router = Router();


//---------------------------------------------------------------------
// Obtener todos los tipos de dieta posibles
// En una primera instancia, cuando no exista ninguno, deberán precargar la base de datos con los tipos 
// de datos indicados por spoonacular acá.

router.get("/types", async(req, res) => { 

    
    let diets = await  Diet.findAll();

    //¿Hay tipos de dieta?
    if(!diets.length) {
        const diets2 = [
            {name: 'gluten free'},
            {name: 'ketogenic'},
            {name: 'vegetarian'},
            {name: 'lacto-vegetarian'},
            {name: 'ovo-vegetarian'},
            {name: 'vegan'},
            {name: 'pescetarian'},
            {name: 'paleo'},
            {name: 'primal'},
            {name: 'low FODMAP'},
            {name: 'whole 30'},

        ];
        Diet.bulkCreate(diets2);
        diets = await Diet.findAll()
    }

    res.json(diets)
});

module.exports = router;