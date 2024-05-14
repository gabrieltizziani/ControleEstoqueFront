import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './QuantidadeProduto.css';

function QuantidadeProduto() {
    const [produtos, setProdutos] = useState([]);
    const [quantidadeReal, setQuantidadeReal] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        try {
            const response = await fetch("http://localhost:8080/produtos");
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        const getQuantidadeReal = async () => {
            const newQuantidadeReal: { [key: string]: number } = {};
            for (const produto of produtos) {
                try {
                    const response = await fetch(`http://localhost:8080/quantidadeReal/${produto.idProduto}`);
                    const data = await response.json();
                    newQuantidadeReal[produto.idProduto] = data;
                } catch (error) {
                    console.error('Erro ao buscar quantidade real:', error);
                    newQuantidadeReal[produto.idProduto] = null;
                }
            }
            setQuantidadeReal(newQuantidadeReal);
        };
        getQuantidadeReal();
    }, [produtos]);

    return (
        <div>
            <Sidebar />
            <div className="cabecalhoQuant">
                <h1 className="tituloQuant">Quantidade Produto</h1>
            </div>
            <div className="tabela-container">
                <table className="tableQ">
                    <thead>
                        <tr>
                            <th>Nome do Produto</th>
                            <th>Quantidade no Estoque</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto, index) => (
                            <tr key={index}>
                                <td>{produto.nomeProduto}</td>
                                <td className='quant'>{quantidadeReal[produto.idProduto] }</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default QuantidadeProduto;
