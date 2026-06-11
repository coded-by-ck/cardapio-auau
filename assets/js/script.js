const WHATSAPP_NUMBER = "5567998724017";

const products = [
  {
    name: "Dog Tradicional",
    category: "hot-dogs",
    categoryLabel: "Hot Dogs",
    price: "R$ 25,00",
    description:
      "Salsicha, alface, tomate, molho, milho, batata palha, ketchup e mostarda.",
  },
  {
    name: "Dog Tradicional Duplo",
    category: "hot-dogs",
    categoryLabel: "Hot Dogs",
    price: "R$ 33,00",
    description:
      "Salsicha, alface, tomate, milho, hambúrguer, mussarela, batata palha, molho, ketchup e mostarda.",
  },
  {
    name: "Dog Frango",
    category: "hot-dogs",
    categoryLabel: "Hot Dogs",
    price: "R$ 30,00",
    description:
      "Frango, salsicha, alface, tomate, milho, batata palha, molho, ketchup e mostarda.",
  },
  {
    name: "Dog Frango 2",
    category: "hot-dogs",
    categoryLabel: "Hot Dogs",
    price: "R$ 35,00",
    description:
      "Salsicha, alface, tomate, milho, hambúrguer, mussarela, batata palha, molho, ketchup e mostarda.",
  },
  {
    name: "Dog Calabresa",
    category: "hot-dogs",
    categoryLabel: "Hot Dogs",
    price: "R$ 30,00",
    description:
      "Calabresa, salsicha, alface, tomate, milho, batata palha, molho, ketchup e mostarda.",
  },
  {
    name: "Dog Bacon",
    category: "hot-dogs",
    categoryLabel: "Hot Dogs",
    price: "Consultar",
    priceStatus: "consult",
    description:
      "Bacon, salsicha, alface, tomate, milho, batata palha, molho, ketchup e mostarda.",
  },
  {
    name: "Dog Tudo",
    category: "hot-dogs",
    categoryLabel: "Hot Dogs",
    price: "R$ 35,00",
    description:
      "Salsicha, calabresa, bacon, frango, alface, milho, batata palha, molho, ketchup e mostarda.",
  },
  {
    name: "Dog Tudo Au Au",
    category: "hot-dogs",
    categoryLabel: "Hot Dogs",
    price: "R$ 40,00",
    description:
      "Salsicha, calabresa, bacon, frango, alface, tomate, milho, batata palha, molho, ketchup, mostarda, mussarela, ovo e hambúrguer.",
  },
  {
    name: "X-Salada",
    category: "lanches",
    categoryLabel: "Lanches",
    price: "R$ 28,00",
    description:
      "Alface, tomate, milho, molho, ketchup, mostarda, mussarela e hambúrguer.",
  },
  {
    name: "X-Americano",
    category: "lanches",
    categoryLabel: "Lanches",
    price: "R$ 30,00",
    description:
      "Alface, milho, molho, ovo, ketchup, mostarda, mussarela e hambúrguer.",
  },
];

const productGrid = document.querySelector("#productGrid");
const categoryButtons = document.querySelectorAll("[data-category]");
const mainWhatsappButtons = document.querySelectorAll("[data-whatsapp-main]");

function buildWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsapp(message) {
  window.open(buildWhatsappUrl(message), "_blank", "noopener");
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.dataset.category = product.category;

  card.innerHTML = `
    <div class="product-card__media" aria-hidden="true">${getInitials(product.name)}</div>
    <div class="product-card__content">
      <div class="product-card__header">
        <div>
          <h3>${product.name}</h3>
          <p class="product-card__category">${product.categoryLabel}</p>
        </div>
        <span class="product-card__price ${
          product.priceStatus === "consult" ? "product-card__price--consult" : ""
        }">${product.price}</span>
      </div>
      <p class="product-card__description">${product.description}</p>
      <button class="button button--item" type="button">Pedir este item</button>
    </div>
  `;

  const orderButton = card.querySelector(".button--item");
  orderButton.addEventListener("click", () => {
    openWhatsapp(`Olá, vim pelo cardápio digital e quero pedir: ${product.name}.`);
  });

  return card;
}

function renderProducts(category = "todos") {
  const visibleProducts =
    category === "todos" ? products : products.filter((product) => product.category === category);

  productGrid.innerHTML = "";
  visibleProducts.forEach((product) => productGrid.appendChild(createProductCard(product)));
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    categoryButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    renderProducts(category);
    document.querySelector(".menu-shell").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

mainWhatsappButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openWhatsapp(
      "Olá, vim pelo cardápio digital do Food Truck Dog do AuAu e quero fazer um pedido."
    );
  });
});

renderProducts();
