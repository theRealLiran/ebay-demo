type item = {
  page: number,
  name: string,
  price: string
}

let itemsList: item[] = []

describe('Exporting Ebay MacBook search results into a CSV file', () => {

  it('Should export Apple MacBook search result to CSV', () => {
    cy.visit('/')

    cy.contains('a.hl-cat-nav__js-link', 'Apple').click({ force: true })

    cy.get('h1.title-banner__title').should('have.text', 'Apple')

    cy.contains('div.b-visualnav__title', 'MacBook Air').click()

    cy.get('span.b-pageheader__text').should('contain.text', 'Apple MacBook Air Laptops')

    cy.get('a.pagination__item').each((_, pageIndex) => {
      if (pageIndex > 4) return false

      cy.get('li.s-item.s-item--large')
        .each((item) => {
          cy.wrap(item)
            .find('h3.s-item__title')
            .invoke('text')
            .then($itemTitle => {
              cy.wrap(item)
                .find('span.s-item__price')
                .invoke('text')
                .then($itemPrice => {
                  itemsList.push({ page: pageIndex + 1, name: $itemTitle, price: $itemPrice })
                })
            })
        })

      cy.get('a[type=next]').click()
    })

    cy.task('writeCSV',itemsList)
  })
})