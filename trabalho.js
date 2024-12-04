const prompt = require("prompt-sync")();
const fs = require("fs");
teste github
const modelos = [];
const marcas = [];
const memorias = [];
const precosCusto = [];
const precosVenda = [];

// Gravar dados no arquivo
function gravaDados() {
    const celulares = [];
    for (let i = 0; i < modelos.length; i++) {
        celulares.push(modelos[i] + ";" + marcas[i] + ";" + memorias[i] + ";" + precosCusto[i] + ";" + precosVenda[i]);
    }
    fs.writeFileSync("celulares.txt", celulares.join("\n"));
    console.log("Lista de Celulares Salva com Sucesso...");
}

// Carregar dados do arquivo
function obtemDados() {
    if (fs.existsSync("celulares.txt")) {
        const celulares = fs.readFileSync("celulares.txt", "utf-8").split("\n");
        for (let i = 0; i < celulares.length; i++) {
            const partes = celulares[i].split(";");
            if (partes.length === 5) {
                modelos.push(partes[0]);
                marcas.push(partes[1]);
                memorias.push(Number(partes[2]));
                precosCusto.push(Number(partes[3]));
                precosVenda.push(Number(partes[4]));
            }
        }
    }
}

function titulo(texto) {
    console.log();
    console.log(texto);
    console.log("=".repeat(40));
}

// Incluir novos produtos
function inclusao() {
    titulo("Cadastro de Celulares");
    const x = prompt("Modelo......: ");
    const y = prompt("Marca........: ");
    const w = Number(prompt("Memória (GB).......: "));
    const z = Number(prompt("Preço de Custo R$..: "));
    const c = Number(prompt("Preço de Venda R$..: "));
    modelos.push(x);
    marcas.push(y);
    memorias.push(w);
    precosCusto.push(z);
    precosVenda.push(c);
    console.log("\nOk! Celular Cadastrado com Sucesso...");
}

// Listar todos os produtos
function listagem() {
    titulo("Lista dos Celulares Cadastrados");
    if (modelos.length === 0) {
        console.log("Nenhum celular cadastrado.");
        return;
    }
    console.log("Nº Modelo.............: Marca....: Memória(GB)..: Custo R$: Venda R$: Margem %:");
    console.log("------------------------------------------------------------------------");

    for (let i = 0; i < modelos.length; i++) {
        const margemLucro = ((precosVenda[i] - precosCusto[i]) / precosCusto[i]) * 100;
        console.log(
            `${String(i + 1).padStart(2)} ${modelos[i].padEnd(20)} ${marcas[i].padEnd(
                10
            )} ${String(memorias[i]).padStart(8)} ${precosCusto[i]
                .toLocaleString("pt-br", { minimumFractionDigits: 2 })
                .padStart(10)} ${precosVenda[i]
                    .toLocaleString("pt-br", { minimumFractionDigits: 2 })
                    .padStart(10)} ${margemLucro.toFixed(2).padStart(8)}%`
        );
    }
    console.log("------------------------------------------------------------------------");
}

// Pesquisar por marca
function pesquisarPorMarca() {
    titulo("Pesquisa de Celulares por Marca");
    const marcaPesquisa = prompt("Informe a Marca: ").toUpperCase();
    let encontrado = false;
    console.log("Nº Modelo.............: Marca....: Memória (GB): Custo R$: Venda R$: Margem %:");
    console.log("------------------------------------------------------------------------");
    for (let i = 0; i < modelos.length; i++) {
        if (marcas[i].toUpperCase() === marcaPesquisa) {
            const margemLucro = ((precosVenda[i] - precosCusto[i]) / precosCusto[i]) * 100;
            console.log(
                `${String(i + 1).padStart(2)} ${modelos[i].padEnd(20)} ${marcas[i].padEnd(
                    10
                )} ${String(memorias[i]).padStart(8)} ${precosCusto[i]
                    .toLocaleString("pt-br", { minimumFractionDigits: 2 })
                    .padStart(10)} ${precosVenda[i]
                        .toLocaleString("pt-br", { minimumFractionDigits: 2 })
                        .padStart(10)} ${margemLucro.toFixed(2).padStart(8)}%`
            );
            encontrado = true;
        }
    }
    if (!encontrado) {
        console.log("Nenhum celular encontrado para a marca informada.");
    }
    console.log("------------------------------------------------------------------------");
}

