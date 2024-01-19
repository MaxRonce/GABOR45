describe('My First Test', () => {
	it('Visits the app root url', () => {
		cy.visit('/')
		cy.get('ion-content').should('contain', 'Tab 1 page').timeout(10000);

	})
})