const products = [
  { name: 'Keyboard', price: 45 },
  { name: 'Monitor', price: 320 },
  { name: 'Mouse', price: 25 }
];

// Destructuring
const { name, price } = products[0];
console.log(name, price);

// Find()
const mouse = products.find(product => product.name === "Mouse");
console.log(mouse.price);