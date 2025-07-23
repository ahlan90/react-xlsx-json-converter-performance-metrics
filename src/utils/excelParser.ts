import * as XLSX from 'xlsx';

export interface ExcelData {
    [key: string]: any; // Allows any column with any type of value
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
                    // Remove header and range to read all columns automatically
                    defval: '' // Sets default value for empty cells
                });
                resolve(jsonData);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => {
            reject(new Error('Error reading file'));
        };
        
        reader.readAsArrayBuffer(file);
    });
};

export const validateExcelData = (data: ExcelData[]): boolean => {
    return data.length > 0 && data.every(row => 
        Object.keys(row).length > 0 // Checks if each row has at least one column
    );
};