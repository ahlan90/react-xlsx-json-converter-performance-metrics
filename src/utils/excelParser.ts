import * as XLSX from 'xlsx';

export interface ExcelData {
    [key: string]: any; // Permite qualquer coluna com qualquer tipo de valor
}

export const parseExcelFile = (file: File): Promise<ExcelData[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData: ExcelData[] = XLSX.utils.sheet_to_json(worksheet, { 
                    // Remove header e range para ler todas as colunas automaticamente
                    defval: '' // Define valor padrão para células vazias
                });
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => {
            reject(new Error('Erro ao ler o arquivo'));
        };
        
        reader.readAsArrayBuffer(file);
    });
};

export const validateExcelData = (data: ExcelData[]): boolean => {
    return data.length > 0 && data.every(row => 
        Object.keys(row).length > 0 // Verifica se cada linha tem pelo menos uma coluna
    );
};