// Agrupar por margem de lucro
function agruparPorMargemLucro() {
    titulo("Celulares Agrupados por Margem de Lucro (Maior para Menor)");

    if (modelos.length === 0) {
        console.log("Nenhum celular cadastrado.");
        return;
    }

    // Construir o array de celulares manualmente com um loop for
    const celulares = [];
    for (let i = 0; i < modelos.length; i++) {
        celulares.push({
            modelo: modelos[i],
            marca: marcas[i],
            memoria: memorias[i],
            precoCusto: precosCusto[i],
            precoVenda: precosVenda[i],
            margemLucro: ((precosVenda[i] - precosCusto[i]) * 100) / precosCusto[i],
        });
    }

    // Ordenar os celulares por margem de lucro, do maior para o menor
    celulares.sort((a, b) => b.margemLucro - a.margemLucro);

    console.log("Nº Modelo.............: Marca....: Memória (GB): Custo R$: Venda R$: Margem %:");
    console.log("------------------------------------------------------------------------");

    for (let i = 0; i < celulares.length; i++) {
        const celular = celulares[i];
        console.log(
            `${String(i + 1).padStart(2)} ${celular.modelo.padEnd(20)} ${celular.marca.padEnd(
                10
            )} ${String(celular.memoria).padStart(8)} ${celular.precoCusto
                .toLocaleString("pt-br", { minimumFractionDigits: 2 })
                .padStart(10)} ${celular.precoVenda
                    .toLocaleString("pt-br", { minimumFractionDigits: 2 })
                    .padStart(10)} ${celular.margemLucro.toFixed(2).padStart(8)}%`
        );
    }
    console.log("------------------------------------------------------------------------");
}

// Alterar produto
function alterarProduto() {
    titulo("Alteração de Produto");
    const indice = Number(prompt("Informe o número do produto que deseja alterar: ")) - 1;
    if (indice >= 0 && indice < modelos.length) {
        console.log("Produto Atual:");
        console.log(`Modelo: ${modelos[indice]}, Marca: ${marcas[indice]}`);
        console.log(`Memória: ${memorias[indice]}GB`);
        console.log(`Preço de Custo: R$${precosCusto[indice].toFixed(2)}`);
        console.log(`Preço de Venda: R$${precosVenda[indice].toFixed(2)}`);
        modelos[indice] = prompt("Alterar Modelo: ") || modelos[indice];
        marcas[indice] = prompt("Alterar Marca: ") || marcas[indice];
        memorias[indice] =
            Number(prompt("Alterar Memória (GB): ")) || memorias[indice];
        precosCusto[indice] =
            Number(prompt("Alterar Preço de Custo R$: ")) || precosCusto[indice];
        precosVenda[indice] =
            Number(prompt("Alterar Preço de Venda R$: ")) || precosVenda[indice];
        console.log("\nProduto alterado com sucesso!");
    } else {
        console.log("Número inválido.");
    }
}


// Excluir produto
function excluirProduto() {
    titulo("Exclusão de Produto");
    const indice = Number(prompt("Informe o número do produto que deseja excluir: ")) - 1;
    if (indice >= 0 && indice < modelos.length) {
        console.log(`Produto "${modelos[indice]}" excluído com sucesso.`);
        modelos.splice(indice, 1);
        marcas.splice(indice, 1);
        memorias.splice(indice, 1);
        precosCusto.splice(indice, 1);
        precosVenda.splice(indice, 1);
    } else {
        console.log("Número inválido.");
    }
}

// Programa principal
obtemDados();
do {
    titulo("Loja de Celulares");
    console.log("1. Incluir Celulares");
    console.log("2. Listar Celulares");
    console.log("3. Pesquisar por Marca");
    console.log("4. Agrupar por Margem de Lucro (Maior para Menor)");
    console.log("5. Alterar Produto");
    console.log("6. Excluir Produto");
    console.log("7. Finalizar");

    const opcao = Number(prompt("Opção: "));
    if (opcao === 1) {
        inclusao();
    } else if (opcao === 2) {
        listagem();
    } else if (opcao === 3) {
        pesquisarPorMarca();
    } else if (opcao === 4) {
        agruparPorMargemLucro();
    } else if (opcao === 5) {
        alterarProduto();
    } else if (opcao === 6) {
        excluirProduto();
    } else if (opcao === 7) {
        break; 
    } else {
        console.log("Opção inválida.");
    }
} while (true);


gravaDados();


