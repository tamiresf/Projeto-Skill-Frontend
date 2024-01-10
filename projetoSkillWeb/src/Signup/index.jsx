import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import * as C from "./styles";
import { Link } from "react-router-dom";
import { postCadastro } from "../api/api";

const Signup = () => {
  const [login, setLogin] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConf, setSenhaConf] = useState("");
  const [error, setError] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const handleSignup = async () => {
    try {
      if (!login || !senha || !senhaConf) {
        setError('Por favor, preencha todos os campos.');
        return;
      }

      if (senha !== senhaConf) {
        setError('As senhas não coincidem.');
        return;
      }

      const response = await postCadastro(login, nome, senha);

      if (response.status === 200 || response.status === 201) {
        setUsuarios([...usuarios, response.data]);
        setLogin("");
        setNome("");
        setSenha("");
        setSenhaConf("");
        setError('');
        alert('CADASTRADO!')
      } else {
        setError('Erro ao realizar o cadastro. Por favor, tente novamente.');
        console.error('Error: ' + response.data);
        console.error('Error: ' + response.status);
      }
    } catch (error) {
      setError('Erro ao realizar o cadastro. Por favor, tente novamente.');
      console.error("Erro na inclusão:", error);
      console.error("Resposta da API: ", error.response);
    }
  };

  return (
    <C.Container>
      <C.Label>CADASTRAR</C.Label>
      <C.Content>
        <Input
          type="nome"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="login"
          placeholder="Digite seu Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirme sua Senha"
          value={senhaConf}
          onChange={(e) => setSenhaConf(e.target.value)}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
