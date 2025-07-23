# Excel to JSON App

Este projeto é uma aplicação React que permite ao usuário fazer upload de arquivos no formato .xlsx e converte cada linha do arquivo em um array de objetos JSON. Cada objeto contém duas propriedades: `cod_pdv` e `cod_s4`.

## Estrutura do Projeto

```
excel-to-json-app
├── src
│   ├── App.tsx                # Ponto de entrada do aplicativo
│   ├── components
│   │   ├── FileUpload.tsx     # Componente para upload de arquivos
│   │   └── JsonDisplay.tsx     # Componente para exibir dados em JSON
│   ├── utils
│   │   └── excelParser.ts      # Função para converter .xlsx em JSON
│   ├── types
│   │   └── index.ts            # Tipos TypeScript para os dados
│   └── index.tsx               # Ponto de entrada da aplicação React
├── public
│   └── index.html              # Estrutura básica da página HTML
├── package.json                 # Configuração do npm
├── tsconfig.json               # Configuração do TypeScript
└── README.md                   # Documentação do projeto
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```
   cd excel-to-json-app
   ```
3. Instale as dependências:
   ```
   npm install
   ```

## Uso

1. Inicie a aplicação:
   ```
   npm start
   ```
2. Acesse a aplicação no seu navegador em `http://localhost:3000`.
3. Utilize o componente de upload para selecionar um arquivo .xlsx.
4. Os dados do arquivo serão convertidos e exibidos em formato JSON.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.