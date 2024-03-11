const produtos = []; // Array para armazenar os produtos

// Função para listar os produtos na tabela
function listarProdutos() {
  const tbody = document.querySelector("#tabela-produtos tbody");
  tbody.innerHTML = "";

  produtos.forEach((produto, indice) => {
    const tr = document.createElement("tr");
    const tdNome = document.createElement("td");
    const tdQuantidade = document.createElement("td");
    const tdCategoria = document.createElement("td");
    const tdPreco = document.createElement("td");
    const tdAcoes = document.createElement("td");

    tdNome.textContent = produto.nome;
    tdQuantidade.textContent = produto.quantidade;
    tdCategoria.textContent = produto.categoria;
    tdPreco.textContent = produto.preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const botaoEditar = document.createElement("button");
    botaoEditar.classList.add("editar");
    botaoEditar.textContent = "Editar";
    botaoEditar.addEventListener("click", () => {
      editarProduto(indice);
    });

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("excluir");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", () => {
      excluirProduto(indice);
    });

    tdAcoes.appendChild(botaoEditar);
    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdNome);
    tr.appendChild(tdQuantidade);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdPreco);
    tr.appendChild(tdAcoes);

    tbody.appendChild(tr);
  });
}

// Função para adicionar um novo produto
function adicionarProduto() {
  const nome = document.querySelector("#nome").value;
  const quantidade = Number(document.querySelector("#quantidade").value);
  const categoria = document.querySelector("#categoria").value;
  const preco = Number(document.querySelector("#preco").value);

  const novoProduto = {
    nome,
    quantidade,
    categoria,
    preco,
  };

  produtos.push(novoProduto);

  listarProdutos();

  limparFormulario();
}

// Função para limpar o formulário
function limparFormulario() {
  document.querySelector("#nome").value = "";
  document.querySelector("#quantidade").value = "";
  document.querySelector("#categoria").value = "";
  document.querySelector("#preco").value = "";
}

// Função para editar um produto
function editarProduto(indice) {
  const produto = produtos[indice];

  document.querySelector("#nome").value = produto.nome;
  document.querySelector("#quantidade").value = produto.quantidade;
  document.querySelector("#categoria").value = produto.categoria;
  document.querySelector("#preco").value = produto.preco;

  document.querySelector("#form-produto").addEventListener("submit", (e) => {
    e.preventDefault();

    produtos[indice] = {
      nome: document.querySelector("#nome").value,
      quantidade: Number(document.querySelector("#quantidade").value),
      categoria: document.querySelector("#categoria").value,
      preco: Number(document.querySelector("#preco").value),
    };

    listarProdutos();

    limparFormulario();
  });
}

// Função para excluir um produto
function excluirProduto(indice) {
  produtos.splice(indice, 1);

  listarProdutos();
}

// Adicionar evento de submit ao formulário
document.querySelector("#form-produto").addEventListener("submit", (e) => {
  e.preventDefault();

  adicionarProduto();
});

// Listar os produtos na tabela
listarProdutos();
