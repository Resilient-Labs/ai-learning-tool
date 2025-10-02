describe('Admin Dashboard', () => {
  it('Loads dashboard and shows key metrics', () => {
    cy.visit('http://localhost:3000/admin')
    cy.contains('Dashboard Overview')
    cy.contains('Total Students')
    cy.contains('Active Lessons')
    cy.contains('Conversations')
    cy.contains('Completion Rate')
  })
})
