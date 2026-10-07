let produtos = [

    {
        nome: "Caneca",
        preco: 30,
        categoria: "Casa",
        imagem: "https://tse2.mm.bing.net/th/id/OIP.03dMgyDTNUjUYUHVuTCS7wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
    },

    {
        nome: "Agenda",
        preco: 45,
        categoria: "Papelaria",
        imagem: "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mfb9sfah6zuv2c"
    },

    {
        nome: "Garrafa",
        preco: 50,
        categoria: "Casa",
        imagem: "https://cdn.awsli.com.br/2500x2500/31/31885/produto/209296107/qh060b-7_2_-klgelg.jpg"
    },

    {
        nome: "Caderno",
        preco: 25,
        categoria: "Papelaria",
        imagem: "https://down-br.img.susercontent.com/file/br-11134207-81z1k-mh1xhw0b4004cb"
    }

];


// Elementos dos produtos
let areaProdutos = document.querySelector("#produtos");
let busca = document.querySelector("#busca");


// Elementos do carrinho

let areaCarrinho = document.querySelector("#carrinho");

let totalCarrinho = document.querySelector("#total");

let quantidadeCarrinho = document.querySelector("#quantidadedeCarrinho");


// Recupera o carrinho salvo

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];


// Mostra os produtos

function mostrarProdutos(listaProdutos) {

    areaProdutos.innerHTML = "";

    if (listaProdutos.length === 0) {

        areaProdutos.innerHTML = `
            <p>Nenhum produto encontrado.</p>
        `;

        return;
    }

    listaProdutos.forEach(function(produto) {

        areaProdutos.innerHTML += `
            <div class="card">

                <img src="${produto.imagem}">

                <h2>${produto.nome}</h2>

                <p class="preco">
                    R$ ${produto.preco.toFixed(2)}
                </p>

                <button onclick="adicionarAoCarrinho('${produto.nome}')">
                    Adicionar ao carrinho
                </button>

            </div>
        `;

    });

}


// Mostra os produtos quando a página abre

mostrarProdutos(produtos);


// Busca produtos

busca.addEventListener("input", function() {

    let texto = busca.value.toLowerCase();

    let encontrados = produtos.filter(function(produto) {

        return produto.nome
            .toLowerCase()
            .includes(texto);

    });

    mostrarProdutos(encontrados);

});


// Adiciona produto ao carrinho

function adicionarAoCarrinho(nomeProduto) {

    let produtoEscolhido = produtos.find(function(produto) {

        return produto.nome === nomeProduto;

    });

    carrinho.push(produtoEscolhido);

    // Salva o carrinho

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    atualizarQuantidade();

}


// Mostra o carrinho

function mostrarCarrinho() {

    areaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach(function(produto) {

        areaCarrinho.innerHTML += `
            <div class="item-carrinho">

                <span>${produto.nome}</span>

                <span>
                    R$ ${produto.preco.toFixed(2)}
                </span>

            </div>
        `;

        total = total + produto.preco;

    });


    totalCarrinho.innerHTML =
        "Total: R$ " + total.toFixed(2);


    // Mostra a quantidade de produtos

    if (quantidadeCarrinho) {

        quantidadeCarrinho.innerHTML =
            carrinho.length;

    }

}


// Mostra o carrinho quando a página abre

mostrarCarrinho();

function atualizarQuantidadeCarrinho(){

    quantidadeCarrinho.innerText = carrinho.length;
}

