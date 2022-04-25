const { Router } = require('express');
const router = Router();
const {
    recipeList,
    recipeDetail,
    createRecipe
} = require('../controllers/controller')

router.get("/recipes", recipeList);
router.get("/recipes/:recipeID", recipeDetail);
router.post("/recipe", createRecipe);


module.exports = router;
