describe('Nova transação', () => {
  beforeEach(() => {
    cy.loginByDbUser();
  });

  it("TR-001 Realizar um pagamento", () => {
    cy.visit('/transaction/new');

    cy.get('[data-test="users-list"]')
      .find('[data-test^="user-list-item-"]')
      .then(($users) => {
        const users = $users.toArray();
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        cy.wrap(randomUser)
          .find('.MuiTypography-root')
          .invoke('text')
          .then((userName) => {
            Cypress.env('selectedUserName', userName.trim());

            // Clica no usuário
            cy.wrap(randomUser).click();
          });
      });

    cy.get('#amount').type('150');
    cy.get('#transaction-create-description-input').type('Pagamento');
    cy.get('[data-test="transaction-create-submit-payment"]').click();

    cy.get(':nth-child(2) > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
      .should('contain', 'Paid $150.00 for Pagamento');
  });

  it("TR-002 Solicitar pagamento", () => {
    cy.visit('/transaction/new');

    cy.get('[data-test="users-list"]')
      .find('[data-test^="user-list-item-"]')
      .then(($users) => {
        const users = $users.toArray();
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        cy.wrap(randomUser)
          .find('.MuiTypography-root')
          .invoke('text')
          .then((userName) => {
            Cypress.env('selectedUserName', userName.trim());

            // Clica no usuário
            cy.wrap(randomUser).click();
          });
      });

    cy.get('#amount').type('240');
    cy.get('#transaction-create-description-input').type('Cobrança');
    cy.get('[data-test="transaction-create-submit-request"]').click();

    cy.get(':nth-child(2) > .MuiGrid-container > .MuiGrid-root > .MuiTypography-root')
      .should('contain', 'Requested $240.00 for Cobrança');
  });

});
