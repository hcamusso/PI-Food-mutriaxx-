/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  summary: 'Descripción de Milanea a la napolitana',
  score: 50,
  healthScore: 10,
  steps: 'Instrucciones de Milanea a la napolitana'
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );  
  });
  describe("GET /recipes/:id", () => {
    it("Se espera un status 200 si se pasa un id", () =>
      agent.get("/recipes/716426").expect(200));
  });
  describe("GET /recipes?name=xxx", () => {
    it("Si se le pasa name deberia devolver un status 200", () =>
      agent.get("/recipes?name=garlic"));
  });
});

// describe("Obtiene una receta por id o name", () => {
  // describe("GET /recipes/:id", () => {
  //   it("Se espera un status 200 si se pasa un id", () =>
  //     agent.get("/recipes/716426").expect(200));
  // });
  // describe("GET /recipes?name=xxx", () => {
  //   it("Si se le pasa name deberia devolver un status 200", () =>
  //     agent.get("/recipes?name=garlic"));
  // });
// });
