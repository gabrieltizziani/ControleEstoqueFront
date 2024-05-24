import React, { useState } from 'react';
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
import Login from './paginas/Login/Login';

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/PagInicial" element={<PagInicial />} />
        <Route path="/CadastroProduto" element={<CadastroProduto />} />
        <Route path="/CadastroFuncionario" element={<CadastroFuncionario />} />
        <Route path="/Entrada" element={<Entrada />} />
        <Route path="/Saida" element={<Saida />} />
        <Route path="/Relatorio" element={<Relatorio />} />
        <Route path="/QuantidadeProduto" element={<QuantidadeProduto />} />
        <Route path="/Sobre" element={<Sobre />} />
        <Route path="/" element={<PagInicial />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;