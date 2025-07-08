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


//Toggle dropdwn
const dropdown = document.querySelector(".dropdown")


let dropdownOpen = false; 
document.querySelector(".nav-sign-in").addEventListener("click", (e)=>{

    e.stopPropagation(); 
    dropdown.style.opacity = 1;
    dropdown.style.pointerEvents = "auto";
    dropdownOpen = true;
});

//UL close
window.addEventListener("click", (e) => {
  if (dropdownOpen){
    dropdown.style.opacity = 0;
    dropdown.style.pointerEvents = "none";
    dropdownOpen = false;
  }
});

//Loggin out

if (user && document.querySelector("#sign-out")){
    document.querySelector("#sign-out").addEventListener("click", ()=> {
        sessionStorage.clear();
        window.location.href = "GuiltyGearShop.html";
    })
}










//Adding hero container element to cart
const btnHeroAdd = document.querySelector(".guiltyHero-text");
let btnHeroId = siteDisplay.find(y => y.platforms.find( x => x.id === 18)).platforms.find( elem => elem.id === 18)
let product = siteDisplay.find(y => y.platforms.find(x => x.id === 18));


let heroContainerView = () => {

    const storagePurchasedIds = JSON.parse(sessionStorage.getItem("orderID")) || [];
    const inLibrary = storagePurchasedIds.includes(btnHeroId.id);
    const inCartNow = shoppingCart.some(item => item.id === btnHeroId.id);

    let message = "Agregar al carrito";
    if (inLibrary){
        message = "Ya está en tu librería";
    } else if (inCartNow){
        message = "Ya está en el carrito";
    }

    btnHeroAdd.innerHTML = `

                        <div class="guilty-text-name">
                            <h2><span>G</span>UILTY <span>G</span>EAR -STRIVE-</h2>
                            <p>Arc System Works</p>
                            <p>59.99$</p>
                        </div>

                        <div class="add-to-cart" data-id="${btnHeroId.id}">
                            <a href="#">${message}</a>
                        </div>

                        <div class="guilty-text-description">
                            <p>※Compras en el juego opcionales</p>
                            <p>※Se requiere internet</p>
                            <p>※Puede jugarse con control o M&K</p>
                        </div>

`;

    document.querySelector(".add-to-cart a").addEventListener("click", (e)=>{
    e.preventDefault();
    const alreadyInCart = shoppingCart.some(y => y.id === btnHeroId.id);
    const usuario = JSON.parse(sessionStorage.getItem("user"));
        if (!usuario){
        sessionStorage.setItem("redirectAfterLogin", "GuiltyGearShop.html");
        window.location.href = "login.html";
        return;
    } 
    
    if (!alreadyInCart){
        shoppingCart.push({
            id: btnHeroId.id,
            img: product.img,
            title: product.title,
            price: product.price
        });
        sessionStorage.setItem("carrito", JSON.stringify(shoppingCart));
        document.querySelector(".add-to-cart a").textContent = "Ya está en el carrito";
    }

    // Common actions for both cases
    shoppingCartUpdating();
    calcularTotal();
    confirmandoCompra();

    document.body.classList.add("modal-open");
    document.querySelector(".modal-carrito").classList.add("isActive");

    });


}

heroContainerView()













//carousel

const carouselThumbnails = document.querySelector(".guiltyHero-carousel")

carouselThumbnails.innerHTML = guiltyGearShopCarousel.map((x, i)=> {

    return `

 <div class="carousel-container">
            <div class="play-button">
                <i class="bi bi-play-circle"></i>
            </div>
                    
            <div class="carousel-thumbnail">
                <a href="${x.link}" target="_blank">
                <img src="${x.thumbnail}" alt="">
                </a>
            </div>
 </div>        

    `

}).join("");






let isAnimating = false;

const updateScrollWidth = () => {
    widthSize = document.querySelector(".carousel-container").scrollWidth + 30;
};
updateScrollWidth()
window.addEventListener("resize", updateScrollWidth);

//append and prepend clones
const flechitas = gsap.utils.toArray(".flechitas .bi")
const thumbnails = gsap.utils.toArray(".carousel-container");

let cloneLast = thumbnails[thumbnails.length-1].cloneNode(true);
let cloneFirst = thumbnails[0].cloneNode(true);
let cloneSecond = thumbnails[1].cloneNode(true);
let clonePenultimo = thumbnails[thumbnails.length-2].cloneNode(true);
let cloneCentral = thumbnails[Math.floor(thumbnails.length/2)].cloneNode(true);

carouselThumbnails.appendChild(cloneFirst);
carouselThumbnails.prepend(cloneLast);
carouselThumbnails.appendChild(cloneSecond);
carouselThumbnails.prepend(clonePenultimo);
carouselThumbnails.appendChild(cloneCentral);

//JS arrows

let selectedIndex = 0;
flechitas.forEach((x, i)=> {

   x.addEventListener("click", ()=> {

        if (isAnimating === true){
        return;
        }

        isAnimating = true;

     if (i===0){
        selectedIndex--;
        gsap.to(".guiltyHero-carousel", {x: -widthSize*selectedIndex,
            onComplete: ()=> {
                isAnimating = false;
                if (selectedIndex === -3){
                    selectedIndex = 2;
                    gsap.set(".guiltyHero-carousel", {x: -widthSize*selectedIndex})
                }
            }
        })         

    } else {
        selectedIndex++;
        gsap.to(".guiltyHero-carousel", {x: -widthSize*selectedIndex,
            onComplete: ()=> {
                isAnimating = false;
                if (selectedIndex === 3){
                    selectedIndex = -2;
                    gsap.set(".guiltyHero-carousel", {x: -widthSize*selectedIndex})
                }
            }})
    }
   })

})























