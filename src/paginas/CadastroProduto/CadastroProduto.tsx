import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";
import './CadastroProduto.css';

interface Produto {
  idProduto: number;
  nomeProduto: string;
  precoProduto: number; // Alteração aqui: mudança para tipo number
}

function CadastroProduto() {
  const [cadastroProduto, setCadastroProduto] = useState<Produto>({ idProduto: 0, nomeProduto: "", precoProduto: 0 }); // Alteração aqui: valor inicial 0
  const [cadastrosProdutos, setCadastrosProdutos] = useState<Produto[]>([]);
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

    axiosInstance.get("/produtos").then(result => {
      setCadastrosProdutos(result.data);
    });
  }, [atualizar, token]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCadastroProduto(prevState => ({
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

    axiosInstance.post("/produtos", cadastroProduto).then(result => {
      setAtualizar(result);
      alert('Produto cadastrado com sucesso!');
      limpar();
    }).catch(error => {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar o produto. Produto com o nome já cadastrado.');
    });
  }

  function excluirProduto(idProduto: number) {
    const axiosInstance = axios.create({
      baseURL: 'http://13.58.105.88:8080',
      headers: {
        Authorization: `Bearer ${token}`
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
      idProduto: 0,
      nomeProduto: "",
      precoProduto: 0 // Alteração aqui: valor inicial 0
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
              <input onChange={handleChange} value={cadastroProduto.precoProduto} name="precoProduto" type="number" step="0.01" className="form-controlCD" /> {/* Alteração aqui: step="0.01" para permitir números decimais */}
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
                <td>{"R$ " + produto.precoProduto.toFixed(2)}</td> {/* Alteração aqui: formatar para duas casas decimais */}
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
