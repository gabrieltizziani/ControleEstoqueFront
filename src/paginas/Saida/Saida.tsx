import "./Saida.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";

function Saida() {
  const [saida, setSaida] = useState({
    dataSaida: "",
    funcionario: { nomeFuncionario: "" },
    produto: { nomeProduto: "" },
    quantidadeProduto: "",
    tipo: "",
    valorTotal: ""
  });

  const [saidas, setSaidas] = useState([]);
  const [atualizar, setAtualizar] = useState();
  const [produtos, setProdutos] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.get("/saida").then(result => {
      setSaidas(result.data);
    });

    axiosInstance.get("/produtos").then(result => {
      setProdutos(result.data);
    });

    axiosInstance.get("/funcionarios").then(result => {
      setFuncionarios(result.data);
    });
  }, [atualizar, token]);

  function handleChange(event) {
    if (event.target.name === "produto") {
      setSaida({
        ...saida,
        produto: { nomeProduto: event.target.value }
      });
    } else if (event.target.name === "funcionario") {
      setSaida({
        ...saida,
        funcionario: { nomeFuncionario: event.target.value }
      });
    } else {
      setSaida({
        ...saida,
        [event.target.name]: event.target.value
      });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.post("/saida", saida).then(result => {
      setAtualizar(result);
      alert('Saída realizada com sucesso!');
    }).catch(error => {
      console.error('Erro ao realizar saída:', error);
      alert('Erro ao realizar a saída. Verifique se todos os espaços estão preenchidos.');
    });
    
  }

  function excluir(idSaida) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.delete(`/saida/${idSaida}`).then(result => {
      setAtualizar(result);
      alert('Saída excluída com sucesso!');
    }).catch(error => {
      console.error('Erro ao excluir saída:', error);
      alert('Erro ao excluir a saída.');
    });
  }

  function handleProdutoChange(event) {
    setSaida(prevState => ({
      ...prevState,
      produto: { nomeProduto: event.target.value }
    }));
  }

  function handleFuncionarioChange(event) {
    setSaida(prevState => ({
      ...prevState,
      funcionario: { nomeFuncionario: event.target.value }
    }));
  }

  return (
    <div>
      <Sidebar />
      <div className="cabecalhoSaida">
        <h1 className="tituloSaida">Saída</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="funcSaida">
            <div>
              <label className="form-label"> Data Saída:</label>
              <input onChange={handleChange} value={saida.dataSaida} name="dataSaida" type="date" className="form-control" />
            </div>
            <div>
              <label className="form-label">Funcionário:</label>
              <select onChange={handleFuncionarioChange} value={saida.funcionario.nomeFuncionario} name="funcionario" className="form-control">
                <option value="">Selecione um Funcionário</option>
                {funcionarios.map(funcionario => (
                  <option key={funcionario.idFuncionario} value={funcionario.id}>{funcionario.nomeFuncionario}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Produto:</label>
              <select onChange={handleProdutoChange} value={saida.produto.nomeProduto} name="produto" className="form-control">
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                  <option key={produto.idProduto} value={produto.id}>{produto.nomeProduto}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label"> Quantidade Produto:</label>
              <input onChange={handleChange} value={saida.quantidadeProduto} name="quantidadeProduto" type="number" className="form-control" />
            </div>
            <div>
              <label className="form-label"> Tipo:</label>
              <input onChange={handleChange} value={saida.tipo} name="tipo" type="text" className="form-control" />
            </div>

            <br />
            <input type="submit" className="btn btn-success" style={{ marginLeft: "230px" }} value="Cadastrar"></input>
          </div>
        </form>
        <hr className="linha"></hr>
        <table className="table" style={{ marginLeft: "230px" }}>
          <thead>
            <tr>
              <th scope="col">Data Saida</th>
              <th scope="col">Funcionario</th>
              <th scope="col">Produto</th>
              <th scope="col">Quantidade Produto</th>
              <th scope="col">Tipo</th>
              <th scope="col">Valor Total</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {saidas.map(saidaProduto => (
              <tr key={saidaProduto.idSaida}>
                <td>{saidaProduto.dataSaida}</td>
                <td>{saidaProduto.funcionario.nomeFuncionario}</td>
                <td>{saidaProduto.produto.nomeProduto}</td>
                <td>{saidaProduto.quantidadeProduto}</td>
                <td>{saidaProduto.tipo}</td>
                <td>{"R$ " + saidaProduto.valorTotal}</td>
                <td>
                  <button onClick={() => setSaida(saidaProduto)} className="btn btn-warning">Alterar</button>
                  <button onClick={() => excluir(saidaProduto.idSaida)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Saida;
