export async function fetchOptions(resource: string) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/${resource}`
    );
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