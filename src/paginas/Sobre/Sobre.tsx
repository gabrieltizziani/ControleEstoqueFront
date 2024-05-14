// Sobre.jsx
import "./Sobre.css";

const Sobre = () => {
  return (
    <div className="bodyS">
        <div>
            <h1 className="titulo">Bem Vindo ao Controle de Estoque</h1>
            <p className="bemvindo">Bem-vindo ao nosso aplicativo de controle de estoque! Estamos felizes por você estar aqui. Com nossa ferramenta, você terá o poder de gerenciar seu estoque de forma eficiente, mantendo tudo organizado e sob controle. Seja você um pequeno empresário ou parte de uma grande empresa, estamos aqui para simplificar sua vida e ajudá-lo a alcançar seus objetivos. Explore todas as funcionalidades e não hesite em nos contatar caso precise de suporte. Estamos ansiosos para ajudá-lo a impulsionar seu negócio para o sucesso!</p>
        </div>
        <div className="regras">
        <h3>Regras:</h3>
        <p>Para uma melhor usabilidade, forneceremos uma breve explicação das funções presentes no aplicativo.</p>
        </div>
        <div className="regraFuncio">
              <h6 className="subTitulo">Cadastro de Produto</h6>
              <p>Nesta seção, você cadastrará seus produtos. Certifique-se de preencher todas as informações e evitar duplicatas de nomes de produtos. Para alterações, modifique apenas o preço. Se desejar alterar o nome, verifique se não está em uso em nenhuma entrada ou saída.</p>

              <h6 className="subTitulo">Cadastro de Funcionário</h6>
              <p>Para cadastrar um novo funcionário, preencha todas as informações corretamente e evite nomes duplicados. Para alterações, atualize apenas o número e a função. Se desejar alterar o nome, verifique se não está em uso em nenhuma saída.</p>

              <h6 className="subTitulo">Entrada</h6>
              <p>Para registrar uma entrada, preencha todas as informações necessárias. Para alterar ou excluir uma entrada, selecione a opção desejada.</p>

              <h6 className="subTitulo">Saída</h6>
              <p>Para registrar uma saída, preencha todas as informações necessárias. Para alterar ou excluir uma saída, selecione a opção desejada.</p>

              <h6 className="subTitulo">Relatório</h6>
              <p>Para gerar um relatório, escolha as informações que deseja incluir.</p>

              <h6 className="subTitulo">Quantidade de Produto</h6>
              <p>Nesta seção, você terá a quantidade real em seu almoxarifado. Certifique-se de registrar todas as entradas e saídas para obter uma precisão correta.</p>
        </div>
        <div className="contato">
          <h5>Contato: </h5>
          <p>Você será direcionado ao WhatsApp responsável pelo suporte! Caso não conseguir acessar o QRCode, tente (43) 991742770.</p>
          <img className="contatoqr" src="img/QRcode.jpeg" alt="contato" />
        </div>
        
    </div>
  );
}

export default Sobre;
