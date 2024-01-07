describe('Abonnement Farmer', () => {
    it('should display the abonnement page', () => {
        cy.visit('http://localhost:8100/login');
        cy.login('mexproai@gmail.com', '123123');
        cy.url().should('include', '/profile');
        cy.get('[tab="farmers"]', { timeout: 30000 }).click();
        cy.get('.farmer-card', { timeout: 30000 }).first().click();
        cy.get('.follow_button').contains('Suivre').click();
    });
});