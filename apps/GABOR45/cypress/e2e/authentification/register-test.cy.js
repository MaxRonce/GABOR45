describe('user registration test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/home');
        cy.get('[tab="profile"]').click();
        cy.url().should('include', '/profile');
        cy.get('#toLogin').click();
        cy.url().should('include', '/login');
    });

     it('should allow the user to create an account', () => {
        cy.contains("h3", "S'inscrire").click();
        cy.get('.input-email').type('aenrique1123@gmail.com');
        cy.get('.input-pass').type('123123');
        cy.get('.btn-register').click();
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'success. Verifiez votre email');
        cy.url().should('include', '/profile');
    });

    it('should display error message when the user does not enter email', () => {
        cy.contains("h3", "S'inscrire").click();
        cy.get('.input-pass').type('123123');
        cy.get('.btn-register').click();
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'Email invalide');
    });

    it('should display error message when the user does not enter password', () => {
        cy.contains("h3", "S'inscrire").click();
        cy.get('.input-email').type('aenrique1123@gmail.com');
        cy.get('.btn-register').click();
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'mdp doit contenir au moins 6 caracteres');
    });

    it('should display an error message when the user tries to use an email that exists.', () => {
        cy.contains("h3", "S'inscrire").click();
        cy.get('.input-email').type('aenrique1123@gmail.com');
        cy.get('.input-pass').type('123123');
        cy.get('.btn-register').click();
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'Error to signUp');
    });

    
});
