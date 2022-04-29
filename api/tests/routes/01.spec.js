// /* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Recipe, conn } = require('../../src/db.js');

// const agent = session(app);
// const recipe = {
//   title: 'French fries',
//   summary: 'Descripción de French fries',
//   score: 50,
//   healthScore: 10,
//   steps: 'Instrucciones de French fries',
//   image: 'https://images-gmi-pmc.edge-generalmills.com/476c10e1-c851-4539-8e3b-4b49323927c5.jpg'
// };

// describe('Recipe routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Recipe.sync({ force: true })
//     .then(() => Recipe.create(recipe)));
//   describe('GET /recipes', () => {
//     it('should get 200', () =>
//       agent.get('/recipes').expect(200)
//     );  
//   });
//   describe("GET /recipes/:id", () => {
//     it("Se espera un status 200 si se pasa un id", () =>
//       agent.get("/recipes/716426").expect(200));
//   });
//   describe("GET /recipes?name=xxx", () => {
//     it("Si se le pasa name deberia devolver un status 200", () =>
//       agent.get("/recipes?name=garlic"));
//   });
// });
