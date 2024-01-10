import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:8080/api/" });

const getToken = () => localStorage.getItem("token");

export const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};

export const postCadastro = (login, nome, senha) => {
  return api.post("usuario/cadastrar", {
    login: login,
    nome: nome,
    senha: senha,
  });
};

export const postLogin = async (login, senha) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post("usuario/login", {
      login: login,
      // nome: nome,
      senha: senha,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
