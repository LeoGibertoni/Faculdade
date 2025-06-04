const products = [
    { name: "fonte 650w", price: 505, img: "produtos/fonte.webp" },
    { name: "fonte 500w", price: 550, img: "produtos/fonte2.webp" },
    { name: "momeoria ram 2x8gb", price: 505, img: "produtos/memoriaram.webp" },
    { name: "placadevideo rtx 4060", price: 550, img: "produtos/placadevideo.webp" },
    { name: "placadevideo rtx 5080", price: 550, img: "produtos/placadevideo1.webp" },
    { name: "placadevideo randeon rx 6650 xt", price: 505, img: "produtos/placadevideo2.webp" },
    { name: "placamae", price: 505, img: "produtos/placamae.webp" },
    { name: "processador amd", price: 550, img: "produtos/processadoramd.webp" },
    { name: "processador intel", price: 550, img: "produtos/processadorintel.jpg" },
  ];
  
  // Função para gerar um ID simples a partir do nome
  function generateId(name) {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  }
  
  const productList = document.getElementById("product-list");
  const searchInput = document.getElementById("searchInput");
  
  function renderProducts(list) {
    productList.innerHTML = "";
    list.forEach(product => {
      const id = generateId(product.name);
  
      const col = document.createElement("div");
      col.className = "col-12 col-sm-6 col-md-4 col-lg-3";
  
      col.innerHTML = `
        <a href="produto/produto.html?id=${id}" class="text-decoration-none text-dark">
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
  
  // Filtra os produtos conforme digita
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase().trim();
    if (!filter) {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.name.toLowerCase().includes(filter));
      renderProducts(filtered);
    }
  });
  