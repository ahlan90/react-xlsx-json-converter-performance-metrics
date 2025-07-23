import { useState, useEffect, useCallback } from 'react';

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

export const usePerformanceMonitor = () => {
    const [performanceData, setPerformanceData] = useState<PerformanceData>({
        memoryUsage: 0,
        memoryUsageBytes: 0,
        memoryUsagePercent: 0,
        processingTime: 0,
        isProcessing: false,
        cpuUsage: 0,
        cpuUsagePercent: 0,
        fileSize: 0
    });

    const startMonitoring = useCallback((fileSize: number = 0) => {
        const startTime = performance.now();
        const startMemory = (performance as any).memory?.usedJSHeapSize || 0;
        const totalMemory = (performance as any).memory?.jsHeapSizeLimit || 4294967296; // 4GB default
        
        setPerformanceData(prev => ({
            ...prev,
            isProcessing: true,
            processingTime: 0,
            fileSize,
            memoryUsageBytes: startMemory,
            memoryUsage: startMemory / 1024 / 1024,
            memoryUsagePercent: (startMemory / totalMemory) * 100
        }));

        // Monitora CPU através de operações matemáticas intensivas e tempo de execução
        let cpuMonitoringInterval: NodeJS.Timeout;
        let operationCount = 0;
        
        const startCpuMonitoring = () => {
            cpuMonitoringInterval = setInterval(() => {
                const cpuStart = performance.now();
                
                // Operação matemática intensiva para simular carga de CPU
                let result = 0;
                const iterations = 50000;
                for (let i = 0; i < iterations; i++) {
                    result += Math.sqrt(Math.random() * 1000) * Math.sin(i) * Math.cos(i);
                }
                
                const cpuEnd = performance.now();
                const cpuTime = cpuEnd - cpuStart;
                operationCount++;
                
                // Calcula uso de CPU baseado no tempo de operação e número de operações
                const baseCpuTime = 2; // tempo base esperado em ms
                const cpuUsagePercent = Math.min((cpuTime / baseCpuTime) * 100, 100);
                const cpuUsageValue = cpuTime * operationCount; // valor numérico representativo
                
                // Pega memória atual
                const currentMemoryBytes = (performance as any).memory?.usedJSHeapSize || 0;
                const currentMemoryMB = currentMemoryBytes / 1024 / 1024;
                const currentMemoryPercent = (currentMemoryBytes / totalMemory) * 100;
                
                setPerformanceData(prev => ({
                    ...prev,
                    cpuUsage: cpuUsageValue,
                    cpuUsagePercent: cpuUsagePercent,
                    memoryUsageBytes: currentMemoryBytes,
                    memoryUsage: currentMemoryMB,
                    memoryUsagePercent: currentMemoryPercent
                }));
            }, 200);
        };

        startCpuMonitoring();

        return {
            stop: () => {
                clearInterval(cpuMonitoringInterval);
                const endTime = performance.now();
                const endMemory = (performance as any).memory?.usedJSHeapSize || 0;
                const totalMemory = (performance as any).memory?.jsHeapSizeLimit || 4294967296;
                const memoryDiff = Math.max(endMemory - startMemory, 0);
                
                setPerformanceData(prev => ({
                    ...prev,
                    memoryUsage: memoryDiff / 1024 / 1024,
                    memoryUsageBytes: endMemory,
                    memoryUsagePercent: (endMemory / totalMemory) * 100,
                    processingTime: endTime - startTime,
                    isProcessing: false,
                    cpuUsage: 0,
                    cpuUsagePercent: 0
                }));
            }
        };
    }, []);

    // Monitora memória em tempo real durante o processamento
    useEffect(() => {
        if (!performanceData.isProcessing) return;

        const interval = setInterval(() => {
            if ((performance as any).memory) {
                const currentMemory = (performance as any).memory.usedJSHeapSize / 1024 / 1024;
                setPerformanceData(prev => ({
                    ...prev,
                    memoryUsage: currentMemory
                }));
            }
        }, 100);

        return () => clearInterval(interval);
    }, [performanceData.isProcessing]);

    return { performanceData, startMonitoring };
};
