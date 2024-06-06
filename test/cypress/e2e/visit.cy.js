describe('Visit the home of page', () => {

    beforeEach(() => {
        cy.visit('https://notes-front-iota.vercel.app');
    })

    it('Check if the page is the right one', () => {
        cy.get('.home_main__C5E0Z').contains('Carti');
        cy.get('[href="/active"]').contains('Active');
        cy.get('[href="/archived"]').contains('Archived');
        cy.get('[href="/create"]').contains('New note');
    })

    it('Clicks "Active" button without login', () => {
        cy.get('[href="/active"]').click();
        cy.get('button').contains('Log in');
    })

    it('Clicks "Archived" button without login', () => {
        cy.get('[href="/archived"]').click();
        cy.get('button').contains('Log in');
    })

    it('Clicks "New note" button without login', () => {
        cy.get('[href="/create"]').click();
        cy.get('button').contains('Log in');
    })

    it('Clicks "Active" button then go to register page', () => {
        cy.get('[href="/active"]').click();
        cy.get('[href="/register"]').click();
        cy.get('button').contains('Register');
    })
})