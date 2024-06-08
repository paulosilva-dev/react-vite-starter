import { useEffect, useState } from 'react';
async function fetchData(apiURL, setData, setError) {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    setData(data);
    return data;
  } catch (err) {
    setError(err);
  }
}

export const MyComponent = () => <p>Hello world</p>;

export function MyComponentWithApiCall({ apiURL }) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    fetchData(apiURL, setData, setError);
  }, [apiURL]);
  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  return data ? <a role="link">{JSON.stringify(data)}</a> : <div>Loading</div>;
}
