// cypress/support/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    addIngredientToConstructor(
      dataCySelector: string,
      itemName: string
    ): Chainable<void>;
  }
}

declare namespace Cypress {
  interface Chainable {
    openIngredientModal(ingredientName: string): Chainable<void>;
    closeModalWithButton(): Chainable<void>;
    closeModalWithOverlay(): Chainable<void>;
  }
}

declare namespace Cypress {
  interface Chainable {
    addItemToOrder(ingredientType: string): Chainable<void>;
    placeOrder(): Chainable<void>;
    checkOrderDetails(expectedIngredients: string[]): Chainable<void>;
    closeOrderModal(): Chainable<void>;
    checkIngredientsNotExist(
      burgerConstructor: string,
      ingredients: string[]
    ): Chainable<void>;
  }
}
