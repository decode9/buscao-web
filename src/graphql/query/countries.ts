const countries = `
  countries {
    nodes {
      name
      slug
      statesField {
        states {
          name
          slug
        }
      }
    }
  }
`

export default countries
