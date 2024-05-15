
import { Link, useNavigate } from 'react-router-dom'; // Importe o hook useNavigate do react-router-dom
import './Sidebar.css'; // Import CSS file for styling

const Sidebar = () => {
  const navigate = useNavigate(); 

  const goToPaginaInicial = () => {
    navigate('/');
  }
  const goToCadastroProduto = () => {
    navigate('/CadastroProduto')
  }
  const goToCadastroFuncionario = () => {
    navigate('/CadastroFuncionario')
  }
  const goToEntrada = () => {
    navigate('/Entrada')
  }
  const goToSaida = () => {
    navigate('/Saida')
  }
  const goToRelatorio = () => {
    navigate('/Relatorio')
  }
  const goToQuantidadeProduto = () => {
    navigate('/QuantidadeProduto')
  }
  const openSobrePage = () => {
    
    window.open('/Sobre', '_blank', 'width=800,height=600');
  }

  return (
    <div className="sidebar">
      <div className="logo">
      <img src="img/ESTOQUE.png" alt="Logo" />
      </div>
      <ul className="menu">
        {/* Use o Link para navegar para a página inicial */}
        <li>
          <Link to="/" onClick={goToPaginaInicial}>
            <img src="img/Homee.png" alt="PagInicial" />
            <span>Página Inicial</span>
          </Link>
        </li>
        <li>
          <Link to="/CadastroProduto" onClick={goToCadastroProduto}>
            <img src="img/Produtoo.png" alt="CadProduto" />
            <span>Cadastro Produto</span>
          </Link>
        </li>
        <li>
          <Link to="/CadastroFuncionario" onClick={goToCadastroFuncionario}>
            <img src="img/Funcionarioo.png" alt="CadFuncio" />
            <span>Cadastro Funcionário</span>
          </Link>
        </li>
        <li>
          <Link to="/Entrada" onClick={goToEntrada}>
            <img src="img/Entradaa.png" alt="Entrada" />
            <span>Entrada</span>
          </Link>
        </li>
        <li>
          <Link to="/Saida" onClick={goToSaida}>
            <img src="img/Saidaa.png" alt="Saida" />
            <span>Saída</span>
          </Link>
        </li>
        <li>
          <Link to="/Relatorio" onClick={goToRelatorio}>
            <img src="img/Relatorioo.png" alt="Relatorio" />
            <span>Relatório</span>
          </Link>
        </li>
        <li>
          <Link to="/QuantidadeProduto" onClick={goToQuantidadeProduto}>
            <img src="img/QuantidadeProduto.png" alt="QuantidadeProduto" />
            <span>Saldo Estoque</span>
          </Link>
        </li>
        <li>
          <Link onClick={openSobrePage}>
            <img src="img/Sobre.png" alt="Sobre" />
            <span>Sobre</span>
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
