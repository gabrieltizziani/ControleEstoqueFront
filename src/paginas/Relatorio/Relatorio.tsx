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

  useEffect(() => {
    // Função para buscar a lista de funcionários do servidor
    const fetchFuncionarios = async () => {
      try {
        const response = await axios.get("http://localhost:8080/funcionarios");
        setFuncionarios(response.data); // Atualiza o estado 'funcionarios' com a lista de funcionários
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      }
    };

    // Chama a função de busca quando o componente é montado
    fetchFuncionarios();
  }, []); // A dependência vazia [] indica que este efeito é executado apenas uma vez, quando o componente é montado

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataInicial = formData.get("dataInicial");
    const dataFinal = formData.get("dataFinal");
    const tipo = formData.get("tipo");
  
    const params = { dataInicial, dataFinal };
    if (tipo === "saida") {
      const idFuncionario = formData.get("funcionario");
      if (idFuncionario !== "") { // Verifica se um funcionário foi selecionado
        params.funcionario = idFuncionario;
      }
    }
  
    try {
      const response = await axios.get(`http://localhost:8080/relatorios/${tipo}s`, {
        params: params,
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
      <Sidebar />
      <div className="cabecalhoRelatorio">
        <h1 className="tituloRelatorio">Relatório</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="funcRelatorio">
            <div>
              <label className="form-label"> Data Inicial:</label>
              <input name="dataInicial" type="date" className="form-control" style={{ marginLeft: "50px" }}/>
            </div>
            <div>
              <label className="form-label"> Data Final:</label>
              <input name="dataFinal" type="date" className="form-control" style={{ marginLeft: "60px" }} />
            </div>
            <div>
              <label className="form-label"> Tipo: </label>
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
                <label className="form-label"> Funcionário: </label>
                <select name="funcionario" className="form-control" onChange={handleFuncionarioChange}>
                  <option value="">Todos</option>
                  {funcionarios.map(funcionario => (
                    <option key={funcionario.idFuncionario} value={funcionario.idFuncionario}>{funcionario.nomeFuncionario}</option>
                  ))}
                </select>
              </div>
            )}

            <br />
            <input type="submit" className="btn btn-success" style={{ marginLeft: "260px" }} value="Gerar Relatório" />
          </div>
        </form>
        <hr style={{ marginLeft: "250px" }}/>

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
                      <th scope="col">Quantidade Produto</th>
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
                      <th scope="col">Quantidade Produto</th>
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
