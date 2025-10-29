
# 🧾 Sistema de Consulta de Certidão Negativa — Monte Santo de Minas

## 📘 Descrição Geral
O sistema tem como objetivo **automatizar a consulta de certidões negativas** no site da Prefeitura de Monte Santo de Minas (MG).  
Ele foi desenvolvido para auxiliar empresas e escritórios contábeis a verificarem se há **débitos municipais** associados a um determinado CNPJ, de forma rápida e prática.

A aplicação utiliza **Node.js com Playwright** para interagir diretamente com o portal da prefeitura, automatizando todo o processo exceto a resolução do **CAPTCHA**, que permanece manual para manter a conformidade legal.

---

## ⚙️ Funcionalidades Principais

1. **Acesso automático** à página de emissão de certidão negativa da prefeitura.  
2. **Seleção automática** da opção de consulta por CNPJ.  
3. **Preenchimento automático** do número do CNPJ informado.  
4. **Intervenção humana** apenas na etapa de digitação do CAPTCHA.  
5. **Envio do formulário** e captura do resultado da consulta.  
6. **Identificação do status da certidão** (“Negativa”, “Positiva” ou “Com efeitos de negativa”).  
7. **(Opcional)** Captura do link para download do PDF da certidão.

---

## 🧩 Tecnologias Utilizadas
- **Node.js** — Ambiente de execução JavaScript.  
- **Playwright** — Framework para automação de browsers.  
- **JavaScript (ES6+)** — Linguagem principal do projeto.  
- **Terminal / Console** — Interface para execução e exibição dos resultados.

---

## 🔒 Conformidade e Ética
O sistema **não burla captchas** e respeita totalmente os **termos de uso do site da prefeitura**.  
A digitação manual do captcha é realizada pelo operador humano, garantindo que o processo permaneça **100% legal e ético**.

---

## 🚀 Como Utilizar

1. Instale as dependências:
   ```bash
   npm init -y
   npm install playwright
   ```

2. Salve o script como `consultaCertidao.js`.

3. Execute o comando:
   ```bash
   node consultaCertidao.js
   ```

4. O navegador abrirá automaticamente:
   - O sistema preencherá o CNPJ;
   - Você deverá **digitar o CAPTCHA manualmente**;
   - Clique em **“Imprimir”** para gerar a certidão.

5. O script exibirá o resultado da consulta no console e informará se existe um **link para download do PDF**.

---

## 🧠 Possíveis Extensões Futuras
- Interface web simples para entrada de múltiplos CNPJs.  
- Salvamento automático das certidões (PDFs) em uma pasta local.  
- Geração de relatórios em JSON/CSV com o status das consultas.  
- Integração com API oficial da prefeitura (caso venha a ser disponibilizada).

---

## 👨‍💻 Autor
**Desenvolvido por:** Gustavo Gonçalves dos Santos  
**Data:** Outubro de 2025  
**Tecnologia:** Node.js + Playwright  
**Propósito:** Consulta automatizada de certidões negativas municipais.
