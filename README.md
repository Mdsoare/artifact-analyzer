# 🛡️ Artifact Analyzer — Client-Side & DevSecOps Hardened

[![CI Pipeline](https://github.com/Mdsoare/artifact-analyzer/actions/workflows/ci-pipeline.yml/badge.svg)](https://github.com/Mdsoare/artifact-analyzer/actions/workflows/ci-pipeline.yml)
[![Deploy to GitHub Pages](https://github.com/Mdsoare/artifact-analyzer/actions/workflows/deploy.yml/badge.svg)](https://github.com/Mdsoare/artifact-analyzer/actions/workflows/deploy.yml)
[![Security Rating](https://img.shields.io/badge/Security-DevSecOps%20Hardened-green?style=flat&logo=github)](https://github.com/Mdsoare/artifact-analyzer/security/code-scanning)
![Security: CSP Compliant](https://img.shields.io/badge/Security-CSP--Compliant-success.svg)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Stylelint](https://img.shields.io/badge/Stylelint-264DE4?style=for-the-badge&logo=stylelint&logoColor=white)
![SAST & SCA](https://img.shields.io/badge/DevSecOps-SAST%20%26%20SCA-red?style=for-the-badge&logo=shield&logoColor=white)

---

Uma ferramenta **100% client-side**, leve e centrada em privacidade para análise de artefatos digitais, triagem forense e inspecção estática de arquivos.

Projetada sob o paradigma **Zero-Trust** e princípios de **Privacy by Design**, a aplicação opera inteiramente no navegador do usuário — **nenhum artefato, log, amostra ou dado pessoal é enviado para servidores externos ou armazenado na rede**.

---

## Demonstração & Live Access

Acesse a versão estável diretamente via GitHub Pages:  
👉 **[https://mdsoare.github.io/artifact-analyzer](https://mdsoare.github.io/artifact-analyzer)**

---

## O Problema e a Solução

Em investigações forenses, resposta a incidentes e auditorias de segurança, o processamento de artefatos sensíveis (logs, dumps, evidências) exige cautela extrema. Enviar amostras não analisadas para ferramentas *online* expõe dados restritos e informações confidenciais a infraestruturas de terceiros.

O **Artifact Analyzer** resolve essa vulnerabilidade ao realizar a extração, análise de assinaturas, cálculo de hashes e parser estático estritamente na memória local do browser, garantindo total isolamento da rede.

---

## Principais Funcionalidades

- 🔍 **Análise Forense Local:** Processamento e extração de metadados de artefatos digitais sem exfiltração de dados.
- ⚡ **Integridade e Hashing:** Validação rápida de integridade de arquivos utilizando APIs nativas do navegador (`Web Crypto API`).
- 📥 **Upload & Drag-and-Drop:** Interface responsiva para submissão simples e ágil de amostras.
- 🧹 **Limpeza Segura de Memória:** Descarte imediato dos buffers de análise locais ao finalizar o processo.
- 🚀 **Build & Bundling Otimizado:** Compilação via Vite com divisão de código, minificação segura e cache busting automatizado.

---

## Tecnologias Utilizadas

- **Vite:** Bundler de alta performance para gerenciamento de assets, servimento em desenvolvimento e geração de build de produção.
- **HTML5 Semantic:** Estrutura focada em acessibilidade e navegação intuitiva.
- **CSS3 Moderno:** Layout responsivo construído com CSS Grid e Flexbox.
- **Vanilla JavaScript (ES6+ Modules):** Manipulação de dados binários em tempo real usando `ArrayBuffer`, `DataView` e `TypedArrays`.

---

## Postura de Segurança (DevSecOps)

O repositório adota uma pipeline rigorosa de DevSecOps integrada ao GitHub Actions, cobrindo SAST, SCA, DAST e validações de integridade:

| Vetor de Risco | Status | Ação / Mitigação Aplicada |
| :--- | :---: | :--- |
| **Data Exfiltration** | 🛡️ Protegido | Processamento 100% Client-Side. Requisições externas não autorizadas bloqueadas por validação rigorosa. |
| **DOM-XSS** | 🛡️ Protegido | Manipulação do DOM usando estritamente APIs puras (`textContent`, `createElement`). |
| **Secret Leakage** | 🛡️ Protegido | Varredura de credenciais e segredos em commits via **TruffleHog** e **Gitleaks**. |
| **Análise Estática (SAST)** | 🛡️ Protegido | Auditoria de código via **CodeQL**, **Semgrep** e **Horusec**. |
| **Gestão de Dependências (SCA)** | 🛡️ Protegido | Análise de vulnerabilidades em dependências usando **npm audit**, **OSV-Scanner** e **Trivy**. |
| **Análise Dinâmica (DAST)** | 🛡️ Protegido | Testes dinâmicos automatizados pós-deploy com **OWASP ZAP** e **Nuclei**. |
| **Linter & Quality** | 🛡️ Protegido | Qualidade de código mantida via ESLint, Stylelint, HTMLHint e markdownlint. |

---

## Como Executar Localmente

### Pré-requisitos

- Node.js (v20+ LTS ou v24)
- NPM

### Passos

1. **Clone o repositório:**

   ```bash
    git clone https://github.com/Mdsoare/artifact-analyzer.git
    cd artifact-analyzer
    ```

2. **Instale as dependências:**

    ```bash
    npm ci
    ```
3. **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```
4. **Acesse a URL exibida no terminal**

    - geralmente `http://localhost:5173/artifact-analyzer/`.

5. **Para gerar a build de produção:**

    ```bash
    npm run build
    ```

---

## 📜 Licença

Este projeto está sob a licença [MIT](LICENSE).

---

*Desenvolvido por **Marcelo Soares** | Especialista em Segurança da Informação e Computação Forense.*