import './PagIncial.css';
import Sidebar from '../Sidebar/Sidebar'; // Import the Sidebar component
import { useEffect, useState } from 'react';
import axios from 'axios';

function PagInicial() {
  const [quantidades, setQuantidades] = useState({
    produtos: 0,
    funcionarios: 0,
    entradas: 0,
    saidas: 0
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para gerenciar a visibilidade da sidebar
  const token = localStorage.getItem('token'); // Armazene o token em uma variável

  useEffect(() => {
    async function fetchQuantidades() {
      try {
        const axiosInstance = axios.create({
          baseURL: 'http://localhost:8080',
          headers: {
            Authorization: `Bearer ${token}` // Inclua o token no cabeçalho
          }
        });

        const produtosResponse = await axiosInstance.get('/quantidade/produtos');
        const funcionariosResponse = await axiosInstance.get('/quantidade/funcionarios');
        const entradasResponse = await axiosInstance.get('/quantidade/entradas');
        const saidasResponse = await axiosInstance.get('/quantidade/saidas');

        setQuantidades({
          produtos: produtosResponse.data,
          funcionarios: funcionariosResponse.data,
          entradas: entradasResponse.data,
          saidas: saidasResponse.data
        });
      } catch (error) {
        console.error('Erro ao buscar as quantidades:', error);
      }
    }

    fetchQuantidades();
  }, [token]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="cabecalho">
        <h1 className="tituloprinc">Sistema Controle de Estoque</h1>
      </div>
      <h1 className="dash">DASHBOARD</h1>
      <div className="quantidades-container">
        <div className="card blue">
          <img src="img/ProdutoC.png" alt="imagem 1" className="img"/>
          <h3>Quantidade de Produtos</h3>
          <p>{quantidades.produtos}</p>
        </div>
        <div className="card green">
          <img src="img/FuncionarioC.png" alt="imagem 2" className="img"/>
          <h3>Quantidade de Funcionários</h3>
          <p>{quantidades.funcionarios}</p>
        </div>
        <div className="card yellow">
          <img src="img/EntradaC.png" alt="imagem 3" className="img"/>
          <h3>Quantidade de Entradas</h3>
          <p>{quantidades.entradas}</p>
        </div>
        <div className="card red">
          <img src="img/SaidaC.png" alt="imagem 4h" className="img"/>
          <h3>Quantidade de Saídas</h3>
          <p>{quantidades.saidas}</p>
        </div>
      </div>
    </div>
  );
}

export default PagInicial;
