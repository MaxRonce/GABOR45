describe('Test for events page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8100/login');
        cy.login('mexproai@gmail.com', '123123');
        cy.url().should('include', '/profile');
    });

    it('add new event', () => {
        cy.get('[tab="events"]', { timeout: 30000 }).click();
        cy.get('#my-fab-button').click();
        cy.get('ion-modal').should('be.visible');
        cy.get('ion-input[placeholder="Nom de l\'évènement"]').type('Test event 3');
        cy.get('ion-textarea[placeholder="Description de l\'évènement"]').type('Test description 2');
        const filepath = "tacos2.jpg";
        cy.get('input[type="file"]').attachFile(filepath);
        cy.contains('ion-button','Ajouter').click();
        cy.wait(2000);

    });

    it('should display a recipe', () => {
        cy.get('[tab="home"]').click();
        cy.contains('ion-card-title', 'Recette').click();
        cy.url().should('include', '/recette');
    });

    it('add new recipe with one ingredient and step', () => {
        cy.get('[tab="events"]').click();
        cy.get('#my-fab-button').click();
        cy.get('ion-modal').should('be.visible');
        cy.contains('.nav-text','recette').click();
        cy.get('ion-input[placeholder="Nom de la recette"]').type('Test recipe');
        cy.get('ion-textarea[placeholder="Description de la recette"]').type('Test description');
        cy.get('ion-input[placeholder="Nom"]').type('Ingredient 1');
        cy.get('ion-input[placeholder="Quantité"]').type('100');
        cy.get('ion-select').first().click();
        cy.get('ion-alert').should('be.visible');
        cy.get('ion-alert').contains('g').click();
        cy.get('ion-alert').contains('OK').click();
        cy.get('.btn-ajouter').contains('Ajouter une étape').click();
        cy.get('ion-textarea[placeholder="Étape 1"]').type('step 1');
        cy.get('ion-textarea[placeholder="Étape 2"]').type('step 2');
        const filepath = "tacos2.jpg";
        cy.get('input[type="file"]').attachFile(filepath);
        cy.get('#submit-recipe').click(); 
    });

});