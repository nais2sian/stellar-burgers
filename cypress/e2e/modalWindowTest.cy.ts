const bunName = 'Краторная булка N-200i';
export default bunName;

describe('Открытие и закрытие модального окна с описанием ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients'); 
  });

  it('Открытие модального окна с отображением элемента, по которому произошел клик', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.openIngredientModal(bunName);
  });

  it('Закрытие модального окна по клику на крестик', () => {
    cy.openIngredientModal(bunName);
    cy.closeModalWithButton();
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.openIngredientModal(bunName);
    cy.closeModalWithOverlay();
  });
});
