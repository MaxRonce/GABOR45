describe('Abonnement Farmer', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/login');
        cy.login('mexproai@gmail.com', '123123');
        cy.url().should('include', '/profile');
    });
    it('should follow a farmer', () => {
        cy.get('[tab="farmers"]', { timeout: 30000 }).click();
        cy.get('.farmer-card', { timeout: 30000 }).first().click();
        cy.get('.follow_button').contains('Suivre').click();
    });

    it('should unfollow a farmer', () => {
        cy.get('[tab="farmers"]', { timeout: 30000 }).click();
        cy.get('.farmer-card', { timeout: 30000 }).first().click();
        cy.get('.follow_button').contains('Suivi').click();
    });

    it("should show farmer's news", () => {
        cy.get('[tab="farmers"]', { timeout: 30000 }).click();
        cy.get('.farmer-card', { timeout: 30000 }).first().click();
        cy.get('.follow_button').contains('Suivre').click();
        cy.contains("button", "News").click();
    });
});