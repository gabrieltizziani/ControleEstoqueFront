import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './QuantidadeProduto.css';

interface Produto {
    idProduto: number;
    nomeProduto: string;
}

interface DadosProduto {
    [idProduto: number]: {
        quantidade: number;
        valor: number;
    };
}

function QuantidadeProduto() {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [dadosProduto, setDadosProduto] = useState<DadosProduto>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchProdutos = async () => {
            try {
                const response = await fetch("http://13.58.105.88:8080/produtos", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Erro ao buscar produtos');
                }

                const data = await response.json();
                setProdutos(data);
            } catch (error: any) {
                setError(error.message || 'Erro ao buscar produtos');
            }
        };

        fetchProdutos();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const getQuantidadesReais = async () => {
            const newDadosProduto: DadosProduto = {};

            try {
                const promises = produtos.map(async (produto) => {
                    const response = await fetch(`http://13.58.105.88:8080/quantidadeReal/${produto.idProduto}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao buscar quantidade real');
                    }

                    const data = await response.json();
                    newDadosProduto[produto.idProduto] = {
                        quantidade: parseFloat(data.quantidadeReal.toFixed(2)),
                        valor: parseFloat(data.valorProduto.toFixed(2))
                    };
                });

                await Promise.all(promises);
                setDadosProduto(newDadosProduto);
            } catch (error: any) {
                setError(error.message || 'Erro ao buscar quantidade real');
            } finally {
                setLoading(false);
            }
        };

        if (produtos.length > 0) {
            getQuantidadesReais();
        }
    }, [produtos]);

    return (
        <div>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <Sidebar isOpen={isSidebarOpen} />
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
                                <th>Valor Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto) => (
                                <tr key={produto.idProduto}>
                                    <td>{produto.nomeProduto}</td>
                                    <td className='quant'>
                                        {dadosProduto[produto.idProduto]?.quantidade.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}
                                    </td>
                                    <td className='valor'>
                                        {"R$ " + dadosProduto[produto.idProduto]?.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
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
