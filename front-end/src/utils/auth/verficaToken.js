import { requestData, setToken } from '../../services/api';

function verificaAuthTypeUser(role, typeUser) {
  if (role !== typeUser) {
    console.log('quebra de segurança');
    return false;
  }
  return true;
}

export default async function verficaToken(typeUser) {
  try {
    if (localStorage.getItem('logado') === 'true') {
      const { token } = JSON.parse(localStorage.getItem('user'));
      setToken(token);
    }
    const { id, role, name } = await requestData('/user/validate');
    if (!role) {
      console.log('token invalido');
      return 'error';
    }
    if (verificaAuthTypeUser(role, typeUser)) return { id, name };
    return 'error';
  } catch (error) {
    console.log('deslogado');
    return 'error';
  }
}
