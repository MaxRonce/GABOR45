describe('Login test with email and pass', () => {
    it('Describe el escenario de prueba', () => {
        cy.visit('http://localhost:8100/home');
        cy.get('[tab="profile"]').click();
        cy.url().should('include', '/profile');
        cy.get('#toLogin').click();
        cy.url().should('include', '/login');
        cy.get('.input-email').type('mexproai@gmail.com');
        cy.get('.input-pass').type('123123');
        cy.get('.btn-connect').click();
        cy.url().should('include', '/profile');
    });

    after(() => {
        // Código para limpiar después de la prueba, si es necesario.
    });
});
