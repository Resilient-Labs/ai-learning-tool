describe('Admin Students', () => {
  it('Visits the local app', () => {
    cy.visit('http://localhost:3000/admin/students')
    cy.get('h2').contains('Students')
    cy.get('input[type="text"]') //search bar
    cy.contains('Total Students')
    cy.contains('Active Students')

  })
})