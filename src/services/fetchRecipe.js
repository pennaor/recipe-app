async function fetchAPI(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export default function fetchRecipe(api, query, filter) {
  const url = `https://www.${api}.com/api/json/v1/1`;
  const urls = {
    ingredient: `${url}/filter.php?i=${query}`,
    name: `${url}/search.php?s=${query}`,
    firstLetter: `${url}/search.php?f=${query}`,
    category: `${url}/list.php?c=list`,
    default: `${url}/lookup.php?i=${query}`,
  };
  return fetchAPI(urls[filter] ?? urls.default);
}
