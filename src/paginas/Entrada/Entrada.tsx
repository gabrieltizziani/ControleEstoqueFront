import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import './Entrada.css';

interface Produto {
  idProduto: number;
  nomeProduto: string;
}

interface Entrada {
  idEntrada?: number;
  dataEntrada: string;
  produto: { nomeProduto: string };
  quantidadeProdutoEntrada: number;
  tipo: string;
  fornecedor: string;
  notaFiscal: string;
  valorTotal: string;
}

function Entrada() {
  const [entrada, setEntrada] = useState<Entrada>({
    dataEntrada: '',
    produto: { nomeProduto: '' },
    quantidadeProdutoEntrada: 0,
    tipo: '',
    fornecedor: '',
    notaFiscal: '',
    valorTotal: ''
  });

  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [atualizar, setAtualizar] = useState<any>();
  const [produtos, setProdutos] = useState<Produto[]>([]);
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

    axiosInstance.get('/entrada').then((result: { data: Entrada[] }) => {
      setEntradas(result.data);
    });

    axiosInstance.get('/produtos').then((result: { data: Produto[] }) => {
      setProdutos(result.data);
    });
  }, [atualizar, token]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setEntrada(prevState => ({
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

    axiosInstance.post('/entrada', entrada).then((result: any) => {
      setAtualizar(result);
      alert('Entrada realizada com sucesso!');
      limpar();
    }).catch(error => {
      console.error('Erro ao realizar entrada:', error);
      alert('Erro ao realizar a entrada. Verifique se todos os espaços estão preenchidos.');
    });
  }

  function excluir(idEntrada: number) {
    const axiosInstance = axios.create({
      baseURL: 'http://13.58.105.88:8080',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    axiosInstance.delete(`/entrada/${idEntrada}`).then((result: any) => {
      setAtualizar(result);
      alert('Entrada excluída com sucesso!');
    }).catch(error => {
      console.error('Erro ao excluir entrada:', error);
      alert('Erro ao excluir a entrada.');
    });
  }

  function handleProdutoChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setEntrada(prevState => ({
      ...prevState,
      produto: { nomeProduto: value }
    }));
  }

  function limpar() {
    setEntrada({
      dataEntrada: '',
      produto: { nomeProduto: '' },
      quantidadeProdutoEntrada: 0,
      tipo: '',
      fornecedor: '',
      notaFiscal: '',
      valorTotal: ''
    });
  }

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="cabecalhoEnt">
        <h1 className="tituloEnt">Entrada</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="funcEntrada">
            <div>
              <label className="form-labelEnt"> Data Entrada:</label>
              <input onChange={handleChange} value={entrada.dataEntrada} name="dataEntrada" type="date" className="form-controlEnt" />
            </div>
            <div>
              <label className="form-labelEnt">Produto:</label>
              <select onChange={handleProdutoChange} value={entrada.produto.nomeProduto} name="produto" className="form-controlEnt">
                <option value="">Selecione um produto</option>
                {produtos.map(produto => (
                  <option key={produto.idProduto} value={produto.nomeProduto}>{produto.nomeProduto}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-labelEnt"> Quantidade Produto:</label>
              <input onChange={handleChange} value={entrada.quantidadeProdutoEntrada} name="quantidadeProdutoEntrada" type="number" className="form-controlEnt" />
            </div>
            <div>
              <label className="form-labelEnt"> Tipo Produto:</label>
              <input onChange={handleChange} value={entrada.tipo} name="tipo" type="text" className="form-controlEnt" />
            </div>
            <div>
              <label className="form-labelEnt"> Fornecedor:</label>
              <input onChange={handleChange} value={entrada.fornecedor} name="fornecedor" type="text" className="form-controlEnt" />
            </div>
            <div>
              <label className="form-labelEnt"> Nota Fiscal:</label>
              <input onChange={handleChange} value={entrada.notaFiscal} name="notaFiscal" type="text" className="form-controlEnt" />
            </div>
            <br />
            <input type="submit" className="btn btn-success btn-entrada" value="Cadastrar"></input>
          </div>
        </form>
        <hr className="linhaEnt"></hr>
        <table className="tableEntrada">
          <thead>
            <tr>
              <th scope="col">Data Entrada</th>
              <th scope="col">Produto</th>
              <th scope="col">Qntd. Produto</th>
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
                  <button onClick={() => excluir(entradaProduto.idEntrada!)} className="btn btn-danger">Excluir</button>
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