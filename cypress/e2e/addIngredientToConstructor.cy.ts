describe('Апи и добавление ингредиентов в конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients'); 
  });

  it('добавляем булки в конструктор по клику', () => {
    cy.get('[data-cy=bun-ingredient]')
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=bun-top]')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('[data-cy=bun-bottom]')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('добавляем начинку в конструктор по клику', () => {
    cy.get('[data-cy=main-ingredient]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredient]').contains('Добавить').click({ force: true });    
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('[data-cy=constructor-ingredients]')
      .contains('Соус с шипами Антарианского плоскоходца')
      .should('exist');
  });
});



