describe('Admin Lessons', () => {
  it('Loads lessons page and shows lesson cards', () => {
    cy.visit('http://localhost:3000/admin/lessons')
    cy.contains('Lessons')
    cy.contains('Total Lessons')
    cy.contains('Published')
    cy.get('button').contains('Create Lesson')
  })
})
