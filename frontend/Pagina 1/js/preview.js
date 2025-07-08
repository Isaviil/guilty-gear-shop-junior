const displayContainer = document.querySelector(".display-content");
const dataProductos = JSON.parse(sessionStorage.getItem("productData")) || [];
let shoppingCart = JSON.parse(sessionStorage.getItem("carrito")) || []; 





const user = JSON.parse(sessionStorage.getItem("user"));
const navRight = document.querySelector(".nav-right");

if (!user || user.userID ===null){
    navRight.innerHTML = `
    <div class="nav-sign-in"><a href="login.html">Ingresar</a></div>
    <div class="nav-shop-name"><a href="#">Guilty Gear Store</a></div>
  `;
} else {
    navRight.innerHTML = `

    <div class="carrito-icono">
        <i class="bi bi-cart"></i>
        <div class="carrito-icono-cantidad">  </div>
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





const dropdown = document.querySelector(".dropdown")


let dropdownOpen = false; 
document.querySelector(".nav-sign-in").addEventListener("click", (e)=>{

    e.stopPropagation(); 
    dropdown.style.opacity = 1;
    dropdown.style.pointerEvents = "auto";
    dropdownOpen = true;
});


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




















if (dataProductos && dataProductos.platforms && dataProductos.platforms.length > 0){

    const storagePurchasedIds = JSON.parse(sessionStorage.getItem("orderID")) || [];
    const uniqueID = dataProductos.platforms.find(p => p.platform === "PC").id;
    const inCarrito = shoppingCart.some(y=> y.id === uniqueID);

    let message = "Agregar al carrito";

    if (storagePurchasedIds.includes(uniqueID)){
        message = "Ya está en tu librería"
    } else if (inCarrito){
        message = "Ya está en tu carrito"
    }

    displayContainer.innerHTML = `

    <div class="display-description-container">

                <div class="display-title">
                    <h2> ${dataProductos.title}</h2>
                    <h3>Arc System Works</h3>
                </div>

                <div class="display-description">
                    ${dataProductos.description.map((x, i)=>{return `<p> ${x} </p>`}).join("")}
                </div>

                <div class="precio">
                    <h2>$${dataProductos.price}</h2>
                </div>

                <div class="guilty-tienda-carrito">
                    <a href="#">
                    ${message}
                    </a>
                </div>

                <div class="ESRB">
                    <div class="esrb-img">
                        <a href="https://www.esrb.org/ratings-guide/?smcid=web-store%3Aen-US%3Adetail-Guilty+Gear+-Strive-%3Apage%3Alink" target="_blank">
                             <img src="img/ESRBTEEN.png" alt="ESRB">
                        </a>
                    </div>

                    <div class="esrb-text">
                        <p>Sangre, lenguaje, temas ligéramente sugestivos, violencia</p>
                        <p>Compras dentro del juego, interacción con usuarios</p>
                    </div>
                </div>

        </div>

        <div class="display-picture-container">
            <img src="${dataProductos.img}" alt="">
        </div>

    `

} else {

    displayContainer.innerHTML = `
    
    <div class="carrito-vacio-texto">
        <h2>A Jack-o' le duele que no hay nada aquí :'(</h2>
        <p>Por favor, vuelve a la tienda para seleccionar un producto</p>
    </div>

    <div class="carrito-vacio-img">
        <img src="img/JackoEmptyCart.png" alt="jackoEmptyCart">
    </div>

    `

}






//User logged in?
//const shoppingCart = JSON.parse(sessionStorage.getItem("carrito")) || []; 
const btnAgregar = document.querySelector(".guilty-tienda-carrito a")

if (btnAgregar){
    btnAgregar.addEventListener("click", (e)=>{

    e.preventDefault();

    const usuario = JSON.parse(sessionStorage.getItem("user"));
        if (!usuario){
        sessionStorage.setItem("redirectAfterLogin", "elementpreview.html");
        window.location.href = "login.html";
        return;
    } else {        
       
        if (!shoppingCart.find(y=> y.id === dataProductos.platforms.find(y=> y.platform === "PC").id)){
            shoppingCart.push({
            title: dataProductos.title,
            price:  dataProductos.price,
            img: dataProductos.img,
            id: dataProductos.platforms.find(y=> y.platform === "PC").id})

            sessionStorage.setItem("carrito", JSON.stringify(shoppingCart))

      
            shoppingCartUpdating();
            calcularTotal();
            confirmandoCompra();

        document.body.classList.add("modal-open");
        document.querySelector(".modal-carrito").classList.add("isActive");
        document.querySelector(".guilty-tienda-carrito a").textContent = "Ya está en tu carrito!"; //*Actualizamos al clickear
        } else {

        shoppingCartUpdating();
        document.body.classList.add("modal-open")
        document.querySelector(".modal-carrito").classList.add("isActive")  

        }
    }
});
}



//Cart modal on click
const btnCarrito = document.querySelector(".carrito-icono")

if (btnCarrito){
    btnCarrito.addEventListener("click", ()=> {


    shoppingCartUpdating();
    calcularTotal();
    confirmandoCompra();

    document.body.classList.add("modal-open");
    document.querySelector(".modal-carrito").classList.add("isActive");
    gsap.fromTo(".carrito", {x: 200, opacity: 0}, {x:0, duration: .5, opacity: 1, ease: "power2.out"})

})
}







//removing the modal

document.querySelector(".modal-carrito").addEventListener("click", (e)=>{
    if (e.target.classList.contains("modal-carrito") || e.target.classList.contains("bi-x-lg")){
        //Animando el carrito hacia la derecha.
        gsap.to(".carrito", {x:200, opacity: 0, duration: .5, ease: "power2.out", 
            onComplete: ()=> {
            document.body.classList.remove("modal-open")
            document.querySelector(".modal-carrito").classList.remove("isActive");
            }
        })
    }
})








//const shoppingCart = JSON.parse(sessionStorage.getItem("carrito")) || []; 
const carritoDatos = document.querySelector(".informacion-compra");
//Deleting a product and updating session storage
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



let shoppingCartUpdating = () => {

    const repetidos = JSON.parse(sessionStorage.getItem("orderID")) || [];

    //Filter if exist
    const repeatedProducts = shoppingCart.filter(p=> repetidos.includes(p.id));

    const repeatedNames = repeatedProducts.map(p=> p.title);

    if (shoppingCart.length === 0){
        carritoDatos.innerHTML = `<div class="empty-cart-text">Por qué no agregas algo?</div>`;
    } else {

  carritoDatos.innerHTML = `
    <div class="informacion-titulo">
        <h2>Resumen Compra</h2>
    </div>    
    
    ${repeatedNames.length>0
        ? `<div class="warning"> En tu libreria: ${repeatedNames.join(", ")} </div>` : 
        ""}
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

//null or empty check
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



