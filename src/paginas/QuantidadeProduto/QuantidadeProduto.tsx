import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './QuantidadeProduto.css';

function QuantidadeProduto() {
    const [produtos, setProdutos] = useState([]);
    const [dadosProduto, setDadosProduto] = useState({}); // Modificado para armazenar quantidade e valor
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch("http://localhost:8080/produtos");
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                setError('Erro ao buscar produtos');
            }
        };

        fetchProdutos();
    }, []);

    useEffect(() => {
        const getQuantidadesReais = async () => {
            const newDadosProduto = {};

            try {
                const promises = produtos.map(async (produto) => {
                    const response = await fetch(`http://localhost:8080/quantidadeReal/${produto.idProduto}`);
                    const data = await response.json();
                    newDadosProduto[produto.idProduto] = {
                        quantidade: data.quantidadeReal,
                        valor: data.valorProduto
                    };
                });

                await Promise.all(promises);
                setDadosProduto(newDadosProduto);
                setLoading(false);
            } catch (error) {
                setError('Erro ao buscar quantidade real');
            }
        };

        getQuantidadesReais();
    }, [produtos]);

    return (
        <div>
            <Sidebar />
            <div className="cabecalhoQuant">
                <h1 className="tituloQuant">Saldo Estoque</h1>
            </div>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
                <div className="tabela-container">
                    <table className="tableQ">
                        <thead>
                            <tr>
                            <th>Nome do Produto</th>
                            <th>Quantidade no Estoque</th>
                            <th>Valor Total</th> {/* Adicionado */}
                            </tr>
                        </thead>
                        <tbody>
                        {produtos.map((produto, index) => (
                            <tr key={index}>
                            <td>{produto.nomeProduto}</td>
                            <td className='quant'>{dadosProduto[produto.idProduto]?.quantidade}</td>
                            <td className='valor'>{"R$ "+ dadosProduto[produto.idProduto]?.valor}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default QuantidadeProduto;
