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
  let url = `https://www.${api}.com/api/json/v1/1`;
  switch (filter) {
  case 'ingredient':
    url = `${url}/filter.php?i=${query}`;
    break;
  case 'name':
    url = `${url}/search.php?s=${query}`;
    break;
  case 'firstLetter':
    url = `${url}/search.php?f=${query}`;
    break;
  case 'filterByCategory':
    url = `${url}/search.php?c=${query}`;
    break;
  default:
    url = `${url}/lookup.php?i=${query}`;
  }
  return fetchAPI(url);
}

export function fetchRecipeAll(api, filter) {
  const url = `https://www.${api}.com/api/json/v1/1`;
  const verificate = {
    all: `${url}/search.php?s=`,
    categories: `${url}/list.php?c=list`,
  };
  return verificate[filter];
}
