const posts = `
posts {
  nodes {
    id
    title
    slug
    categories {
      nodes {
        id
        name
        slug
      }
    }
    commerce {
      image
      outstanding
      country {
        id
        name
        slug
      }
      paymentmethods {
        id
        name
        slug
        currencyData {
          icon{
            mediaItemUrl
            mediaType
          }
        }
      }
      subsidiary {
        address
        deliveryPickup
        map {
          latitude
          longitude
          streetAddress
        }
        name
        phoneNumber
        schedule {
          friday {
            abierto
            apertura
            cierre
          }
          monday {
            abierto
            apertura
            cierre
          }
          saturday {
            abierto
            apertura
            cierre
          }
          sunday {
            abierto
            apertura
            cierre
          }
          thursday {
            abierto
            apertura
            cierre
          }
          tuesday {
            abierto
            apertura
            cierre
          }
          wednesday {
            abierto
            apertura
            cierre
          }
        }
        state {
          id
          name
          slug
        }
      }
      website
    }
  }
}
`

export default posts