let contenedorPrincipal = () => {


const elementosTienda = document.querySelector(".guilty-tienda-main")
const storagePurchasedIds2 = JSON.parse(sessionStorage.getItem("orderID")) || [];

elementosTienda.innerHTML = siteDisplay.filter(item => item.type.includes("hot")).map((x, i) => {

    
    const pcPlatform = x.platforms.find(p => p.platform === "PC");
    const uniqueID = pcPlatform? pcPlatform.id : "No hay id"; 
    const alreadyInCart = shoppingCart.some(item => item.id === uniqueID);

    const inLibrary = storagePurchasedIds2.includes(uniqueID);

    let message = "Ver más";

    if (inLibrary){
        message = "Ya está en tu librería";
    } else if (alreadyInCart){
        message = "Ya está en tu carrito"
    }

        return `
            <div class="guilty-tienda-element" data-id="${uniqueID}">

                <div class="guilty-tienda-img">
                    <img src="${x.img}" alt="">
                </div>

                <div class="guilty-tienda-title">
                    <h2>${x.title}</h2>
                </div>

                <div class="guilty-tienda-description">
                    ${x.description.map(elem => `<p>${elem}</p>`).join("")}
                </div>

                <div class="guilty-tienda-precio">
                    <p>$ ${x.price}</p>
                </div>

                <div class="guilty-tienda-carrito">
                    <a href="#">${message}</a>
                </div>

            </div>
        `;
    })
    .join("");


document.querySelectorAll(".guilty-tienda-carrito a").forEach((x,i)=>{


    x.addEventListener("click", (e)=>{
        e.preventDefault();

        const parentElement = x.closest(".guilty-tienda-element");
        const uniqueID = parseInt(parentElement.dataset.id);

        const itemData = siteDisplay.find(item=> item.platforms.find(p => p.platform === "PC" && p.id === uniqueID))

        sessionStorage.setItem("productData", JSON.stringify(itemData));

        window.location.href = "elementpreview.html";

    })

});

}

contenedorPrincipal();











//Thumbnail for additional characters
const personajesThumbnail = document.querySelector(".character-thumbnailz");


personajesThumbnail.innerHTML = siteDisplay.filter( y=> y.type.includes("Character")).slice(3, 9).map((x,i)=>{
    const pcPlatform = x.platforms.find(x => x.platform === "PC");
    const uniqueID = pcPlatform? pcPlatform.id : "no hay id";

    return `

    <div class="guilty-characters-elements" data-id="${uniqueID}">
        <a href="#"> <img src="${x.img}" alt=""></a>
    </div>
    `

}).join("");


document.querySelectorAll(".guilty-characters-elements a").forEach((x, i)=>{
    x.addEventListener("click", (e)=>{
        e.preventDefault();
        
        const parentElement = x.closest(".guilty-characters-elements");
        const uniqueID = parseInt(parentElement.dataset.id);



        const itemData = siteDisplay.find(y => y.platforms.find(x => x.platform === "PC" && x.id === uniqueID));

        sessionStorage.setItem("productData", JSON.stringify(itemData));

        window.location.href = "elementpreview.html";

    })
})




















//const dataProductos = JSON.parse(sessionStorage.getItem("productData")) || [];
//let shoppingCart = JSON.parse(sessionStorage.getItem("carrito")) || []; 


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
        //Toggle modal
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
        document.querySelector(".guilty-tienda-carrito a").textContent = "Ya está en tu carrito!"; //update on click
        } else {

        shoppingCartUpdating();
        document.body.classList.add("modal-open")
        document.querySelector(".modal-carrito").classList.add("isActive")  

        }
    }
});
}



//modal trigger
const btnCarrito = document.querySelector(".carrito-icono")

if (btnCarrito){
    btnCarrito.addEventListener("click", ()=> {


    shoppingCartUpdating();
    calcularTotal();
    confirmandoCompra();
    
    
    document.body.classList.add("modal-open"); //blur
    document.querySelector(".modal-carrito").classList.add("isActive"); //positioning
    gsap.fromTo(".carrito", {x: 200, opacity: 0}, {x:0, duration: .5, opacity: 1, ease: "power2.out"})
})
}















//removing the modal
document.querySelector(".modal-carrito").addEventListener("click", (e)=>{
     if (e.target.classList.contains("modal-carrito") || e.target.classList.contains("bi-x-lg")){
        //animating
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
    function deleteObject (){
            gsap.utils.toArray(".elemento-btn-borrar").forEach((x, i)=>{
            x.addEventListener("click", ()=> {
                const id = parseInt(x.dataset.id);
                shoppingCart = shoppingCart.filter(item => item.id !== id);
                sessionStorage.setItem("carrito", JSON.stringify(shoppingCart));
                document.querySelector(".guilty-tienda-carrito a").textContent = "Agregar al carrito";
                
                shoppingCartUpdating();
                confirmandoCompra();
                heroContainerView();
            })
        })
    }

//Cart html

let shoppingCartUpdating = () => {
    
    const repetidos = JSON.parse(sessionStorage.getItem("orderID")) || [];

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
    </div>

`
  calcularTotal();   
}

confirmandoCompra();


//null or empty check
function calcularTotal() {
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














