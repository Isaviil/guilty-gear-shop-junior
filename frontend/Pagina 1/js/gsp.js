function animateSideShop(x){
    gsap.fromTo(x,{
        x: 560,
        opacity: 0
    }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    })
}