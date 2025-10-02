describe('Admin Conversations', () => {
  it('Loads conversations page and shows conversation list', () => {
    cy.visit('http://localhost:3000/admin/conversations')
    cy.contains('Conversations')
    cy.contains('Total Conversations')
    cy.contains('Avg. Response Time')
    cy.contains('Resolution Rate')
  })
})
