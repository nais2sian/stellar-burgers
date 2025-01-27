describe('Burger Constructor', () => {
  beforeEach(() => {
    cy.visit('/');



    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.wait('@getIngredients');
  });

  it('добавляем ингредиент в конструктор по клику', () => {
    cy.get('[data-cy="ingredient-item"]').first().click();


    cy.get('[data-cy="constructor-item"]').should('have.length', 1);
  });
});
