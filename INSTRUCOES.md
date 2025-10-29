# 📋 Instruções de Uso

## 🚀 Como executar

1. **Instalar dependências** (apenas na primeira vez):
   ```bash
   npm install
   ```

2. **Executar consulta**:
   ```bash
   npm start 12.345.678/0001-90
   ```
   ou
   ```bash
   node consultaCertidao.js 12.345.678/0001-90
   ```

## 🔄 Processo de execução

1. O navegador abrirá automaticamente
2. O sistema preencherá o CNPJ automaticamente
3. **VOCÊ DEVE** digitar o CAPTCHA manualmente
4. Clique em "Imprimir" para gerar a certidão
5. O resultado será exibido no console

## 📊 Possíveis resultados

- **NEGATIVA**: Não há débitos municipais
- **POSITIVA**: Existem débitos municipais  
- **COM_EFEITOS_NEGATIVA**: Débitos parcelados ou suspensos
- **INDETERMINADO**: Não foi possível determinar o status

## ⚠️ Observações importantes

- O CAPTCHA deve ser resolvido manualmente (conformidade legal)
- Aguarde até 5 minutos para resolver o CAPTCHA
- Certifique-se de ter conexão com a internet
- O navegador permanecerá aberto durante o processo