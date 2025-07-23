import React, { useState } from 'react';
import { ExcelData } from '../types';

interface JsonDisplayProps {
    data: ExcelData[];
}

const JsonDisplay: React.FC<JsonDisplayProps> = ({ data }) => {
    const [showRawJson, setShowRawJson] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12; // Reduzido para melhor visualização dos cards

    const handleSave = (index: number, item: ExcelData) => {
        console.log('Saving PDV:', index, item);
        // Aqui você pode implementar a lógica de salvamento
        alert(`PDV ${index + 1} saved successfully!`);
    };

    const handleValidate = (index: number, item: ExcelData) => {
        console.log('Validating PDV:', index, item);
        // Aqui você pode implementar a lógica de validação
        alert(`PDV ${index + 1} validated successfully!`);
    };

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
                <h3 style={{ color: '#6c757d', margin: 0 }}>No data to display</h3>
                <p style={{ color: '#9ba2ab', margin: '5px 0 0 0' }}>
                    Upload an Excel file to see the data here
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
        a.download = 'converted_data.json';
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
                        Converted Data ({data.length} records)
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
                        {showRawJson ? '🗃️ Show Cards' : '📄 Show JSON'}
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
                        {/* Cards Grid Layout */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                            gap: '20px',
                            marginBottom: '20px'
                        }}>
                            {currentData.map((item, index) => {
                                const globalIndex = startIndex + index;
                                const columns = Object.keys(item);
                                
                                return (
                                    <div 
                                        key={globalIndex} 
                                        style={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e9ecef',
                                            borderRadius: '12px',
                                            padding: '20px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                            position: 'relative',
                                            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                                        }}
                                    >
                                        {/* Header do Card com ID e Botões */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '15px',
                                            paddingBottom: '10px',
                                            borderBottom: '2px solid #e9ecef'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}>
                                                <span style={{ fontSize: '20px' }}>🏪</span>
                                                <h3 style={{
                                                    margin: 0,
                                                    color: '#495057',
                                                    fontSize: '18px',
                                                    fontWeight: 'bold'
                                                }}>
                                                    PDV #{globalIndex + 1}
                                                </h3>
                                            </div>
                                            
                                            {/* Botões Salvar e Validar */}
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleSave(globalIndex, item)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        backgroundColor: '#28a745',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        transition: 'background-color 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#218838';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#28a745';
                                                    }}
                                                >
                                                    💾 Save
                                                </button>
                                                <button
                                                    onClick={() => handleValidate(globalIndex, item)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        backgroundColor: '#007bff',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: 'bold',
                                                        transition: 'background-color 0.2s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#0056b3';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#007bff';
                                                    }}
                                                >
                                                    ✅ Validate
                                                </button>
                                            </div>
                                        </div>

                                        {/* Grid de Informações */}
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                                            gap: '12px'
                                        }}>
                                            {columns.map((column) => (
                                                <div 
                                                    key={column}
                                                    style={{
                                                        padding: '8px',
                                                        backgroundColor: '#f8f9fa',
                                                        borderRadius: '6px',
                                                        border: '1px solid #e9ecef'
                                                    }}
                                                >
                                                    <div style={{
                                                        fontSize: '11px',
                                                        fontWeight: 'bold',
                                                        color: '#6c757d',
                                                        marginBottom: '4px',
                                                        textTransform: 'uppercase',
                                                        letterSpacing: '0.5px'
                                                    }}>
                                                        {column}
                                                    </div>
                                                    <div style={{
                                                        fontSize: '14px',
                                                        color: '#495057',
                                                        fontWeight: '500',
                                                        wordBreak: 'break-word'
                                                    }}>
                                                        {item[column] || '-'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
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
                                    ← Previous
                                </button>
                                
                                <span style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '6px',
                                    color: '#495057'
                                }}>
                                    Page {currentPage} of {totalPages}
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
                                    Next →
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