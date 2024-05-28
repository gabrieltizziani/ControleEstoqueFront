import Sidebar from "../Sidebar/Sidebar";
import "./Relatorio.css";
import { useState, useEffect } from "react";
import axios from "axios";

function Relatorio() {
  const [relatorio, setRelatorio] = useState([]);
  const [tipoRelatorio, setTipoRelatorio] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState("");
  const [funcionarios, setFuncionarios] = useState([]);
  const token = localStorage.getItem('token');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/funcionarios", {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataInicial = formData.get("dataInicial");
    const dataFinal = formData.get("dataFinal");
    const tipo = formData.get("tipo");

    const params = { dataInicial, dataFinal };
    if (tipo === "saida") {
      const idFuncionario = formData.get("funcionario");
      if (idFuncionario !== "") {
        params.funcionario = idFuncionario;
      }
    }

    try {
      const response = await axios.get(`http://localhost:8080/relatorios/${tipo}s`, {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.entradas && Array.isArray(response.data.entradas)) {
        setRelatorio(response.data.entradas);
        setTipoRelatorio(tipo);
        setValorTotal(response.data.valorTotal.toFixed(2));
      } else if (response.data.saidas && Array.isArray(response.data.saidas)) {
        setRelatorio(response.data.saidas);
        setTipoRelatorio(tipo);
        setValorTotal(response.data.valorTotal.toFixed(2));
      } else {
        console.error("Erro ao obter dados do relatório: Resposta inválida", response.data);
      }
    } catch (error) {
      console.error("Erro ao obter dados do relatório:", error);
    }
  };

  const handleFuncionarioChange = (event) => {
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
              <input name="dataInicial" type="date" className="form-controlI" />
            </div>
            <div>
              <label className="form-labelRel"> Data Final:</label>
              <input name="dataFinal" type="date" className="form-controlF" />
            </div>
            <div>
              <label className="form-labelRel"> Tipo: </label>
              <div>
                <input type="radio" id="entrada" name="tipo" value="entrada" className="form-check-input" style={{ marginLeft: "40px" }}/>
                <label htmlFor="entrada" className="form-check-label">
                  Entrada
                </label>
              </div>
              <div>
                <input type="radio" id="saida" name="tipo" value="saida" className="form-check-input" />
                <label htmlFor="saida" className="form-check-label">
                  Saída
                </label>
              </div>
            </div>
            {tipoRelatorio === "saida" && (
              <div>
                <label className="form-labelRel"> Funcionário: </label>
                <select name="funcionario" className="form-control" onChange={handleFuncionarioChange}>
                  <option value="">Todos</option>
                  {funcionarios.map(funcionario => (
                    <option key={funcionario.idFuncionario} value={funcionario.idFuncionario}>{funcionario.nomeFuncionario}</option>
                  ))}
                </select>
              </div>
            )}

            <br />
            <input type="submit" className="btn btn-success btn-relatorio"  value="Gerar Relatório" />
          </div>
        </form>
        <hr className="linhaRel"/>

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
              {relatorio.map((item) => (
                <tr key={item.id}>
                  {tipoRelatorio === "entrada" ? (
                    <>
                      <td>{item.dataEntrada}</td>
                      <td>{item.produto.nomeProduto}</td>
                      <td>{item.quantidadeProdutoEntrada}</td>
                      <td>{item.tipo}</td>
                      <td>{item.fornecedor}</td>
                      <td>{item.notaFiscal}</td>
                      <td>{"R$ " + item.valorTotal}</td>
                    </>
                  ) : (
                    <>
                      <td>{item.dataSaida}</td>
                      <td>{item.funcionario.nomeFuncionario}</td>
                      <td>{item.produto.nomeProduto}</td>
                      <td>{item.quantidadeProduto}</td>
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
