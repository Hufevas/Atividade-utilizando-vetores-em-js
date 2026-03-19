// Vetor de vendas
let vendas = [];
let proximoId = 1;

// Função para formatar data
function formatarData(data) {
    return data.toLocaleString('pt-BR');
}

// Atualizar tabela
function atualizarTabela() {
    const tabela = document.getElementById('tabelaVendas');
    tabela.innerHTML = '';

    if (vendas.length === 0) {
        tabela.innerHTML = `<tr><td colspan="7">Nenhuma venda cadastrada</td></tr>`;
        return;
    }

    vendas.forEach((venda, index) => {
        const linha = document.createElement('tr');

        linha.innerHTML = `
            <td>${venda.id}</td>
            <td>${venda.vendedor}</td>
            <td>R$ ${venda.valor.toFixed(2)}</td>
            <td>R$ ${venda.desconto.toFixed(2)}</td>
            <td>R$ ${venda.valorFinal.toFixed(2)}</td>
            <td>${venda.data}</td>
            <td>
                <button onclick="removerVenda(${index})">Remover</button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

// Cadastrar venda
function cadastrarVenda() {
    const nome = document.getElementById('nome').value.trim();
    const valorInput = document.getElementById('valor').value;

    const valor = parseFloat(valorInput);

    if (nome === '' || isNaN(valor)) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    const desconto = valor * 0.10;
    const valorFinal = valor - desconto;

    const venda = {
        id: proximoId++,
        vendedor: nome,
        valor: valor,
        desconto: desconto,
        valorFinal: valorFinal,
        data: formatarData(new Date())
    };

    vendas.push(venda);

    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';

    atualizarTabela();
}

// Remover venda específica
function removerVenda(index) {
    vendas.splice(index, 1);
    atualizarTabela();
}

// Remover último
function removerUltimo() {
    if (vendas.length === 0) {
        alert('Lista vazia!');
        return;
    }

    vendas.pop();
    atualizarTabela();
}

// Limpar tudo
function limparTudo() {
    if (vendas.length === 0) {
        alert('Lista já está vazia!');
        return;
    }

    if (confirm('Deseja apagar todas as vendas?')) {
        vendas = [];
        atualizarTabela();
    }
}