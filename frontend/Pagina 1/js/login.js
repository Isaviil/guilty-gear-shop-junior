  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.form-outline').forEach(el => {
      new mdb.Input(el);
    });
  });



  document.querySelector("button").addEventListener("click", async()=> {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const login = {
      email: email,
      password: password
    };

   try {
    const response = await fetch("http://localhost:5172/api/GGFrontEnd/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(login)
    });

    if (response.ok) {
      const user = await response.json();

      sessionStorage.setItem("user", JSON.stringify(user));

     const ordersResponse = await fetch(`http://localhost:5172/api/GGFrontEnd/getOrders/${user.userID}`);

      if (ordersResponse.ok){
        //Traemos el objeto
        const orders = await ordersResponse.json();

        //Extraemos solo el id
        const ordersID = orders.map(x => x.productID)

        //Enviamos al session storage solo el id al loguear
        sessionStorage.setItem("orderID", JSON.stringify(ordersID))
      }

      const redirect = sessionStorage.getItem("redirectAfterLogin"); 
      sessionStorage.removeItem("redirectAfterLogin")
      window.location.href =  redirect || "/Pagina%201/GuiltyGearShop.html";
    } else {
      console.error("Login failed");
    }
  } catch (err) {
    console.error("Error:", err);
  }
})



