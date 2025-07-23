import React, { useState } from 'react';
import { ExcelData } from '../types';
import { parseExcelFile } from '../utils/excelParser';

interface FileUploadProps {
    onDataLoaded: (data: ExcelData[]) => void;
    startMonitoring: (fileSize?: number) => { stop: () => void };
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataLoaded, startMonitoring }) => {
    const [fileName, setFileName] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            setIsUploading(true);
            
            const monitor = startMonitoring(file.size);
            
            try {
                const jsonData = await parseExcelFile(file);
                onDataLoaded(jsonData);
                monitor.stop();
                setIsUploading(false);
            } catch (error) {
                console.error('Error processing file:', error);
                monitor.stop();
                setIsUploading(false);
            }
        }
    };

    return (
        <div style={{ 
            padding: '20px', 
            border: '2px dashed #dee2e6', 
            borderRadius: '12px', 
            marginBottom: '20px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center',
            transition: 'all 0.3s ease'
        }}>
            <div style={{ marginBottom: '15px' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '10px' }}>📁</span>
                <h3 style={{ margin: 0, color: '#495057' }}>Excel File Upload</h3>
                <p style={{ color: '#6c757d', margin: '5px 0 0 0' }}>
                    Select an .xlsx file to convert all columns to JSON
                </p>
            </div>
            
            <input 
                type="file" 
                accept=".xlsx" 
                onChange={handleFileChange}
                style={{
                    padding: '10px 20px',
                    border: '2px solid #007bff',
                    borderRadius: '8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
                disabled={isUploading}
            />
            
            {fileName && (
                <div style={{ 
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: '#d4edda',
                    border: '1px solid #c3e6cb',
                    borderRadius: '8px',
                    color: '#155724'
                }}>
                    <strong>✅ File loaded:</strong> {fileName}
                </div>
            )}
            
            {isUploading && (
                <div style={{ 
                    marginTop: '15px',
                    color: '#ff6b35',
                    fontWeight: 'bold'
                }}>
                    🔄 Processing file...
                </div>
            )}
        </div>
    );
};

export default FileUpload;