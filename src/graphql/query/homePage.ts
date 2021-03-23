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
        backgroundResponsive {
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
        backgroundResponsive {
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
        imageResponsive {
          id
          mediaType
          sourceUrl
        }
      }
    }
  }
`

export default home
