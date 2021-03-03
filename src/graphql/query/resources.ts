import { GraphQlClient, normalized, normalizedArray } from '../../utils';
import categoryQuery from './categories'
import countriesQuery from './countries'
import postsQuery from './posts'
import homePageQuery from './homePage'
import currencies from './currencies';

const resources = async () => {
  const query = `
    query Resources {
      ${categoryQuery}
      ${countriesQuery}
      ${postsQuery}
      ${homePageQuery}
      ${currencies}
    }
  `

  const data: any = await GraphQlClient(query)

  const resources = {
    categories: normalizedArray(data?.categories?.nodes),
    countries: normalizedArray(data?.countries?.nodes),
    posts: normalizedArray(data?.posts?.nodes),
    homePage: normalized(data?.page),
    currencies: normalized(data?.currencies?.nodes)
  }

  return resources
}

export default resources
