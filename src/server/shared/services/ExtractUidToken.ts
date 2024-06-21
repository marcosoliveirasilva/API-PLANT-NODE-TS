import * as jwt from 'jsonwebtoken';

export const extractUidFromToken = (accessToken: string): string | null => {
  try {
    const decodedToken = jwt.decode(accessToken);

    if (decodedToken && typeof decodedToken !== 'string' && 'uid' in decodedToken) {
      return (decodedToken as jwt.JwtPayload).uid;
    } else {
      console.error('Token decodificado não possui a propriedade uid ou é uma string');
      return null;
    }
  } catch (error) {
    console.error('Erro ao decodificar o token:', error);
    return null;
  }
};
