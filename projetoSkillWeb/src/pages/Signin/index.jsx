import React, { useState } from "react";
import Input from "../../components/Input"
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Signin = () => {
  // const { signin } = useAuth();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  // const handleLogin = () => {
  //   if (!email | !senha) {
  //     setError("Preencha todos os campos");
  //     return;
  //   }

  //   const res = signin(email, senha);

  //   if (res) {
  //     setError(res);
  //     return;
  //   }

    // navigate("/home");
  // };

//   const apiUrl = 'http://localhost:8080';  // Substitua pela URL do seu back-end

// const login = async (username, password) => {
//   try {
//     const response = await axios.post(`${apiUrl}/login`, {
//       login: login,
//       senha: senha,
//     });

//     // Obtenha o token JWT da resposta e armazene-o localmente (por exemplo, em localStorage)
//     const token = response.data.token;
//     localStorage.setItem('token', token);

//     // Realize outras aÃ§Ãµes apÃ³s o login bem-sucedido, se necessÃ¡rio
//   } catch (error) {
//     // Trate erros de autenticaÃ§Ã£o
//     console.error('Erro de autenticaÃ§Ã£o:', error.message);
//   }
// };


const getToken = () => localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
};
// const api = axios.create({ baseURL: "http://localhost:8080/api" });

const postLogin = (login, senha) => {
  return post(
    "http://localhost:8080/api/usuario/login",
    {
      login: login,
      senha: senha 
    },
    config
  );
};

const handleLogin = async (e) => {
  e.preventDefault();
  if (!login || !senha) {
    setErrorMessage('Preencha todos os campos');
    return;
  }
    const response = await postLogin(login, senha);

    localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
    
    localStorage.setItem('usuarioLogado', true)

    const authorizationHeader = response.data.token;
    const token = authorizationHeader?.split(' ')[1];

    localStorage.setItem('token', token);
    localStorage.setItem('logado', token);


    navigate('/home');
  
};

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Entrar" onClick={handleLogin} />
        <C.LabelSignup>
          Não tem uma conta?
          <C.Strong>
            <Link to="/signup">&nbsp;Registre-se</Link>
          </C.Strong>
        </C.LabelSignup>
      </C.Content>
    </C.Container>
  );
};

export default Signin;
