//targeteamos el grid
const displayContainer = document.querySelector(".display-compras");
const downloadBtn = document.getElementById("downloadPdfBtn");

async function loadOrders() {
  try {
    const user = JSON.parse(sessionStorage.getItem("user"));

    //*Safeguard por si entran directamente.
      if (!user || !user.userID) {

        alert("Please log in to see your orders.");
        window.location.href = "login.html"; 
        return; 
    }


    const res = await fetch(`http://localhost:5172/api/GGFrontEnd/getOrders/${user.userID}`);

    if (!res.ok) {
  throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    ordersData = [...data]

    const headers = `
      <div><strong>Producto</strong></div>
      <div><strong>Precio</strong></div>
      <div><strong>ID Producto</strong></div>
      <div><strong>ID Compra</strong></div>
      <div><strong>Fecha</strong></div>
    `;

console.log(data);
const html = data.map(order => `
  <div>${order.productName}</div>
  <div>$${order.purchase_Price}</div>
  <div class="order-product-id" data-id="${order.productID}">${order.productID}</div>
  <div>${order.purchaseID}</div>
  <div>${order.dateTime}</div>
`).join("");



        displayContainer.innerHTML = headers + html;




  } catch (err) {
    console.error("Error fetching orders:", err);
  }
}

loadOrders();


downloadBtn.addEventListener("click", async () => {
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (!user || !user.userID) {
    alert("Por favor, inicia sesión para descargar tu PDF.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5172/api/GGFrontEnd/getPDF/${user.userID}`);

    if (!response.ok) {
      throw new Error(`Error al descargar el PDF: ${response.status}`);
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "GuiltyGear_Orders.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error al descargar el PDF:", error);
  }
});











