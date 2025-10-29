const { chromium } = require('playwright');

async function consultarCertidao(cnpj) {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    
    try {
        console.log('🚀 Iniciando consulta de certidão negativa...');
        console.log(`📋 CNPJ: ${cnpj}`);
        
        // Acessa a página da prefeitura
        await page.goto('https://servicos.cloud.el.com.br/mg-montesantodeminas-pm/services/certidao_retirada.php');
        
        // Aguarda a página carregar
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(3000);
        
        // Tenta encontrar e selecionar a opção CNPJ
        console.log('🔍 Procurando opção CNPJ...');
        
        const cnpjSelectors = [
            '#cgc',
            'input[name="set_tipo"][value="cgc"]',
            'input[id="cgc"]'
        ];
        
        let cnpjSelected = false;
        for (const selector of cnpjSelectors) {
            try {
                await page.check(selector, { timeout: 2000 });
                console.log('✅ Opção CNPJ selecionada');
                cnpjSelected = true;
                // Aguarda o campo ser habilitado após selecionar CGC
                await page.waitForTimeout(1000);
                break;
            } catch (error) {
                continue;
            }
        }
        
        if (!cnpjSelected) {
            console.log('⚠️ Não foi possível selecionar CNPJ automaticamente');
        }
        
        // Tenta preencher o campo do documento
        console.log('📝 Preenchendo CNPJ...');
        
        const documentSelectors = [
            '#codigo',
            'input[name="codigo"]',
            'input[id="codigo"]'
        ];
        
        let cnpjFilled = false;
        for (const selector of documentSelectors) {
            try {
                console.log(`🔍 Tentando preencher com seletor: ${selector}`);
                await page.waitForSelector(selector, { state: 'visible', timeout: 3000 });
                
                // Limpa o campo primeiro
                await page.fill(selector, '');
                await page.waitForTimeout(500);
                
                // Preenche o CNPJ
                await page.fill(selector, cnpj);
                
                // Verifica se foi preenchido
                const value = await page.inputValue(selector);
                console.log(`📝 Valor no campo: ${value}`);
                
                if (value === cnpj) {
                    console.log('✅ CNPJ preenchido automaticamente');
                    cnpjFilled = true;
                    break;
                } else {
                    // Tenta com type ao invés de fill
                    await page.click(selector);
                    await page.keyboard.press('Control+a');
                    await page.keyboard.type(cnpj);
                    
                    const newValue = await page.inputValue(selector);
                    if (newValue === cnpj) {
                        console.log('✅ CNPJ preenchido com type');
                        cnpjFilled = true;
                        break;
                    }
                }
            } catch (error) {
                console.log(`⚠️ Erro com seletor ${selector}: ${error.message}`);
                continue;
            }
        }
        
        if (!cnpjFilled) {
            console.log('⚠️ Não foi possível preencher CNPJ automaticamente');
            console.log('📋 Por favor, preencha manualmente o CNPJ:', cnpj);
        }
        
        console.log('🔐 Por favor, digite o CAPTCHA manualmente e clique em "Imprimir"');
        
        // Aguarda o usuário resolver o CAPTCHA e submeter
        await page.waitForNavigation({ timeout: 300000 }); // 5 minutos
        
        // Verifica o resultado
        const resultado = await verificarResultado(page);
        console.log('📄 Resultado da consulta:', resultado);
        
        return resultado;
        
    } catch (error) {
        console.error('❌ Erro durante a consulta:', error.message);
        throw error;
    } finally {
        await browser.close();
    }
}

async function verificarResultado(page) {
    // Aguarda o resultado aparecer
    await page.waitForTimeout(2000);
    
    const pageContent = await page.content();
    
    if (pageContent.includes('CERTIDÃO NEGATIVA') || pageContent.includes('Certidão Negativa')) {
        return { status: 'NEGATIVA', descricao: 'Não há débitos municipais' };
    } else if (pageContent.includes('CERTIDÃO POSITIVA') || pageContent.includes('Certidão Positiva')) {
        return { status: 'POSITIVA', descricao: 'Existem débitos municipais' };
    } else if (pageContent.includes('COM EFEITOS DE NEGATIVA')) {
        return { status: 'COM_EFEITOS_NEGATIVA', descricao: 'Débitos parcelados ou suspensos' };
    } else {
        return { status: 'INDETERMINADO', descricao: 'Não foi possível determinar o status' };
    }
}

// Execução principal
async function main() {
    const cnpj = process.argv[2];
    
    if (!cnpj) {
        console.log('❌ Por favor, informe o CNPJ como parâmetro');
        console.log('📝 Uso: node consultaCertidao.js 12.345.678/0001-90');
        process.exit(1);
    }
    
    try {
        const resultado = await consultarCertidao(cnpj);
        console.log('\n📊 RESULTADO FINAL:');
        console.log(`Status: ${resultado.status}`);
        console.log(`Descrição: ${resultado.descricao}`);
    } catch (error) {
        console.error('💥 Falha na execução:', error.message);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = { consultarCertidao };