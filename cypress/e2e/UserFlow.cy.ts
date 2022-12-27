import {random} from "@/utils/product"

describe('Flow', () => {
   it('user can checkout', () => {
    //go to login
    cy.visit('/');
    cy.findByRole('link', {  name: /click to login/i}).click();
    cy.findByRole('heading', {  name: /login/i}).should("be.visible");

    //login
    cy.findByRole('textbox').type("hello@devkind.com.au");
    cy.findByPlaceholderText(/password/i).type("test123");
    cy.findByRole('button', {  name: /submit/i}).click();

    //verify logged in user
    cy.wait(10000);
    cy.get('[placeholder=loggedEmail]').should("be.visible");
    cy.get('[placeholder=loggedEmail]').then(email => {
        expect(email.val()).to.equal("hello@devkind.com.au");
    })
    cy.findByText(/log out/i).should("be.visible");

    //select new address option
    cy.findByText(/continue with a new shipping address/i).click();
    cy.findByTestId('address_form').should("be.visible");

    //add new address
    const firstName = random("text");
    const lastName = random("text");
    const address1 = random("text",10);
    const zip = random("num",5);
    const city = random("text");
    const state = random("text");
    const phone = random("num",10);

    cy.findByPlaceholderText(/first name\*/i).type(firstName);
    cy.findByPlaceholderText(/last name\*/i).type(lastName);
    cy.findByPlaceholderText(/address\*/i).type(address1);
    cy.findByPlaceholderText(/zipcode\*/i).type(zip);
    cy.findByPlaceholderText(/city\*/i).type(city);
    cy.findByPlaceholderText(/state\*/i).type(state);
    cy.findByPlaceholderText(/phone number\*/i).type(phone);
    cy.findByRole('button', {  name: /continue to shipping/i}).click();

    //verify new address 
    cy.findByText(`${firstName} ${lastName}, ${address1} ${city} ${state} ${zip} (${"US"})`).should("be.visible");

    //logout
    cy.findByText(/log out/i).click();
    cy.findByRole('heading', {  name: /login/i}).should("be.visible");

    //reset password
    cy.findByRole('link', {  name: /forgot password/i}).click();
    cy.findByRole('heading', {  name: /reset password/i}).should("be.visible");
    cy.findByRole('textbox').type("hello@devkind.com.au");
    cy.findByRole('button', {  name: /reset now/i}).click();
    cy.findByText(  /email has been sent to your email\. you can use it to reset your password\./i  ).should("be.visible");
   });
});
