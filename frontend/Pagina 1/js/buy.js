let dropdown = gsap.utils.toArray(".dropdown")
let dropdownMenu = gsap.utils.toArray(".dropdown-menu")
//*Agregando el dropdown al html
dropdown.forEach((x, i)=> {

    x.addEventListener("mouseenter", ()=> {

        dropdownMenu[i].style.opacity = 1;
        dropdownMenu[i].style.pointerEvents = "auto";
            gsap.fromTo(dropdownMenu[i], 
            {y: -5, opacity: 0}, 
            {y: 0, opacity: 1, duration: .4, ease: "power2.out"})
    })

    x.addEventListener("mouseleave", ()=> {
        dropdownMenu[i].style.opacity = 0;
        dropdownMenu[i].style.pointerEvents = "none";
        gsap.fromTo(dropdownMenu[i], 
            {y: 0, opacity: 1}, 
            {y: -5, opacity: 0, duration: .4, ease: "power2.out"})
    })
})


//*Lista de objetos del pase de batalla, aka season pass.
let seasonPassContainer = document.querySelector(".season-pass-display-container")

seasonPassContainer.innerHTML = seasonPassBuy.map((x, i)=> {

    if (x.type === "digital"){
        return `

        <div class="season-pass-display-dizzy k">
            <div class="season-4">
                <img src="${x.img}" alt="Dizzy">
            </div>

            <div class="season-4-text">
                <h3>${x.title}</h3>
                <p>${x.description}</p>
            </div>
        </div>

        `
    } else {
        return `

        <div class="season-pass-display-container-elements k">
            <h2>Season pass <span>${x.season}</span></h2>
            <div class="divider"></div>
                            
            <div class="season-pass-display-container-img">
                <img src="${x.img}" alt="">
            </div>

            <div class="season-pass-display-container-text">

                <ul class="release-price">
                    ${x.information.map((y)=> `<li>${y}</li>`).join('')}
                </ul>

                <ul class="contains">
                    <h3>Contains:</h3>
                    ${x.contains.map((y)=> `<li>${y}</li>`).join('')}
                </ul>

                <ul class="description">
                    ${x.description.map((y)=> `<li>${y}</li>`).join('')}
                </ul>

            </div>
        </div>

        `
    }

}).join('');

//*MANEJO DE LOS CONTENEDORES DEL SEASON PASS


const updateScrollWidth = () => {
 seasonScrollWidth =  document.querySelector(".season-pass-display-container-elements").scrollWidth;
}

updateScrollWidth()
window.addEventListener("resize", updateScrollWidth)


let seasonPassClick = gsap.utils.toArray(".season-pass-buttons-title");
let seasonPassElements = gsap.utils.toArray(".k");
let seasonBuyTimeline = gsap.timeline();

/* gsap.set(seasonPassElements, {xPercent: -400}) */
let selectedPass = null;
let isAnimating = false;

//*Seleccionas el seasonPASS a enviar con 
//!const currentPass = seasonPassBuy[i];

//*Agregando un borde a los botones de "season pass 1,2,3,4"
window.addEventListener("load", ()=> {
    seasonPassClick[0].style.border = "solid 1px white";
});


seasonPassClick.forEach((x, i)=> {
    x.addEventListener("click", ()=> {

    if (isAnimating){
        return;
    }
    isAnimating = true;

       gsap.set(seasonPassElements, {xPercent: -100*i});
        selectedPass = seasonPassBuy[i];


        //Animamos según el .type
        if (selectedPass.type === "digital"){
            gsap.fromTo(".season-pass-display-dizzy", 
                { opacity: 0 }, 
                { opacity: 1, duration: 0.4,
                  onComplete: ()=> {isAnimating = false;}
                }
            );
        }else {
    seasonBuyTimeline.fromTo(".season-pass-display-container-img", 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4,}
    );
    
    seasonBuyTimeline.fromTo(".release-price", 
        {opacity: 0, y: -10},
        {opacity: 1, duration: 0.3, y:0}
    );
    
    seasonBuyTimeline.fromTo(".contains", 
        {opacity: 0, y: -10},
        {opacity: 1, duration: 0.3, y:0}
    );
    
    seasonBuyTimeline.fromTo(".description", 
        {opacity: 0, y: -10},
        {opacity: 1, duration: 0.3, y:0, onComplete:()=> {isAnimating = false}}, "<"
    );
        }

    seasonPassClick.forEach(btn => {
         btn.style.border = "none";
    });

    seasonPassClick[i].style.border = "solid 1px white";   


    });
}); 

//*Parallax para la imagen en "Buy Now" y el texto
let onSaleImg = document.querySelector(".announcement");

gsap.fromTo(onSaleImg, {
    backgroundPosition: ()=> '80% -700px'
}, {
    backgroundPosition: '80% -400px',
    ease: "none",
    scrollTrigger: {
        trigger: onSaleImg,
        //markers: true,
        scrub: true,
        start: "bottom 40%",
        end: "bottom top"
    }   
})

//*Navbar y banner timeline
let navBannerTimeline = gsap.timeline()
navBannerTimeline.fromTo("nav", {y: -25, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: .3}, "gatito")

navBannerTimeline.fromTo(".announcement h1", 
    {x: -100, opacity: 0}, 
    {x:0, duration: 1, opacity: 1})

navBannerTimeline.fromTo(".announcement h2", 
    {x: -100, opacity: 0}, 
    {x:0, duration: 1, opacity: 1})





//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//*Programación
//Selectedpass está en null justo arriba.
window.addEventListener("load", ()=> {
    selectedPass = seasonPassBuy.find( x=> x.type === "digital");
});


//*Enviando datos a la base de datos después de seleccionar la opción
let platformSelect =  gsap.utils.toArray(".platforms-select")

platformSelect.forEach((x, i) => {


  x.addEventListener("click", async (e) => {


    e.preventDefault();

    const platforms = ["PS4", "PS5", "STEAM", "MICROSOFTSTORE"];
    const selectedPlatform = platforms[i];

    //*No longer needed for now, but kept it just in case something unexpected happens.
    if (!selectedPass) return console.error("No pass selected!");

    //*Enviamos los datos que guardamos al clickear el objeto a comprar a este
    //*objeto dataToSend.
    const dataToSend = {
      season: selectedPass.season,
      img: selectedPass.img,
      type: selectedPass.type,
      price: selectedPass.price,
      description: selectedPass.description,
      platform: selectedPlatform
    };

    //*Guardamos los elementos en un session storage
    sessionStorage.setItem('selectedPass', JSON.stringify(dataToSend));

   window.open("/Pagina%201/prepurchase.html", "_blank");
  });
});









