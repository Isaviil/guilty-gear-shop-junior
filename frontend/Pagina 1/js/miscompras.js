const dataProductos = JSON.parse(sessionStorage.getItem("productData")) || [];
let shoppingCart = JSON.parse(sessionStorage.getItem("carrito")) || []; 



//Changing the navbar if there's a user

const user = JSON.parse(sessionStorage.getItem("user"));
const navRight = document.querySelector(".nav-right");

if (!user || user.userID ===null){
    navRight.innerHTML = `
    <div class="nav-sign-in"><a href="login.html">SIGN IN</a></div>
    <div class="nav-shop-name"><a href="#">Guilty Gear Store</a></div>
  `;
} else {
    navRight.innerHTML = `

    <div class="carrito-icono">
        <i class="bi bi-cart"></i>
        <div class="carrito-icono-cantidad"> 0 </div>
    </div>

    <div class="nav-sign-in">
        <a href="#"> ${user.name.split(" ")[0]} </a>
         <ul class="dropdown" id="user-dropdown">
            <li id="sign-out">Salir</li>
            <li><a href="misCompras.html"> Compras </a></li>
         </ul>      
    </div>

    <div class="nav-shop-name"> 
        <a href="GuiltyGearShop.html">Guilty Gear Store</a>
    </div>
  `;
}











//Toggle dropdown
const dropdown = document.querySelector(".dropdown")

let dropdownOpen = false; 
document.querySelector(".nav-sign-in").addEventListener("click", (e)=>{
    e.stopPropagation(); 
    dropdown.style.opacity = 1;
    dropdown.style.pointerEvents = "auto";
    dropdownOpen = true;
});

//Closing
window.addEventListener("click", (e) => {
  if (dropdownOpen){
    dropdown.style.opacity = 0;
    dropdown.style.pointerEvents = "none";
    dropdownOpen = false;
  }
});



if (user && document.querySelector("#sign-out")){
    document.querySelector("#sign-out").addEventListener("click", ()=> {
        sessionStorage.clear();
        window.location.href = "GuiltyGearShop.html";
    })
}
















//Trigger modal on clicking the cart
const btnCarrito = document.querySelector(".carrito-icono")

if (btnCarrito){
    btnCarrito.addEventListener("click", ()=> {


    shoppingCartUpdating();
    calcularTotal();
    confirmandoCompra();

    document.body.classList.add("modal-open");
    document.querySelector(".modal-carrito").classList.add("isActive");
    

})
}







//Removing the modal

document.querySelector(".modal-carrito").addEventListener("click", (e)=>{
    if (e.target.classList.contains("modal-carrito") || e.target.classList.contains("bi-x-lg")){
        document.body.classList.remove("modal-open")
        document.querySelector(".modal-carrito").classList.remove("isActive");
    }
})







//const shoppingCart = JSON.parse(sessionStorage.getItem("carrito")) || []; 
const carritoDatos = document.querySelector(".informacion-compra");

    function deleteObject (){
            gsap.utils.toArray(".elemento-btn-borrar").forEach((x, i)=>{
            x.addEventListener("click", ()=> {
                const id = parseInt(x.dataset.id);
                shoppingCart = shoppingCart.filter(item => item.id !== id);
                sessionStorage.setItem("carrito", JSON.stringify(shoppingCart));
                document.querySelector(".guilty-tienda-carrito a").textContent = "Agregar al carrito";
                
                shoppingCartUpdating();
                confirmandoCompra();
            })
        })
    }

//shopping cart html
let shoppingCartUpdating = () => {

    if (shoppingCart.length === 0){
        carritoDatos.innerHTML = `<div class="empty-cart-text">Por qué no agregas algo?</div>`;
    } else {

  carritoDatos.innerHTML = `
    <div class="informacion-titulo">
        <h2>Resumen Compra</h2>
    </div>    

    ${shoppingCart.map((x, i)=> {
      return `
        <div class="informacion-compra-elemento">                                    
            <div class="elemento-img">
                <img src="${x.img}" alt="">
            </div>

            <div class="descripcion-elemento">
                <div class="elemento-title">
                    <h2>${x.title}</h2>
                </div>

                <div class="elemento-precio">
                    <p>$${x.price}</p>
                </div>

                <div class="elemento-esrb-carrito">
                    <div class="esrb-img-carrito">
                        <a href="https://www.esrb.org/ratings-guide/?smcid=web-store%3Aen-US%3Adetail-Guilty+Gear+-Strive-%3Apage%3Alink">
                            <img src="img/ESRBTEEN.png" alt="ESRB">
                        </a>
                    </div>

                    <div class="esrb-text-carrito">
                        <p>Sangre, lenguaje, temas ligéramente sugestivos, violencia</p>
                        <p>Compras dentro del juego, interacción con usuarios</p>
                    </div>
                </div>

                <div class="elemento-btn-borrar" data-id="${x.id}">
                    <button class="eliminar-producto">
                        <i class="bi bi-trash3"></i>   
                        <span>Eliminar</span>                         
                    </button>
                </div>
            </div>                    
        </div>`;
    }).join("")}
  `;
    deleteObject();    

    }

};







const confirmacionCompra = document.querySelector(".confirmacion-compra");

let confirmandoCompra = () => {

confirmacionCompra.innerHTML = `

    <div class="confirmacion-titulo">
                    <h2>Confirmar Compra</h2>
                    <i class="bi bi-x-lg"></i>
                </div>

                <div class="confirmacion-precio">
                    <div class="subtotal-line">
                        <p>Subtotal:</p>
                        <p> </p>
                    </div>

                    <div class="descuento-line">
                        <p><span>Descuento: </span></p>
                        <p><span>$0</span></p>
                    </div>

                    <div class="total-line">
                        <p>Total ($x artículos): </p>
                        <p>$x</p>
                    </div>

                    <div class="ingresar-descuento">
                        <p>Tienes un código de descuento?</p>
                        <div class="descuento-input">
                            <input type="text" placeholder="ingresa tu código de descuento" id="codigo-descuento">
                            <button type="button">Aplicar</button>
                        </div>
                    </div>
                </div>

                <div class="confirmar-compra">
                    <button class="finish">Encargar y pagar</button>
    </div>

`
  calcularTotal();   
}

confirmandoCompra();

//preventing errors if null or empty
function calcularTotal() {

 //reducing
  let x = shoppingCart.reduce((acc, item) => acc + item.price, 0);

  const subtotal = document.querySelector(".subtotal-line p:last-child");
  const total = document.querySelector(".total-line p:last-child");
  const totalLabel = document.querySelector(".total-line p:first-child");
  const cartCount = document.querySelector(".carrito-icono-cantidad");

  if (subtotal) subtotal.innerHTML = `$${x.toFixed(2)}`;
  if (total) total.innerHTML = `$${x.toFixed(2)}`;
  if (totalLabel) totalLabel.innerHTML = `Total ${shoppingCart.length} artículos`;
  if (cartCount) cartCount.textContent = `${shoppingCart.length}`;
}

calcularTotal();













