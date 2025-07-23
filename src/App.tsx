import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import JsonDisplay from './components/JsonDisplay';
import PerformanceMonitor from './components/PerformanceMonitor';
import { ExcelData } from './types';
import { usePerformanceMonitor } from './hooks/usePerformanceMonitor';

const App: React.FC = () => {
    const [jsonData, setJsonData] = useState<ExcelData[]>([]);
    const { performanceData, startMonitoring } = usePerformanceMonitor();

    const handleDataUpload = (data: ExcelData[]) => {
        setJsonData(data);
    };

    return (
        <div style={{ 
            padding: '20px', 
            maxWidth: '1200px', 
            margin: '0 auto',
            backgroundColor: '#ffffff',
            minHeight: '100vh'
        }}>
            <div style={{ 
                textAlign: 'center', 
                marginBottom: '30px',
                borderBottom: '3px solid #007bff',
                paddingBottom: '20px'
            }}>
                <h1 style={{ 
                    color: '#343a40', 
                    fontSize: '2.5rem',
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px'
                }}>
                    <span>📊</span>
                    Excel to JSON Converter
                    <span>📊</span>
                </h1>
                <p style={{ 
                    color: '#6c757d', 
                    fontSize: '1.1rem',
                    margin: '10px 0 0 0'
                }}>
                    Converta arquivos Excel em JSON com monitoramento de performance em tempo real
                </p>
            </div>
            
            <PerformanceMonitor 
                data={performanceData}
                recordCount={jsonData.length}
            />
            
            <FileUpload 
                onDataLoaded={handleDataUpload} 
                startMonitoring={startMonitoring}
            />
            
            <JsonDisplay data={jsonData} />
        </div>
    );
};

export default App;
