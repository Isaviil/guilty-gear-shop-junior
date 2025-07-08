
//html
let rightSide = document.querySelector(".right-side");


let htmlContent = (error = {}, userError = {}) => {
    rightSide.innerHTML = `

                <i class="bi bi-x-circle" title="cerrar"></i>
                
                <div class="logo-title">
                    <img src="img/GGST_Logo.png" alt="GGLogo">
                </div>

                <div class="user-inputs">
                    <div class="user-inputs-element">
                        <label for="name">Nombre: </label>
                        <input type="text" id="name" name="name" value="${userError.name || ""}"> 
                        <p class="input-error-message">${error.name || ""}</p>                    
                    </div>

                    <div class="user-inputs-element">
                        <label for="lastname">Apellido:</label>
                        <input type="text" id="lastname" name="lastname" value="${userError.lastname || ""}">    
                        <p class="input-error-message">${error.lastname || ""}</p>                    
                    </div>

                    <div class="user-inputs-element">
                        <label for="email">E-mail: </label>
                        <input type="text" id="email" name="email" value="${userError.email || ""}">
                        <p class="input-error-message">${error.email || ""}</p>
                    </div>

                    <div class="user-inputs-element">
                        <label for="password">Contraseña: </label>
                        <input type="password" id="password" name="password" value="${userError.password || ""}">
                        <p class="input-error-message">${error.password || ""}</p>
                    </div>

                    <div class="user-inputs-element">
                        <label for="phone">Teléfono:</label>
                        <input type="text" id="phone" name="phone" value="${userError.phone || ""}">
                        <p class="input-error-message">${error.phone || ""}</p>
                    </div>
                </div>

                
                <div class="btnCrear">
                    <button> Registrate </button>
                    <p>Ya tienes una cuenta? <a href="login.html">Inicia sesión</a></p>
                </div>

`;


document.querySelector(".btnCrear button").addEventListener("click", submitFetch)

//confirmation when closing
document.querySelector(".bi-x-circle").addEventListener("click", ()=>{
    let modalOpenTL = gsap.timeline();

    modalOpenTL.set(".modal-confirmation", {pointerEvents: "auto"})
    .fromTo(".blur", {opacity: 0}, {opacity: 1, zIndex: 3, duration: .5, ease:"power2.out"})
    .fromTo(".modal-confirmation", {opacity: 0}, {opacity: 1, duration: .4, ease:"power2.out"}, '<+=0.2')
})


//closing the modal
let btnNo = document.querySelectorAll(".confirmation-options a")[1];
document.querySelector(".modal-confirmation").addEventListener("click", (e)=>{
    if(!e.target.closest(".confirmation-message") || e.target === btnNo){
        e.preventDefault();
    let modalOpenTL = gsap.timeline();
    modalOpenTL.set(".modal-confirmation", {pointerEvents: "none"})
    .fromTo(".modal-confirmation", {opacity: 1}, {opacity: 0, duration: .4, ease:"power1.out"})
    .fromTo(".blur", {opacity: 1}, {opacity: 0, zIndex: 0, duration: .5, ease:"power1.out"}, '<+=0.2')
    }
})


}

htmlContent();






//Fetching the data
async function submitFetch(e) {

    e.preventDefault();

    const userData = {
    name: document.getElementById("name").value.trim(),
    lastname: document.getElementById("lastname").value.trim(),
    email: document.getElementById("email").value.trim(),
    password: document.getElementById("password").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    }

    //Not empty nor null check

    const emptyErrors = {};

    if (!userData.name) emptyErrors.name = "El nombre es obligatorio";
    if (!userData.lastname) emptyErrors.lastname = "El apellido es obligatorio";
    if (!userData.email) emptyErrors.email = "El email es obligatorio";
    if (!userData.password) emptyErrors.password = "La contraseña es obligatoria";
    if (!userData.phone) emptyErrors.phone = "El número de teléfono es obligatorio";

    if (Object.keys(emptyErrors).length>0){
        htmlContent(emptyErrors, userData)
        return;
    }

    try {

        const response = await fetch("http://localhost:5172/api/GGFrontEnd/AddUser",{

            method: "POST",
            headers: {
                "Content-type": "application/json"
            }, 
            body: JSON.stringify(userData)

        });

        if (!response.ok){

            //*error 400? Save.
            const errorData = await response.json();
            
            //*rebuilding the html
            htmlContent(errorData, userData)
            return;
        }

        //*modal on success
        htmlContent();
        let successTl = gsap.timeline();
        successTl.fromTo(".blur", {opacity: 0}, {opacity: 1, zIndex: 3, duration: .5, ease: "power1.out"})
        .fromTo(".modal-creation-successful", {opacity: 0}, {opacity: 1, duration: .7, ease: "power1.out", pointerEvents: "auto"}, '<+=0.3')


    } catch(error){
        //Any other error, blackout etc
        console.error("Error en fetch", error);
        alert ("Error en la conexión");

    }
}