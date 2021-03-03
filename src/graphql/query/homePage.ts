import { homeId } from '../../utils/pageIds'

const home = `
  page(id: "${homeId}") {
    title
    home {
      principalBanner {
        subtitle
        title
        background {
          id
          mediaType
          sourceUrl
        }
      }
      secundaryBanner {
        content
        background {
          id
          mediaType
          sourceUrl
        }
        logo {
          id
          mediaType
          sourceUrl
        }
      }
      slideshow {
        image {
          id
          mediaType
          sourceUrl
        }
        text
      }
    }
  }
`

export default home
