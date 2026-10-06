const products = [
  { name: 'Keyboard', price: 45 },
  { name: 'Monitor', price: 320 },
  { name: 'Mouse', price: 25 }
];

// Destructuring
const { name, price } = products[0];
console.log(name, price);

// Find
const mouse = products.find(product => product.name === "Mouse");
console.log(mouse.price);

// Filter
const cheapProducts = products.filter(product => product.price < 100);
console.log(cheapProducts);