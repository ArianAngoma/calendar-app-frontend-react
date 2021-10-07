/* Importaciones propias */
import {fetchNoToken, fetchWithToken} from '../../helpers/fetch';

describe('Pruebas en el Helper Fetch', () => {
    let token;

    test('Debería de funcionar fetchNoToken', async () => {
        const resp = await fetchNoToken('auth', {email: 'test1@gmail.com', password: '123456'}, 'POST');
        expect(resp instanceof Response).toBe(true);

        const data = await resp.json();
        expect(data.ok).toBe(true);

        /* Guardar token */
        token = data.token;
    });

    test('Debería de funcionar fetchWithToken', async () => {
        localStorage.setItem('token', token);
        const resp = await fetchWithToken('events/615ae9d4082e922dd967762f', {}, 'DELETE');
        const data = await resp.json();
        // console.log(data);
        expect(data.ok).toBe(false);
    });
});