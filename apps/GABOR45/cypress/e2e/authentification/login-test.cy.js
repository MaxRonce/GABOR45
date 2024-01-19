describe('Test for Login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/home');
        cy.get('[tab="profile"]').click();
        cy.url().should('include', '/profile');
        cy.get('#toLogin').click();
        cy.url().should('include', '/login');
    });
    
    it('should allow the user to initiate password recovery', () => {
        cy.get('#motOublie').click();
        cy.get('ion-alert').should('be.visible').then(($alert) => {
            cy.wrap($alert).find('.alert-input-wrapper').type('mexproai@gmail.com');
            cy.wrap($alert).contains('Envoyer').click();
        });
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'Success');
    });

    it('should display error message when the user does not enter anything', () => {
        cy.get('#motOublie').click();
        cy.get('ion-alert').should('be.visible').then(($alert) => {
            cy.wrap($alert).contains('Envoyer').click();
        });
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'Error to send');
    });

    it('should allow you to log in with correct user and password', () => {
        cy.login('mexproai@gmail.com','123123');
        cy.url().should('include', '/profile');
    });

    it('should display error message when trying to log in with incorrect email and password', () => {
        cy.login('mexproai2@gmail.com','123124');
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'connexion échouée');
    });

    it('should display error message when trying to log in without email', () => {
        cy.get('.input-pass').type('123123');
        cy.get('.btn-connect').click();
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'Email invalide');
    });
    

    it('should display error message when trying to log in without password', () => {
        cy.get('.input-email').type('mexproai@gmail.com');
        cy.get('.btn-connect').click();
        cy.get('ion-toast')
        .shadow()
        .find('.toast-message')
        .should('contain.text', 'Mot de passe invalide');
    });

    it('should maintain the user session after reloading', () => {
        cy.login('mexproai@gmail.com', '123123');
        cy.url().should('include', '/profile');
        cy.reload();
        cy.url().should('include', '/profile');
    });

    it('should allow the user to log out', () => {
        cy.login('mexproai@gmail.com', '123123');
        cy.get('.deconnexion').click();
        cy.url().should('not.include', '/profile');
    });

});
