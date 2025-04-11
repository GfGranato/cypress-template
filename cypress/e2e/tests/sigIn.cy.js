import {signInBtn, theGuarantorsLogo} from "../../support/mapping/landing.page"
import {usernameInput, passwordInput, submitBtn, errorText} from "../../support/mapping/signIn.page"

describe('Testing Sign In feature from theGuarantors website', () => {
    beforeEach(() => {
        cy.visit("https://www.theguarantors.com/")
        cy.get(signInBtn).first().click()
    })

    it('Validate Sign in elements loads properly', () => {
        cy.origin('https://auth.theguarantors.com', 
            {args:{theGuarantorsLogo, usernameInput, passwordInput, submitBtn}}, 
            ({theGuarantorsLogo, usernameInput, passwordInput, submitBtn}) => {
                cy.get(theGuarantorsLogo).should('be.visible')
                cy.get(usernameInput).should('be.visible')
                cy.get(passwordInput).should('be.visible')
                cy.get(submitBtn).should('be.visible').and('be.enabled')
        })
    })

    it('Validate Invalid user', () => {
        cy.origin('https://auth.theguarantors.com', 
            {args:{usernameInput, passwordInput, submitBtn, errorText}}, 
            ({usernameInput, passwordInput, submitBtn, errorText}) => {
                cy.get(usernameInput).type('invalid@user.com')
                cy.get(passwordInput).type('wrong password')
                cy.get(submitBtn).click()
                cy.get(errorText).should('be.visible').and('contain', 'Wrong email or password')
        })
    })

})