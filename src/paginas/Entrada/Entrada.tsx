import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import './Entrada.css'

function Entrada() {
  const [entrada, setEntrada] = useState({
    dataEntrada: '',
    produto: { nomeProduto: '' },
    quantidadeProdutoEntrada: '',
    tipo: '',
    fornecedor: '',
    notaFiscal: '',
    valorTotal: ''
  });

  const [entradas, setEntradas] = useState([]);
  const [atualizar, setAtualizar] = useState();
  const [produtos, setProdutos] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.get('/entrada').then(result => {
      setEntradas(result.data);
    });

    axiosInstance.get('/produtos').then(result => {
      setProdutos(result.data);
    });
  }, [atualizar, token]);

  function handleChange(event) {
    const { name, value } = event.target;
    setEntrada(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.post('/entrada', entrada).then(result => {
      setAtualizar(result);
      alert('Entrada realizada com sucesso!');
    }).catch(error => {
      console.error('Erro ao realizar entrada:', error);
      alert('Erro ao realizar a entrada. Verifique se todos os espaços estão preenchidos.');
    });
  }

  function excluir(idEntrada) {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.delete(`/entrada/${idEntrada}`).then(result => {
      setAtualizar(result);
      alert('Entrada excluída com sucesso!');
    }).catch(error => {
      console.error('Erro ao excluir entrada:', error);
      alert('Erro ao excluir a entrada.');
    });
  }

  function handleProdutoChange(event) {
    const { value } = event.target;
    setEntrada(prevState => ({
      ...prevState,
      produto: { nomeProduto: value }
    }));
  }

  return (
    <div>
      <Sidebar />
      <div className="cabecalhoEnt">
        <h1 className="tituloEnt">Entrada</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="funcEntrada">
            <div>
              <label className="form-label"> Data Entrada:</label>
              <input onChange={handleChange} value={entrada.dataEntrada} name="dataEntrada" type="date" className="form-control" />
            </div>
            <div>
              <label className="form-label">Produto:</label>
              <select onChange={handleProdutoChange} value={entrada.produto.nomeProduto} name="produto" className="form-control">
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                  <option key={produto.idProduto} value={produto.nomeProduto}>{produto.nomeProduto}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label"> Quantidade Produto:</label>
              <input onChange={handleChange} value={entrada.quantidadeProdutoEntrada} name="quantidadeProdutoEntrada" type="number" className="form-control" />
            </div>
            <div>
              <label className="form-label"> Tipo Produto:</label>
              <input onChange={handleChange} value={entrada.tipo} name="tipo" type="text" className="form-control" />
            </div>
            <div>
              <label className="form-label"> Fornecedor:</label>
              <input onChange={handleChange} value={entrada.fornecedor} name="fornecedor" type="text" className="form-control" />
            </div>
            <div>
              <label className="form-label"> Nota Fiscal:</label>
              <input onChange={handleChange} value={entrada.notaFiscal} name="notaFiscal" type="text" className="form-control" />
            </div>
            <br />
            <input type="submit" className="btn btn-success" style={{ marginLeft: "260px" }} value="Cadastrar"></input>
          </div>
        </form>
        <hr className="linha"></hr>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Data Entrada</th>
              <th scope="col">Produto</th>
              <th scope="col">Quantidade Produto</th>
              <th scope="col">Tipo Produto</th>
              <th scope="col">Fornecedor</th>
              <th scope="col">Nota Fiscal</th>
              <th scope="col">Valor Total</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {entradas.map(entradaProduto => (
              <tr key={entradaProduto.idEntrada}>
                <td>{entradaProduto.dataEntrada}</td>
                <td>{entradaProduto.produto.nomeProduto}</td>
                <td>{entradaProduto.quantidadeProdutoEntrada}</td>
                <td>{entradaProduto.tipo}</td>
                <td>{entradaProduto.fornecedor}</td>
                <td>{entradaProduto.notaFiscal}</td>
                <td>{"R$ " + entradaProduto.valorTotal}</td>
                <td>
                  <button onClick={() => setEntrada(entradaProduto)} className="btn btn-warning">Alterar</button>
                  <button onClick={() => excluir(entradaProduto.idEntrada)} className="btn btn-danger">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Entrada;
