import React from 'react';

interface PerformanceData {
    memoryUsage: number;
    memoryUsageBytes: number;
    memoryUsagePercent: number;
    processingTime: number;
    isProcessing: boolean;
    cpuUsage: number;
    cpuUsagePercent: number;
    fileSize: number;
}

interface PerformanceMonitorProps {
    data: PerformanceData;
    recordCount?: number;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
    data, 
    recordCount = 0 
}) => {
    const formatBytes = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getMemoryColor = (usage: number) => {
        if (usage > 80) return '#dc3545'; // Vermelho
        if (usage > 50) return '#ffc107';  // Amarelo
        return '#28a745'; // Verde
    };

    const getCpuColor = (usage: number) => {
        if (usage > 50) return '#dc3545'; // Vermelho
        if (usage > 25) return '#ffc107';  // Amarelo
        return '#28a745'; // Verde
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '12px',
            marginBottom: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
        }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '20px',
                borderBottom: '2px solid #dee2e6',
                paddingBottom: '10px'
            }}>
                <span style={{ fontSize: '24px', marginRight: '10px' }}>📊</span>
                <h3 style={{ margin: 0, color: '#495057' }}>Métricas de Performance em Tempo Real</h3>
                {data.isProcessing && (
                    <span style={{
                        marginLeft: 'auto',
                        padding: '4px 12px',
                        backgroundColor: '#ff6b35',
                        color: 'white',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        animation: 'pulse 1.5s infinite'
                    }}>
                        PROCESSANDO...
                    </span>
                )}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                {/* CPU Usage */}
                <div style={{
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', marginRight: '8px' }}>🔄</span>
                        <strong style={{ color: '#6c757d' }}>Uso de CPU</strong>
                    </div>
                    <div style={{ 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        color: getCpuColor(data.cpuUsagePercent || 0),
                        marginBottom: '4px'
                    }}>
                        {data.isProcessing ? `${(data.cpuUsagePercent || 0).toFixed(1)}%` : '0%'}
                    </div>
                    <div style={{ 
                        fontSize: '11px', 
                        color: '#6c757d',
                        marginBottom: '8px'
                    }}>
                        {data.isProcessing 
                            ? `Operações: ${(data.cpuUsage || 0).toFixed(0)} | Tempo: ${(data.cpuUsage / 1000 || 0).toFixed(2)}s` 
                            : 'CPU inativa'
                        }
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${Math.min(data.cpuUsagePercent || 0, 100)}%`,
                            height: '100%',
                            backgroundColor: getCpuColor(data.cpuUsagePercent || 0),
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

                {/* Memory Usage */}
                <div style={{
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', marginRight: '8px' }}>💾</span>
                        <strong style={{ color: '#6c757d' }}>Uso de Memória</strong>
                    </div>
                    <div style={{ 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        color: getMemoryColor(data.memoryUsagePercent || 0),
                        marginBottom: '4px'
                    }}>
                        {(data.memoryUsage || 0).toFixed(2)} MB
                    </div>
                    <div style={{ 
                        fontSize: '11px', 
                        color: '#6c757d',
                        marginBottom: '8px'
                    }}>
                        {formatBytes(data.memoryUsageBytes || 0)} | {(data.memoryUsagePercent || 0).toFixed(1)}% do heap
                    </div>
                    <div style={{
                        width: '100%',
                        height: '8px',
                        backgroundColor: '#e9ecef',
                        borderRadius: '4px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: `${Math.min(data.memoryUsagePercent || 0, 100)}%`,
                            height: '100%',
                            backgroundColor: getMemoryColor(data.memoryUsagePercent || 0),
                            transition: 'width 0.3s ease'
                        }} />
                    </div>
                </div>

                {/* Processing Time */}
                <div style={{
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', marginRight: '8px' }}>⏱️</span>
                        <strong style={{ color: '#6c757d' }}>Tempo de Processamento</strong>
                    </div>
                    <div style={{ 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        color: data.isProcessing ? '#ff6b35' : '#28a745',
                        marginBottom: '4px'
                    }}>
                        {data.isProcessing ? 'Processando...' : `${data.processingTime.toFixed(0)} ms`}
                    </div>
                    <div style={{ 
                        fontSize: '11px', 
                        color: '#6c757d'
                    }}>
                        {data.isProcessing 
                            ? 'Tempo decorrido em processamento'
                            : `${(data.processingTime / 1000).toFixed(2)} segundos total`
                        }
                    </div>
                </div>

                {/* File Size */}
                <div style={{
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', marginRight: '8px' }}>📁</span>
                        <strong style={{ color: '#6c757d' }}>Tamanho do Arquivo</strong>
                    </div>
                    <div style={{ 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        color: '#6c757d',
                        marginBottom: '4px'
                    }}>
                        {formatBytes(data.fileSize)}
                    </div>
                    <div style={{ 
                        fontSize: '11px', 
                        color: '#6c757d'
                    }}>
                        {data.fileSize > 0 ? `${data.fileSize.toLocaleString()} bytes` : 'Nenhum arquivo'}
                    </div>
                </div>

                {/* Records Count */}
                <div style={{
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', marginRight: '8px' }}>📄</span>
                        <strong style={{ color: '#6c757d' }}>Registros Processados</strong>
                    </div>
                    <div style={{ 
                        fontSize: '22px', 
                        fontWeight: 'bold',
                        color: '#17a2b8',
                        marginBottom: '4px'
                    }}>
                        {recordCount.toLocaleString()}
                    </div>
                    <div style={{ 
                        fontSize: '11px', 
                        color: '#6c757d'
                    }}>
                        {recordCount > 0 ? `${recordCount} linhas convertidas` : 'Aguardando processamento'}
                    </div>
                </div>

                {/* Performance Summary */}
                <div style={{
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    gridColumn: 'span 2'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{ fontSize: '16px', marginRight: '8px' }}>⚡</span>
                        <strong style={{ color: '#6c757d' }}>Performance Summary</strong>
                    </div>
                    <div style={{ 
                        fontSize: '18px', 
                        color: '#495057',
                        marginBottom: '4px'
                    }}>
                        {data.processingTime > 0 && recordCount > 0 
                            ? `${(recordCount / (data.processingTime / 1000)).toFixed(0)} registros/segundo`
                            : 'Aguardando processamento...'
                        }
                    </div>
                    <div style={{ 
                        fontSize: '12px', 
                        color: '#6c757d',
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}>
                        <span>Eficiência: {data.processingTime > 0 ? `${(recordCount / data.processingTime * 1000).toFixed(1)} reg/ms` : 'N/A'}</span>
                        <span>Throughput: {data.fileSize > 0 && data.processingTime > 0 ? `${(data.fileSize / 1024 / (data.processingTime / 1000)).toFixed(0)} KB/s` : 'N/A'}</span>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; }
                    50% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default PerformanceMonitor;
