require('dotenv').config();
const fetch = require("node-fetch");
const {Recipe, Diet} = require('../db');
const {API_KEY} = process.env;



//-----------------------------------------------------------------------------------------
//Obtener un listado de las recetas que contengan la palabra ingresada como query parameter
//Si no existe ninguna receta mostrar un mensaje adecuado
const recipeList = async(req, res) => {
    const {name} = req.query;

    const url = `https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&apiKey=${API_KEY}`;
    const options = {"method": "GET"};
    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(e => console.log(e))
    ;
    
    try {
        const recipe = response.results[0] && response.results.map(r => {
            if(r.vegetarian && !r.diets.includes('vegetarian')) r.diets.push('vegetarian')
            if(r.vegan && !r.diets.includes('vegan')) r.diets.push('vegan')
            if(r.glutenFree && !r.diets.includes('gluten free')) r.diets.push('gluten free')
            if(r.dairyFree && !r.diets.includes('dairy free')) r.diets.push('dairy free')
    
            return  {
                id: r.id,
                image: r.image,
                title: r.title,
                diets: r.diets,
                score: r.spoonacularScore
            }
        })
    
        const db = await Recipe.findAll({
            attributes: ['id', 'image', 'title', 'score'],
            include: {
                model: Diet,
                attributes: ['name'],
                through: {attributes: []}
            }
    
        })

        db && db.map((r, i)=> recipe.push({
            id: db[i].dataValues.id,
            image: db[i].dataValues.image,
            title: db[i].dataValues.title,
            diets: db[i].dataValues.diets.map(d=> d.name),
            score: db[i].dataValues.score
        }))
    
        if(name){
            let find = recipe && recipe.filter(r=> r.title.toLowerCase().includes(name.toLowerCase()));
            if(find.length === 0) return res.status(404).json({error: 'No se encontró la receta.'});
            else res.json(find)
        }
    
        else res.json(recipe)
        
    } catch (error) {
        console.log(error)
    }
    
    // console.log(db)

    

};

//-----------------------------------------------------------------------------------------
// Obtener el detalle de una receta en particular
// Debe traer solo los datos pedidos en la ruta de detalle de receta
// Incluir los tipos de dieta asociados
// imagen, nombre, tipo de plato, tipo de dieta, Resumen del plato, Puntuación, Nivel de "comida saludable", Paso a paso.
const recipeDetail = async(req, res) => {
    const {recipeID} = req.params;

    const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${API_KEY}`;
        const options = {"method": "GET"};
        const r = await fetch(url, options)
            .then(res => res.json())
            .catch(e => console.log('El detalle NO está en la API --> Busca en la DB')) 
        ;

    
    if(r) {
        if(r.vegetarian && !r.diets.includes('vegetarian')) r.diets.push('vegetarian')
        if(r.vegan && !r.diets.includes('vegan')) r.diets.push('vegan')
        if(r.glutenFree && !r.diets.includes('gluten free')) r.diets.push('gluten free')
        if(r.dairyFree && !r.diets.includes('dairy free')) r.diets.push('dairy free')

        res.status(200).json({
            id: r.id,
            image: r.image,
            title: r.title,
            summary: r.summary,
            dishTypes: r.dishTypes,
            diets: r.diets,
            score: r.spoonacularScore, 
            healthScore: r.healthScore,
            steps: r.analyzedInstructions[0] && r.analyzedInstructions[0].steps.map((s,i) => (
                "<b>Step " + (i+1)+":</b> "  + s.step)).join('<br>')
        })
        
    }

    else{
        try {
            const db = await Recipe.findAll({
                where: {
                    id: recipeID
                },
                include: {
                    model: Diet,
                    attributes: ['name'],
                    through: {attributes: []}
                }
            })
            // console.log(db[0])
            res.status(200).json({
                id: db[0].dataValues.id,
                image: db[0].dataValues.image,
                title: db[0].dataValues.title,
                summary: db[0].dataValues.summary,
                score: db[0].dataValues.score,
                healthScore: db[0].dataValues.healthScore,
                steps: db[0].dataValues.steps,
                diets: db[0].dataValues.diets.map(d=> d.name)
            })
        } catch (error) {
            res.status(404).json({error: 'Receta no encontrada.'})
        }
        
    }

};

//-----------------------------------------------------------------------------------------
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de recetas por body
// Crea una receta en la base de datos
const createRecipe = async(req, res) => {
    let {title, image, summary, score, healthScore, diets, steps} = req.body;
    if(title && summary && diets){
        // title = title.toLowerCase()
        title = title[0].toUpperCase() + title.slice(1);
        let receta = await Recipe.create({
            title,
            image,
            summary,
            score,
            healthScore,
            steps
        });

        await receta.addDiets(diets);
        res.json({successful: 'created'})
    }
    else{
        res.status(400).json({error: 'faltan datos'})
    }
}; 

module.exports = {
    recipeList,
    recipeDetail,
    createRecipe
}