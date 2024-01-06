describe('Login test with email and pass', () => {
    it('should allow you to log in', () => {
        cy.visit('http://localhost:8100/home');
        cy.get('[tab="profile"]').click();
        cy.url().should('include', '/profile');
        cy.get('#toLogin').click();
        cy.url().should('include', '/login');
        cy.login('mexproai@gmail.com','123123');
        cy.url().should('include', '/profile');
    });

    after(() => {
        // Código para limpiar después de la prueba, si es necesario.
    });
});
