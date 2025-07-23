# Excel to JSON Converter

This project is a React application that allows users to upload .xlsx files and converts all columns from each row into JSON arrays with real-time performance monitoring.

## Features

- 📊 **Dynamic Excel to JSON Conversion**: Reads all columns automatically from Excel files
- ⚡ **Real-time Performance Monitoring**: CPU usage, memory consumption, processing time
- 🎨 **Modern UI**: Responsive design with visual indicators
- 📄 **Data Visualization**: Dynamic table with pagination (50 records per page)
- 💾 **JSON Download**: Export converted data as JSON file

## Project Structure

```
excel-to-json-app
├── src
│   ├── App.tsx                        # Main application entry point
│   ├── components
│   │   ├── FileUpload.tsx             # File upload component
│   │   ├── JsonDisplay.tsx            # JSON data display component
│   │   └── PerformanceMonitor.tsx     # Real-time performance metrics
│   ├── hooks
│   │   └── usePerformanceMonitor.ts   # Performance monitoring hook
│   ├── utils
│   │   └── excelParser.ts             # Excel to JSON conversion function
│   ├── types
│   │   └── index.ts                   # TypeScript type definitions
│   └── index.tsx                      # React application entry point
├── public
│   └── index.html                     # Basic HTML page structure
├── package.json                       # npm configuration
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # Project documentation
```

## Installation

1. Clone the repository:
   ```bash
   git clone <REPOSITORY_URL>
   ```
2. Navigate to the project directory:
   ```bash
   cd excel-to-json-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the application:
   ```bash
   npm start
   ```
2. Access the application in your browser at `http://localhost:3000`.
3. Use the upload component to select an .xlsx file.
4. The file data will be converted and displayed in JSON format with real-time performance metrics.

## Performance Metrics

The application displays the following real-time metrics:

- **CPU Usage**: Percentage, operations count, and execution time
- **Memory Usage**: MB, bytes, and heap percentage
- **Processing Time**: Total time in milliseconds and seconds
- **File Size**: Human-readable format and bytes
- **Records Processed**: Number of converted rows
- **Performance Summary**: Records/second and throughput in KB/s

## Dependencies

- React 18
- TypeScript
- xlsx (SheetJS) for Excel file parsing

## Contributing

Contributions are welcome! Feel free to open issues or pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).