/* Importaciones propias */
import {fetchNoToken} from '../../helpers/fetch';

describe('Pruebas en el Helper Fetch', () => {
    test('Debería de funcionar fetchNoToken', async () => {
        const resp = await fetchNoToken('auth', {email: 'test1@gmail.com', password: '123456'}, 'POST');
        expect(resp instanceof Response).toBe(true);

        const body = await resp.json();
        expect(body.ok).toBe(true);
    });
});