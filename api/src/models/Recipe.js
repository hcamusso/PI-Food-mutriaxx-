const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  // [ ] Un formulario controlado con JavaScript con los siguientes campos:
  // Nombre
  // Resumen del plato
  // Puntuación
  // Nivel de "comida saludable"
  // Paso a paso
  // [ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
  sequelize.define('recipe', {  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      // autoIncrement: true
    },
    image:{
      type: DataTypes.TEXT,
      defaultValue: 'https://spoonacular.com/recipeImages/7sdfs16426-312x231.jpg'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        is: /^[a-z ]+$/i
      }
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        min: 1,
        max: 100
      }
    },
    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        min: 1,
        max: 100
      }
    },
    steps: {
      type: DataTypes.TEXT
    }
    
    
  }, {timestamps: false});
};
