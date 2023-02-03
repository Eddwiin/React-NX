export class API {
    static apiUrl = process.env.REACT_APP_API_URL || '';
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