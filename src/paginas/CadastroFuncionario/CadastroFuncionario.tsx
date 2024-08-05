import "./CadastroFuncionario.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";

interface Funcionario {
  idFuncionario?: number;
  nomeFuncionario: string;
  numeroFuncionario: string;
  funcaoFuncionario: string;
}

function CadastroFuncionario() {
  const [cadastroFuncionario, setCadastroFuncionario] = useState<Funcionario>({ nomeFuncionario: "", numeroFuncionario: "", funcaoFuncionario: "" });
  const [cadastrosFuncionarios, setCadastrosFuncionarios] = useState<Funcionario[]>([]);
  const [atualizar, setAtualizar] = useState<any>();
  const token = localStorage.getItem('token') || '';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'http://13.58.105.88:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.get('/funcionarios').then(result => {
      setCadastrosFuncionarios(result.data);
    });
  }, [atualizar, token]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCadastroFuncionario(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const axiosInstance = axios.create({
      baseURL: 'http://13.58.105.88:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.post('/funcionarios', cadastroFuncionario).then(result => {
      setAtualizar(result);
      alert('Funcionário cadastrado com sucesso!');
      limpar();
    }).catch(error => {
      console.error('Erro ao cadastrar funcionário:', error);
      alert('Erro ao cadastrar o funcionário. Funcionário com o nome já cadastrado ou está faltando informação.');
    });
  }

  function excluir(idFuncionario: number) {
    const axiosInstance = axios.create({
      baseURL: 'http://13.58.105.88:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.delete(`/funcionarios/${idFuncionario}`).then(result => {
      setAtualizar(result);
      alert('Funcionário excluído com sucesso!');
    }).catch(error => {
      console.error('Erro ao excluir funcionário:', error);
      alert('Erro ao excluir o funcionário. Verifique se ele está sendo usado em entradas ou saídas.');
    });
  }

  function limpar() {
    setCadastroFuncionario({
      nomeFuncionario: "",
      numeroFuncionario: "",
      funcaoFuncionario: ""
    });
  }

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="cabecalhoCF">
        <h1 className="tituloCF">Cadastro de Funcionário</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="funcFuncionario">
            <div>
              <label className="form-labelCF">Nome do Funcionário:</label>
              <input onChange={handleChange} value={cadastroFuncionario.nomeFuncionario} name="nomeFuncionario" type="text" className="form-controlCF" />
            </div>
            <div>
              <label className="form-labelCF">Número Funcionário:</label>
              <input onChange={handleChange} value={cadastroFuncionario.numeroFuncionario} name="numeroFuncionario" type="number" className="form-controlCF" />
            </div>
            <div>
              <label className="form-labelCF">Função Funcionário:</label>
              <input onChange={handleChange} value={cadastroFuncionario.funcaoFuncionario} name="funcaoFuncionario" type="text" className="form-controlCF" />
            </div>
            <br />
            <input type="submit" className="btn btn-success btn-cf" value="Cadastrar" />
          </div>
        </form>
        <hr className="linhaCF" />
        <table className="tableCF">
          <thead>
            <tr>
              <th scope="col">Nome Funcionário</th>
              <th scope="col">Número Funcionário</th>
              <th scope="col">Função Funcionário</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody className="body">
            {cadastrosFuncionarios.map(funcionario => (
              <tr key={funcionario.idFuncionario}>
                <td>{funcionario.nomeFuncionario}</td>
                <td>{funcionario.numeroFuncionario}</td>
                <td>{funcionario.funcaoFuncionario}</td>
                <td>
                  <button onClick={() => setCadastroFuncionario(funcionario)} className="btn btn-warning">Alterar</button>
                  <button onClick={() => excluir(funcionario.idFuncionario!)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadastroFuncionario;
