const products = [
  { name: "Camiseta", price: 50, img: "img/camiseta.png" },
  { name: "Calça", price: 100, img: "img/calca.png" },
  { name: "Tênis", price: 200, img: "img/tenis.png" },
  { name: "Boné", price: 30, img: "img/bone.jfif" },
  { name: "Chinelo", price: 40, img: "img/chinelo.png" },
  { name: "Cinto", price: 35, img: "img/cinto.png" },
  { name: "Meias", price: 20, img: "img/Meias.png" },
  { name: "Moletom", price: 120, img: "img/moletom.png" },
  { name: "Shorts", price: 60, img: "img/shorts.png" }
];

let cart = [];

function renderCatalog() {
  const catalog = document.getElementById('productCatalog');
  catalog.innerHTML = '';
  products.forEach((product, index) => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>R$ ${product.price}</p>
      <button onclick="addToCart(${index})">Adicionar ao Carrinho</button>
    `;
    catalog.appendChild(div);
  });
}

function addToCart(index) {
  const email = localStorage.getItem('loggedInUser');
  if (!email) {
    openLoginModal();
    return;
  }

  cart.push(products[index]);
  updateCartCount();
}

function updateCartCount() {
  document.getElementById('cartCount').innerText = cart.length;
}

function openCart() {
  const cartList = document.getElementById('cartList');
  const cartTotal = document.getElementById('cartTotal');
  cartList.innerHTML = '';

  let total = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - R$${item.price}`;
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotal.innerText = total;
  document.getElementById('cartModal').classList.remove('hidden');
}

function closeCart() {
  document.getElementById('cartModal').classList.add('hidden');
}

function finalizePurchase() {
  if (cart.length === 0) {
    alert("Carrinho vazio!");
    return;
  }

  const email = localStorage.getItem('loggedInUser');
  const historico = JSON.parse(localStorage.getItem(`compras_${email}`)) || [];
  historico.push({ data: new Date().toLocaleString(), itens: [...cart] });
  localStorage.setItem(`compras_${email}`, JSON.stringify(historico));

  alert("Compra realizada!");
  cart = [];
  updateCartCount();
  closeCart();
}

function openLoginModal() {
  document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
}

function openRegisterModal() {
  closeLoginModal();
  document.getElementById('registerModal').classList.remove('hidden');
}

function closeRegisterModal() {
  document.getElementById('registerModal').classList.add('hidden');
}

function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const user = JSON.parse(localStorage.getItem(`user_${email}`));

  if (user && user.password === password) {
    localStorage.setItem("loggedInUser", email);
    document.getElementById('topbar').classList.remove('hidden');
    document.getElementById('userName').innerText = user.name;
    document.getElementById('welcomeMessage').classList.remove('hidden');
    closeLoginModal();
  } else {
    alert("Email ou senha inválidos!");
  }
}

function register() {
  const name = document.getElementById('registerName').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;
  const termos = document.getElementById('termos').checked;

  if (!name || !email || !password || !confirmPassword) return alert("Preencha todos os campos.");
  if (password !== confirmPassword) return alert("As senhas não coincidem.");
  if (!termos) return alert("Você precisa aceitar os termos.");

  const newUser = { name, email, password };
  localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
  alert("Cadastro realizado!");
  closeRegisterModal();
  openLoginModal();
}

function logout() {
  localStorage.removeItem('loggedInUser');
  alert("Você saiu da conta.");
  location.reload();
}

function openProfile() {
  const email = localStorage.getItem('loggedInUser');
  if (!email) return alert("Faça login primeiro.");

  const user = JSON.parse(localStorage.getItem(`user_${email}`));
  document.getElementById("profileEmail").innerText = email;

  const historico = JSON.parse(localStorage.getItem(`compras_${email}`)) || [];
  const container = document.getElementById('profileHistoryList');
  container.innerHTML = historico.length === 0
    ? "<p>Nenhuma compra realizada.</p>"
    : historico.map(c => `<div class="history-item"><b>${c.data}</b><br>${c.itens.map(i => `• ${i.name} - R$${i.price}`).join("<br>")}</div>`).join("");

  document.getElementById("profileModal").classList.remove("hidden");
}

function closeProfile() {
  document.getElementById("profileModal").classList.add("hidden");
}

function changePassword() {
  const email = localStorage.getItem('loggedInUser');
  const newPassword = prompt("Digite a nova senha:");
  if (!newPassword || newPassword.length < 4) return alert("Senha inválida.");
  const user = JSON.parse(localStorage.getItem(`user_${email}`));
  user.password = newPassword;
  localStorage.setItem(`user_${email}`, JSON.stringify(user));
  alert("Senha atualizada.");
}

function filterProducts() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const catalog = document.getElementById('productCatalog');
  catalog.innerHTML = '';
  products
    .filter(p => p.name.toLowerCase().includes(search))
    .forEach((product, index) => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <img src="${product.img}" alt="${product.name}" />
        <h4>${product.name}</h4>
        <p>R$ ${product.price}</p>
        <button onclick="addToCart(${index})">Adicionar ao Carrinho</button>
      `;
      catalog.appendChild(div);
    });
}

window.onload = () => {
  renderCatalog();
  const email = localStorage.getItem('loggedInUser');
  if (email) {
    const user = JSON.parse(localStorage.getItem(`user_${email}`));
    document.getElementById('topbar').classList.remove('hidden');
    document.getElementById('userName').innerText = user.name;
    document.getElementById('welcomeMessage').classList.remove('hidden');
  }
};
