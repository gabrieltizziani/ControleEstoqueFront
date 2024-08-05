import React, { useState, useEffect, FormEvent } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import "./Relatorio.css";

interface Funcionario {
  idFuncionario: number;
  nomeFuncionario: string;
}

interface RelatorioComum {
  id: number;
  tipo: string;
  valorTotal: number;
}

interface RelatorioEntrada extends RelatorioComum {
  dataEntrada: string;
  produto: { nomeProduto: string };
  quantidadeProdutoEntrada: number;
  fornecedor: string;
  notaFiscal: string;
}

interface RelatorioSaida extends RelatorioComum {
  dataSaida: string;
  funcionario: { nomeFuncionario: string };
  produto: { nomeProduto: string };
  quantidadeProduto: number;
}

function Relatorio() {
  const [relatorio, setRelatorio] = useState<(RelatorioEntrada | RelatorioSaida)[]>([]);
  const [tipoRelatorio, setTipoRelatorio] = useState<string>("");
  const [valorTotal, setValorTotal] = useState<string>("");
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<string>("");
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const token = localStorage.getItem('token') || '';
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://13.58.105.88:8080/funcionarios", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFuncionarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    fetchFuncionarios();
  }, [token]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const dataInicial = formData.get("dataInicial") as string;
    const dataFinal = formData.get("dataFinal") as string;
    const tipo = formData.get("tipo") as string;

    const params: any = { dataInicial, dataFinal };
    if (tipo === "saida") {
      const idFuncionario = formData.get("funcionario") as string;
      if (idFuncionario) {
        params.funcionario = idFuncionario;
      }
    }

    try {
      const response = await axios.get(`http://13.58.105.88:8080/relatorios/${tipo}s`, {
  params,
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const data: RelatorioEntrada[] | RelatorioSaida[] = tipo === "entrada" ? response.data.entradas : response.data.saidas;

if (Array.isArray(data)) {
  setRelatorio(data);
  setTipoRelatorio(tipo);
  setValorTotal(response.data.valorTotal.toFixed(2));
} else {
  console.error("Erro ao obter dados do relatório: Resposta inválida", response.data);
}

    } catch (error) {
      console.error("Erro ao obter dados do relatório:", error);
    }
  };

  const handleFuncionarioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFuncionarioSelecionado(event.target.value);
  };

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="cabecalhoRelatorio">
        <h1 className="tituloRelatorio">Relatório</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="funcRelatorio">
            <div>
              <label className="form-labelRel"> Data Inicial:</label>
              <input name="dataInicial" type="date" className="form-controlI" required />
            </div>
            <div>
              <label className="form-labelRel"> Data Final:</label>
              <input name="dataFinal" type="date" className="form-controlF" required />
            </div>
            <div>
              <label className="form-labelRel"> Tipo: </label>
              <div>
                <input type="radio" id="entrada" name="tipo" value="entrada" className="form-check-input" required style={{ marginLeft: "40px" }} />
                <label htmlFor="entrada" className="form-check-label">Entrada</label>
              </div>
              <div>
                <input type="radio" id="saida" name="tipo" value="saida" className="form-check-input" required />
                <label htmlFor="saida" className="form-check-label">Saída</label>
              </div>
            </div>
            {tipoRelatorio === "saida" && (
              <div>
                <label className="form-labelRel"> Funcionário: </label>
                <select name="funcionario" className="form-control" value={funcionarioSelecionado} onChange={handleFuncionarioChange}>
                  <option value="">Todos</option>
                  {funcionarios.map(funcionario => (
                    <option key={funcionario.idFuncionario} value={funcionario.idFuncionario}>{funcionario.nomeFuncionario}</option>
                  ))}
                </select>
              </div>
            )}
            <br />
            <input type="submit" className="btn btn-success btn-relatorio" value="Gerar Relatório" />
          </div>
        </form>
        <hr className="linhaRel" />
        {tipoRelatorio && relatorio.length > 0 && (
          <div className="relatorio">
            <h2>{`Relatório de ${tipoRelatorio === "entrada" ? "Entradas" : "Saídas"}:`}</h2>
            <p>{`Valor Total: R$ ${valorTotal}`}</p>
            <table className="tableR">
              <thead>
                <tr>
                  {tipoRelatorio === "entrada" ? (
                    <>
                      <th scope="col">Data Entrada</th>
                      <th scope="col">Produto</th>
                      <th scope="col">Qntd. Produto</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Fornecedor</th>
                      <th scope="col">Nota Fiscal</th>
                      <th scope="col">Valor Total</th>
                    </>
                  ) : (
                    <>
                      <th scope="col">Data Saída</th>
                      <th scope="col">Funcionário</th>
                      <th scope="col">Produto</th>
                      <th scope="col">Qntd. Produto</th>
                      <th scope="col">Tipo</th>
                      <th scope="col">Valor Total</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {relatorio.map(item => (
                  <tr key={item.id}>
                    {tipoRelatorio === "entrada" ? (
                      <>
                        <td>{(item as RelatorioEntrada).dataEntrada}</td>
                        <td>{(item as RelatorioEntrada).produto.nomeProduto}</td>
                        <td>{(item as RelatorioEntrada).quantidadeProdutoEntrada}</td>
                        <td>{item.tipo}</td>
                        <td>{(item as RelatorioEntrada).fornecedor}</td>
                        <td>{(item as RelatorioEntrada).notaFiscal}</td>
                        <td>{"R$ " + item.valorTotal}</td>
                      </>
                    ) : (
                      <>
                        <td>{(item as RelatorioSaida).dataSaida}</td>
                        <td>{(item as RelatorioSaida).funcionario.nomeFuncionario}</td>
                        <td>{(item as RelatorioSaida).produto.nomeProduto}</td>
                        <td>{(item as RelatorioSaida).quantidadeProduto}</td>
                        <td>{item.tipo}</td>
                        <td>{"R$ " + item.valorTotal}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Relatorio;

