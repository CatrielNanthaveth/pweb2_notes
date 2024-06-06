describe('Make notes actions', () => {

    beforeEach(() => {
        cy.visit('https://notes-front-iota.vercel.app/login');
        cy.get('input[type="email"]').type('admin@notes.com');
        cy.get('input[type="password"]').type('antezana247');
        cy.get('button').contains('Log in').click();
        cy.contains('Welcome!');
    });

    it('Create a new note', () => {
        cy.get('[href="/create"]').click();
        cy.get('input[name="title"]').type('Creating a note');
        cy.get('input[name="description"]').type('This is a new note written by cypress!');
        cy.get('select[name="status"]').select('active')
        cy.get('input[name="category"]').type('Testing');
        cy.get('button[type="submit"]').click();
        cy.wait(2000)
    })

    it('Delete a note', () => {
        cy.get('[href="/active"]').click();
        cy.get('.card_search_container__2Qkjj input').type('Creating a note', { delay: 200 })
        cy.wait(2000);
        cy.get('[aria-label="delete"]').click()
        cy.get('button').contains('Yes!').click()
        cy.get('#swal2-title').contains('Delete')
        cy.wait(2000)
    })

    it('View active notes', () => {
        cy.get('[href="/active"]').click();
        cy.get('.card_card__ppk8h');
    })

    it('Search active notes', () => {
        cy.get('[href="/active"]').click();
        cy.get('.card_search_container__2Qkjj input').type('updated', { delay: 200 })
        cy.wait(2000);
        cy.get('.card_card__ppk8h:first').contains('Note updated to an active note');
    })

    it('Filter by category active notes', () => {
        cy.get('[href="/active"]').click();
        cy.get('select').select('school')
        cy.wait(1000);
        cy.get('.card_card_footer__USuQZ').each($item => cy.wrap($item).should('contain.text', 'school'))
    })
})