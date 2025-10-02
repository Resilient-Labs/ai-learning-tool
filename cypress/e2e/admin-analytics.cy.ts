describe('Admin Analytics', () => {
  it('Loads analytics page and shows performance metrics', () => {
    cy.visit('http://localhost:3000/admin/analytics')
    cy.contains('Analytics')
    cy.contains('Total Students')
    cy.contains('Course Performance')
    cy.contains('Growth Metrics')
  })
})
