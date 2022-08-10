import jwt_decode from 'jwt-decode';

export function getAddress() {
    const token = localStorage.getItem('token');
    if(!token) return null;

    try {
        const { addresses } = jwt_decode(token) as any;
        return addresses;
    } catch(Error) {
        return null;
    }

    return null;
}