export async function fetchOptions() {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/todos`
    );
    const options = await res.json();
    return options;
}