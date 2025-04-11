describe('First describe', () => {
    beforeEach(()=> {
        cy.visit('https://www.ebay.com/')
    })

    it('first testcase', () => {
        cy.get('input[id="gh-ac"]').should('be.visible')
        cy.get('input[id="gh-ac"]').type('smartphone')
        cy.get('#gh-search-btn').click()

        cy.get('.s-item__price').should('be.visible')
        cy.get('.s-item__link').first().should('have.attr', 'href').and('include', 'smartphone')
    })

})