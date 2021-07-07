/// <reference types="Cypress" />

const acessToken = Cypress.env('gitlab_access_token');

Cypress.Commands.add('api_createProject', project => {
    cy.request({
        method: 'POST',
        url: `api/v4/projects/?private_token=${acessToken}`,
        body: {
            name: project.name,
            description: project.description,
            initialize_with_readme: true
        }
    });
});

Cypress.Commands.add('api_createIssue', issue => {
    cy.api_createProject(issue.project)
     .then(response => {
        cy.request({
            method: 'POST',
            url: `api/v4/projects/${response.body.id}/issues?private_token=${acessToken}`,
            body: {
                title: issue.title,
                description: issue.description
            }
        });
     });
});