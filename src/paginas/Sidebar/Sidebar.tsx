import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navigate = useNavigate();

  const closeSidebar = () => {
    if (isOpen) {
      document.body.classList.remove('sidebar-open');
    }
  };

  const navigateTo = (path: string) => {
    navigate(path);
    closeSidebar();
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo">
        <img className='Logo' src="img/ESTOQUE.png" alt="Logo" />
      </div>
      <ul className="menu">
        <li>
          <Link to="/" onClick={() => navigateTo('/')}>
            <img src="img/Homee.png" alt="PagInicial" />
            <span>Página Inicial</span>
          </Link>
        </li>
        <li>
          <Link to="/CadastroProduto" onClick={() => navigateTo('/CadastroProduto')}>
            <img src="img/Produtoo.png" alt="CadProduto" />
            <span>Cadastro Produto</span>
          </Link>
        </li>
        <li>
          <Link to="/CadastroFuncionario" onClick={() => navigateTo('/CadastroFuncionario')}>
            <img src="img/Funcionarioo.png" alt="CadFuncio" />
            <span>Cadastro Funcionário</span>
          </Link>
        </li>
        <li>
          <Link to="/Entrada" onClick={() => navigateTo('/Entrada')}>
            <img src="img/Entradaa.png" alt="Entrada" />
            <span>Entrada</span>
          </Link>
        </li>
        <li>
          <Link to="/Saida" onClick={() => navigateTo('/Saida')}>
            <img src="img/Saidaa.png" alt="Saida" />
            <span>Saída</span>
          </Link>
        </li>
        <li>
          <Link to="/Relatorio" onClick={() => navigateTo('/Relatorio')}>
            <img src="img/Relatorioo.png" alt="Relatorio" />
            <span>Relatório</span>
          </Link>
        </li>
        <li>
          <Link to="/QuantidadeProduto" onClick={() => navigateTo('/QuantidadeProduto')}>
            <img src="img/QuantidadeProduto.png" alt="QuantidadeProduto" />
            <span>Quantidade Produto</span>
          </Link>
        </li>
        <li>
          <Link to="/Sobre" onClick={() => navigateTo('/Sobre')}>
            <img src="img/Sobre.png" alt="Sobre" />
            <span>Sobre</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
