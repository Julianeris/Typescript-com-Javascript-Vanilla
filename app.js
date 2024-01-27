var formularioItem = document.getElementById('formularioItem');
var listaItens = document.getElementById('listaItens');
var inputItem = document.getElementById('item');
var carregarItens = function () {
    var itens = localStorage.getItem('itens');
    return itens ? JSON.parse(itens) : [];
};
var salvarItens = function (itens) {
    localStorage.setItem('itens', JSON.stringify(itens));
};
var adicionarItem = function (nome) {
    var itens = carregarItens();
    var novoItem = {
        id: new Date().toISOString(),
        nome: nome
    };
    itens.push(novoItem);
    salvarItens(itens);
};
var removerItem = function (id) {
    var itens = carregarItens();
    var itensAtualizados = itens.filter(function (item) { return item.id !== id; });
    salvarItens(itensAtualizados);
};
var editarItem = function (id, novoNome) {
    var itens = carregarItens();
    var item = itens.find(function (item) { return item.id === id; });
    if (item) {
        item.nome = novoNome;
        salvarItens(itens);
    }
};
var renderizarItens = function () {
    var itens = carregarItens();
    listaItens.innerHTML = '';
    itens.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.nome;
        listaItens.appendChild(listItem);
        listItem.addEventListener('dblclick', function () {
            var novoNome = prompt('Editar item:', item.nome);
            if (novoNome !== null)
                editarItem(item.id, novoNome);
            renderizarItens();
        });
    });
};
formularioItem.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = inputItem.value.trim();
    if (nome) {
        adicionarItem(nome);
        inputItem.value = '';
        renderizarItens();
    }
});
renderizarItens();
