export class API {
    static apiUrl =  process.env.NX_API_URL || 'https://dummyjson.com';
    static headers = new Headers({
        'Content-Type': 'application/json'
    })

    static post(endpoint: string, body: string) {
        return fetch(`${API.apiUrl}/${endpoint}`, {
            method: 'POST',
            headers: API.headers,
            body
        })
    }
}