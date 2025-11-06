const products = [
  { id: "fonte1", name: "Fonte 1", price: 505, img: "produtos/fonte.webp", desc: "Fonte de alimentação com 500W de potência." },
  { id: "fonte2", name: "Fonte 2", price: 550, img: "produtos/fonte2.webp", desc: "Fonte de alimentação com 600W de potência." },
  { id: "memoriaram", name: "Memória RAM", price: 505, img: "produtos/memoriaram.webp", desc: "Memória RAM DDR4 16GB." },
  { id: "placadevideo", name: "Placa de Vídeo", price: 550, img: "produtos/placadevideo.webp", desc: "Placa de vídeo de última geração." },
  { id: "placadevideo2", name: "Placa de Vídeo 2", price: 550, img: "produtos/placadevideo1.webp", desc: "Modelo avançado para gamers." },
  { id: "placadevideo3", name: "Placa de Vídeo 3", price: 505, img: "produtos/placadevideo2.webp", desc: "Placa para edição de vídeo." },
  { id: "placamae", name: "Placa Mãe", price: 505, img: "produtos/placamae.webp", desc: "Placa mãe compatível com AMD e Intel." },
  { id: "processadoramd", name: "Processador AMD", price: 550, img: "produtos/processadoramd.webp", desc: "Processador AMD Ryzen 5." },
  { id: "processadorintel", name: "Processador Intel", price: 550, img: "produtos/processadorintel.jpg", desc: "Processador Intel Core i7." },
];

// Elementos da interface
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("searchInput");

// Renderiza os produtos no grid
function renderProducts(list) {
  productList.innerHTML = "";
  list.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <a href="produto/produto.html?id=${product.id}" class="text-decoration-none text-dark">
        <div class="product-card border rounded p-3 h-100 text-center" style="cursor:pointer;">
          <img src="${product.img}" alt="${product.name}" class="img-fluid mb-2" />
          <h5>${product.name}</h5>
          <div class="product-price text-primary fw-bold">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
        </div>
      </a>
    `;

    productList.appendChild(col);
  });
}

// Renderiza todos os produtos inicialmente
renderProducts(products);

// Filtro ao digitar na barra de busca
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase().trim();
  if (!filter) {
    renderProducts(products);
  } else {
    const filtered = products.filter(p => p.name.toLowerCase().includes(filter));
    renderProducts(filtered);
  }
});
