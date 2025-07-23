import React, { useState } from 'react';
import { ExcelData } from '../types';

interface JsonDisplayProps {
    data: ExcelData[];
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data }) => {
    const [showRawJson, setShowRawJson] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    if (data.length === 0) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                border: '2px dashed #dee2e6'
            }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '15px' }}>📄</span>
                <h3 style={{ color: '#6c757d', margin: 0 }}>Nenhum dado para exibir</h3>
                <p style={{ color: '#9ba2ab', margin: '5px 0 0 0' }}>
                    Faça upload de um arquivo Excel para ver os dados aqui
                </p>
            </div>
        );
    }

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const downloadJson = () => {
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dados_convertidos.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e9ecef',
            overflow: 'hidden',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
            <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #e9ecef',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px' }}>📊</span>
                    <h2 style={{ margin: 0, color: '#495057' }}>
                        Dados Convertidos ({data.length} registros)
                    </h2>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                        onClick={() => setShowRawJson(!showRawJson)}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: showRawJson ? '#28a745' : '#6c757d',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        {showRawJson ? '📋 Mostrar Tabela' : '📄 Mostrar JSON'}
                    </button>
                    
                    <button
                        onClick={downloadJson}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 'bold'
                        }}
                    >
                        💾 Download JSON
                    </button>
                </div>
            </div>

            <div style={{ padding: '20px' }}>
                {showRawJson ? (
                    <pre style={{
                        backgroundColor: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef',
                        overflow: 'auto',
                        maxHeight: '500px',
                        fontSize: '12px',
                        lineHeight: 1.4,
                        margin: 0
                    }}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                ) : (
                    <>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                fontSize: '14px'
                            }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#e9ecef' }}>
                                        <th style={{
                                            padding: '12px',
                                            textAlign: 'left',
                                            borderBottom: '2px solid #dee2e6',
                                            color: '#495057',
                                            fontWeight: 'bold'
                                        }}>
                                            #
                                        </th>
                                        {data.length > 0 && Object.keys(data[0]).map((column) => (
                                            <th key={column} style={{
                                                padding: '12px',
                                                textAlign: 'left',
                                                borderBottom: '2px solid #dee2e6',
                                                color: '#495057',
                                                fontWeight: 'bold'
                                            }}>
                                                {column}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentData.map((item, index) => (
                                        <tr 
                                            key={startIndex + index} 
                                            style={{
                                                borderBottom: '1px solid #e9ecef'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f8f9fa';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'transparent';
                                            }}
                                        >
                                            <td style={{
                                                padding: '12px',
                                                color: '#6c757d',
                                                fontWeight: 'bold'
                                            }}>
                                                {startIndex + index + 1}
                                            </td>
                                            {Object.keys(item).map((column) => (
                                                <td key={column} style={{
                                                    padding: '12px',
                                                    color: '#495057'
                                                }}>
                                                    {item[column] || '-'}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {totalPages > 1 && (
                            <div style={{
                                marginTop: '20px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: currentPage === 1 ? '#e9ecef' : '#007bff',
                                        color: currentPage === 1 ? '#6c757d' : 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    ← Anterior
                                </button>
                                
                                <span style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '6px',
                                    color: '#495057'
                                }}>
                                    Página {currentPage} de {totalPages}
                                </span>
                                
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    style={{
                                        padding: '8px 12px',
                                        backgroundColor: currentPage === totalPages ? '#e9ecef' : '#007bff',
                                        color: currentPage === totalPages ? '#6c757d' : 'white',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                                    }}
                                >
                                    Próxima →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default JsonDisplay;