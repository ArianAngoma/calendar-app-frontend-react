/* Url base */
const baseUrl = process.env.REACT_APP_API_URL

/* Fetch cuando no requerimos en TOKEN */
export const fetchNoToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') return fetch(url);
    else return fetch(url, {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}