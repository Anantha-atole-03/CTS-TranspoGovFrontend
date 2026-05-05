

export const decodeJwt = (token) => {
    try {
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        return JSON.parse(decodedPayload);
    } catch (error) {
        console.error('Failed to decode JWT:', error);
        return null;
    }

};

export const login = async (email, password) => {   
  
};

export const register = async (name, email, password) => {
  
};