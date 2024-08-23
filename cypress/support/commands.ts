/// <reference types="cypress" />

Cypress.Commands.add(
  'addIngredientToConstructor',
  (dataCySelector, itemName) => {
    cy.get(`[data-cy=${dataCySelector}]`)
      .contains('Добавить')
      .click({ force: true });
    cy.get('[data-cy=constructor-ingredients]')
      .contains(itemName)
      .should('exist');
  }
);

Cypress.Commands.add('addItemToOrder', (ingredientType) => {
  cy.get(`[data-cy=${ingredientType}-ingredient]`)
    .contains('Добавить')
    .click({ force: true });
});

Cypress.Commands.add('placeOrder', () => {
  cy.get('[data-cy=order-button]').click({ force: true });
});

Cypress.Commands.add('checkOrderDetails', (expectedIngredients) => {
  cy.wait('@postOrder').its('request.body').should('deep.equal', {
    ingredients: expectedIngredients
  });

  cy.get('[data-cy=order-number]').contains('50421').should('exist');
});

Cypress.Commands.add('closeOrderModal', () => {
  cy.get('[data-cy=close-modal]').click();
  cy.get('[data-cy=order-number]').should('not.exist');
});

Cypress.Commands.add(
  'checkIngredientsNotExist',
  (burgerConstructor, ingredients) => {
    ingredients.forEach((ingredient) => {
      cy.get(burgerConstructor).contains(ingredient).should('not.exist');
    });
  }
);

Cypress.Commands.add('openIngredientModal', (ingredientName) => {
  cy.contains(ingredientName).click({ force: true });
  cy.contains('Детали ингредиента').should('exist');
  cy.get('[data-cy=modal]').contains(ingredientName).should('exist');
});

Cypress.Commands.add('closeModalWithButton', () => {
  cy.get('[data-cy=close-modal]').should('exist').click();
  cy.contains('Детали ингредиента').should('not.exist');
});

Cypress.Commands.add('closeModalWithOverlay', () => {
  cy.get('[data-cy=overlay]').click('right', { force: true });
  cy.contains('Детали ингредиента').should('not.exist');
});
