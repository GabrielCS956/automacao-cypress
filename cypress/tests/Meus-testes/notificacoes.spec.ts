import { should } from "chai";

describe('Notificações', () => {
    beforeEach(() => {
        cy.loginByDbUser();
    });

    it("NT-001 Validar notificação de pagamento solicitado", () => {
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
        cy.get('#transaction-create-description-input').type('Cobrança');
        cy.get('[data-test="transaction-create-submit-request"]').click();

        cy.get('[data-test="sidenav-home"]').click();

    });

    it("NT-002 Validar notificação de pagamento enviado", () => {
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

        cy.get('[data-test="sidenav-home"]').click();
        //O site não atualiza no feed as transações recentes
    });

    it("NT-003 Validar notificação de curtida em transação", () => {
        cy.visit('/personal');


        cy.get('[data-test="transaction-list"]')
            .find('[data-test="transaction-item-BWoLdIdmGQJn"] > .MuiPaper-root > .css-mhc70k-MuiGrid-root > .MuiGrid-grid-xs-12 > .MuiGrid-spacing-xs-2 > .MuiGrid-grid-xs-true')
            .then(($transaction) => {
                const transactions = $transaction.toArray();
                const randomIndex = Math.floor(Math.random() * transactions.length);
                const randomTransaction = transactions[randomIndex];

                cy.wrap(randomTransaction)
                    .find('.MuiTypography-root')
                    .invoke('text')
                    .then((transaction) => {
                        Cypress.env('selectedTransaction', transaction.trim());

                        // Clica no usuário
                        cy.wrap(randomTransaction).click();
                    });
            });

        cy.get(':nth-child(3) > :nth-child(1) > .MuiGrid-container > :nth-child(2)').click();
        cy.get('[data-test="sidenav-notifications"]').click();
        cy.get('[data-test="notifications-list"]')
            .find('[data-test^="notification-list-item-"]')
            .first()
            .should('contain', 'liked a transaction');

    });

    it("NT-004 Validar notificação de comentário em uma transação", () => {
        cy.visit('/personal');


        cy.get('[data-test="transaction-list"]')
            .find('[data-test="transaction-item-BWoLdIdmGQJn"] > .MuiPaper-root > .css-mhc70k-MuiGrid-root > .MuiGrid-grid-xs-12 > .MuiGrid-spacing-xs-2 > .MuiGrid-grid-xs-true')
            .then(($transaction) => {
                const transactions = $transaction.toArray();
                const randomIndex = Math.floor(Math.random() * transactions.length);
                const randomTransaction = transactions[randomIndex];

                cy.wrap(randomTransaction)
                    .find('.MuiTypography-root')
                    .invoke('text')
                    .then((transaction) => {
                        Cypress.env('selectedTransaction', transaction.trim());

                        // Clica no usuário
                        cy.wrap(randomTransaction).click();
                    });
            });

        cy.get('[data-test="transaction-comment-input-BWoLdIdmGQJn"]').type('Fine!{enter}');

        cy.get('.TransactionDetail-paper > .MuiPaper-root')
            .should('be.visible')
            .and('contain', 'Comments')
            .and('contain', 'Fine!')

        cy.get('[data-test="sidenav-notifications"]').click();
        cy.get('[data-test="notifications-list"]')
            .find('[data-test^="notification-list-item-"]')
            .first()
            .should('contain', 'commented on a transaction.');

    });

   it("NT-005 Validar notificação descartada", () => {
  cy.visit('/notifications');

  cy.get('[data-test="notifications-list"]')
    .find('[data-test^="notification-list-item-"]')
    .then(($notificationItems) => {
      const items = $notificationItems.toArray();
      const randomIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomIndex];

      cy.wrap(randomItem).as('randomNotification');
      
      // Encontra o botão de descarte usando o seletor 'starts with'
      cy.wrap(randomItem)
        .find('[data-test^="notification-mark-read-"]')
        // Clica no botão encontrado.
        .click();
    });

  // Após o clique, valide a remoção do elemento.
  // Este comando deve estar fora do bloco .then().
  cy.get('@randomNotification').should('not.exist');
});
});