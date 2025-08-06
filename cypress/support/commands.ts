import { User } from '../../src/models';

const baseUrl = 'http://localhost:3000';

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<Element>;
      loginByDbUser(username?: string): Chainable<Element>;
    }
  }
}

// Este é o comando de login base que usa cy.session para evitar repetição
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.session([username, password], () => {
    cy.visit(`${baseUrl}/signin`);
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('not.include', '/signin');
  });
});

// Este é o comando que busca o usuário no banco de dados e faz o login
Cypress.Commands.add('loginByDbUser', (username?: string) => {
  cy.task("db:seed").then(() => {
    // AQUI ESTÁ A CORREÇÃO:
    // Chamando a tarefa correta 'find:database' que está registrada no seu cypress.config.ts
    // 'db:find' e 'find:users' causavam erro por não existirem
    cy.task<User | null>('find:database', { entity: 'users', where: username ? { username } : {} })
      .then((user) => {
        if (!user) {
          throw new Error(`Usuário com o username "${username}" não encontrado.`);
        }
        cy.login(user.username, 's3cret');
      });
  });
});