
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PagInicial from './paginas/PaginaInicial/PagIncial';
import CadastroProduto from './paginas/CadastroProduto/CadastroProduto';
import CadastroFuncionario from './paginas/CadastroFuncionario/CadastroFuncionario';
import Entrada from './paginas/Entrada/Entrada';
import Saida from './paginas/Saida/Saida';
import Relatorio from './paginas/Relatorio/Relatorio';
import QuantidadeProduto from './paginas/QuantidadeProduto/QuantidadeProduto';
import Sobre from './paginas/Sobre/Sobre';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<PagInicial />}/>
      <Route path='CadastroProduto' element={<CadastroProduto />}/>
      <Route path='CadastroFuncionario' element={<CadastroFuncionario />}/>
      <Route path='Entrada' element={<Entrada />}/>
      <Route path='Saida' element={<Saida />}/>
      <Route path='Relatorio' element={<Relatorio />}/>
      <Route path='QuantidadeProduto' element ={<QuantidadeProduto/>}/>
      <Route path='Sobre' element ={<Sobre/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
