export async function fetchOptions(
  resource: string,
  searchParams: Record<string, any>
) {
  let searchString = "";
  if (Object.keys(searchParams).length) {
    Object.keys(searchParams).forEach((param) => {
      if (searchParams[param]) {
        searchString += `${param}=${searchParams[param]}&`;
      }
    });
  }
  const paramString = searchString.length ? `${resource}?${searchString.slice(0, -1)}` : resource;
  const res = await fetch(`https://jsonplaceholder.typicode.com/${paramString}`);
  const options = await res.json();
  return options;
}

export async function createOption(title: string, resource: string) {
  await fetch(`https://jsonplaceholder.typicode.com/${resource}`, {
    method: 'POST',
    body: JSON.stringify({
      title
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json());
}