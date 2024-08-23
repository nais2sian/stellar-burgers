const mainIngredientName = 'Биокотлета из марсианской Магнолии';
const sauceName = 'Соус с шипами Антарианского плоскоходца';

describe('Апи и добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляем булки в конструктор по клику', () => {
    cy.addItemToOrder('bun');
    cy.get('[data-cy=bun-top]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=bun-bottom]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('добавляем начинку в конструктор по клику', () => {
    cy.addIngredientToConstructor('main-ingredient', mainIngredientName);
    cy.addIngredientToConstructor('sauce-ingredient', sauceName);
  });
});
