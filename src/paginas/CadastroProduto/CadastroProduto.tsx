import './CadastroProduto.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";

function CadastroProduto() {
  const [cadastroProduto, setCadastroProduto] = useState({ nomeProduto: "", precoProduto: "" });
  const [cadastrosProdutos, setCadastrosProdutos] = useState([]);
  const [atualizar, setAtualizar] = useState();
  const token = localStorage.getItem('token'); // Armazene o token em uma variável
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}` // Inclua o token no cabeçalho
      }
    });

    axiosInstance.get("/produtos").then(result => {
      setCadastrosProdutos(result.data);
    });
  }, [atualizar]);

  function handleChange(event) {
    setCadastroProduto({ ...cadastroProduto, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}` // Inclua o token no cabeçalho
      }
    });

    axiosInstance.post("/produtos", cadastroProduto).then(result => {
      setAtualizar(result);
      alert('Produto cadastrado com sucesso!');
      limpar(); // Chama a função limpar após o cadastro
    })
    .catch(error => {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar o produto. Produto com o nome já cadastrado.');
    });
  }

  function editar(produto) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}` // Inclua o token no cabeçalho
      }
    });

    axiosInstance.put("/produtos/", cadastroProduto).then(result => {
      setAtualizar(result);
      alert('Produto alterado com sucesso!');
      limpar();
    });
  }

  function excluirProduto(idProduto) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}` // Inclua o token no cabeçalho
      }
    });

    axiosInstance.delete(`/produtos/${idProduto}`).then(result => {
      setAtualizar(result);
      alert('Produto excluído com sucesso!');
    }).catch(error => {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir o produto. Verifique se ele está sendo usado em entradas ou saídas.');
    });
  }

  function limpar() {
    setCadastroProduto({
      nomeProduto: "",
      precoProduto: ""
    });
  }

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="cabecalhoCP">
        <h1 className="tituloCP">Cadastro de Produto</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="funcProduto">
            <div>
              <label className="form-labelCD"> Nome do Produto:</label>
              <input onChange={handleChange} value={cadastroProduto.nomeProduto} name="nomeProduto" type="text" className="form-controlCDN" />
            </div>
            <div>
              <label className="form-labelCD"> Preço Produto:</label>
              <input onChange={handleChange} value={cadastroProduto.precoProduto} name="precoProduto" type="number" className="form-controlCD" />
            </div>
            <br />
            <input type="submit" className="btn btn-success" style={{ marginLeft: "230px" }} value="Cadastrar"></input>
          </div>
        </form>
        <hr className="linhaCD"></hr>
        <table className="tableCD" >
          <thead>
            <tr>
              <th scope="col">Nome Produto</th>
              <th scope="col">Preço Produto</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {cadastrosProdutos.map(produto => (
              <tr key={produto.idProduto}>
                <td>{produto.nomeProduto}</td>
                <td>{"R$ " + produto.precoProduto}</td>
                <td>
                  <button onClick={() => setCadastroProduto(produto)} className="btn btn-warning">Alterar Valor</button>
                  <button onClick={() => excluirProduto(produto.idProduto)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CadastroProduto;
