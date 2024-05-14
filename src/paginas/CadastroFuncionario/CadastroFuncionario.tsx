import "./CadastroFuncionario.css"
import React, {useEffect, useState, ChangeEvent} from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";


function CadastroFuncionario(){
  const [cadastroFuncionario, setCadastroFuncionario] = useState({nomeFuncionario: "", numeroFuncionario: "", funcaoFuncionario: ""});
  const [cadastrosFuncionarios, setCadastrosFuncionarios] = useState ([]);
  const [atualizar, setAtualizar] = useState();
 
  useEffect(()=>{
    axios.get("http://localhost:8080/funcionarios").then(result =>{
      setCadastrosFuncionarios(result.data);
      
    })
  },[atualizar])

  
  function handleChange(event){
    setCadastroFuncionario({...cadastroFuncionario,[event.target.name]:event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault();
    axios.post("http://localhost:8080/funcionarios", cadastroFuncionario).then(result=>{
      setAtualizar(result) ;
      alert('Funcionário cadastrado com sucesso!');
    })
    .catch(error => {
      console.error('Erro ao cadastrar funcionário:', error);
      alert('Erro ao cadastrar o funcionário. Funcionário com o nome já cadastrado ou está faltando informação.');
    });
  }

  function editar (funcionario){
    axios.put("http://localhost:8080/funcionarios/", cadastroFuncionario).then(result=>{
      setAtualizar(result) ;
    })
  }

  function excluir (idFuncionario){
    axios.delete("http://localhost:8080/funcionarios/" + idFuncionario).then(result=>{
      setAtualizar(result) ;
      alert('Funcionário excluído com sucesso!')
    })
    .catch(error => {
      console.error('Erro ao excluir funcionário:', error);
      alert('Erro ao excluir o funcionário. Verifique se ele está sendo usado em entradas ou saídas.');
    });
  }
  
  
  return (
    <div>
      <Sidebar/>
      <div className="cabecalhoCF">
        <h1 className="tituloCP">Cadastro de Funcionário</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="funcFuncionario">
            <div>
                <label className="form-label"> Nome do Funcionário:</label>
                <input onChange={handleChange} value={cadastroFuncionario.nomeFuncionario} name="nomeFuncionario" type="text" className="form-control"/>
            </div>
            <div>
            <label className="form-label"> Número Funcionário:</label>
                <input onChange={handleChange} value={cadastroFuncionario.numeroFuncionario} name="numeroFuncionario" type="number" className="form-control"/>
            </div>
            <div>
            <label className="form-label"> Função Funcionário:</label>
                <input onChange={handleChange} value={cadastroFuncionario.funcaoFuncionario} name="funcaoFuncionario" type="text" className="form-control"/>
            </div>
            <br/>
            <input type="submit" className="btn btn-success" style={{ marginLeft: "260px" }} value="Cadastrar"></input>
          </div>
        </form>
        <hr className="linha"></hr>
        <table className="table" style={{ marginLeft: "250px" }}>
  <thead>
    <tr>
      <th scope="col">Nome Funcionário</th>
      <th scope="col">Número Funcionário</th>
      <th scope="col">Função Funcionário</th>
      <th scope="col">Opções</th>
    </tr>
  </thead>
  <tbody className="body">
    {cadastrosFuncionarios.map(funcionario => (
        <tr key={funcionario.idFuncionario}>
          <td>{funcionario.nomeFuncionario}</td>
          <td>{funcionario.numeroFuncionario}</td>
          <td>{funcionario.funcaoFuncionario}</td>
          <td>
          <button onClick={()=> setCadastroFuncionario (funcionario)} className="btn btn-warning">Altere Informações</button>
          <button onClick={() => excluir(funcionario.idFuncionario)} className="btn btn-danger">Excluir</button>
          </td>    
        </tr>
    ))}
    
  </tbody>
</table>
      </div>
      
    </div>
  );
}

export default CadastroFuncionario;
