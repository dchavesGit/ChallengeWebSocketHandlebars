const socket = io();

const container = document.getElementById("container");

socket.on("productAdd", (data) => {
  let prod = JSON.parse(data);
  let ul = document.createElement("ul");
  ul.setAttribute("id", prod.id);
  ul.innerHTML = `
                <li>id: ${prod.id}</li>
                <li>title: ${prod.title}</li> 
                <li>description: ${prod.description}</li>
                <li>code: ${prod.code}</li>
                <li>price: ${prod.price}</li>
                <li>thumbnail: ${prod.thumbnail}</li>
                <li>stock: ${prod.stock}</li>
        `;
  container.appendChild(ul);
});

socket.on("productDelete", (id) => {
  const product = document.getElementById(id);
  console.log(product);
  product.remove();
});
