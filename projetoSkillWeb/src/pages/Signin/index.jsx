import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../api/api";

const Signin = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await postLogin(login, senha);

      localStorage.setItem('login', JSON.stringify(response.login));
      const authorizationHeader = response.token;
      const token = authorizationHeader?.split(' ')[1];
      localStorage.setItem('token', token);
      localStorage.setItem('logado', token);

      setError("");
      navigate('/home');
    } catch (error) {
      if (error.response) {
        // console.log(error.response.data); 
        // console.log(error.response.status); 
        // console.log(error.response.headers); 
      } else if (error.request) {
        console.log(error.request); 
      } else {
        console.log('Erro:', error.message);
      }
    }
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
