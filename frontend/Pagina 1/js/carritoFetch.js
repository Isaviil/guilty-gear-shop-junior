document.querySelector(".carrito").addEventListener("click", async (e) => {

  if (e.target.classList.contains("finish")) {
  
  const productsToSend = JSON.parse(sessionStorage.getItem("carrito")) || [];

  const usuariosStorage = JSON.parse(sessionStorage.getItem("user")) || [];

  const storagePurchasedIds = JSON.parse(sessionStorage.getItem("orderID"));
  
  let idsToSend = productsToSend.map(x => x.id); 

  const matchedIds = products.filter(product => idsToSend.includes(product.id));

  const usuarioID = usuariosStorage.userID;
  
      if (idsToSend.some(id => storagePurchasedIds.includes(id))){
        return;
      }

 const ordersToSend = matchedIds.map((p)=> ({
  UserID: usuarioID,
  ProductID: p.id,
  ProductName: p.name,
  Purchase_Price: p.price
}));



   try {
    const response = await fetch("http://localhost:5172/api/GGFrontEnd/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ordersToSend)
    });

    if (response.ok) {
      
        let tl = gsap.timeline()

        tl.to(".carrito", {x:200, opacity: 0, duration: .5, ease: "power2.out", 
            onComplete: ()=> {                      
            document.body.classList.add("modal-open");
            }
        })

        tl.fromTo(".modal-thank-you", {
          opacity: 0
        }, {
          opacity: 1, duration: .8, ease: "power1.out",
          onComplete: ()=> {
            document.querySelector(".modal-thank-you").style.pointerEvents = "auto"
          }
        })

        sessionStorage.setItem("orderID", JSON.stringify([...new Set([...storagePurchasedIds, ...matchedIds.map(x=> x.id)])]))
        sessionStorage.removeItem("carrito");
        sessionStorage.removeItem("productData")
      
    } else {
      console.error("error al enviar");
    }
  } catch (err) {
    console.error("Error:", err);
  }


  }
});
