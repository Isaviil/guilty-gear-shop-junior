
let imageRotation = gsap.utils.toArray(".left-side img")[0]
let imagesRotationSlice = gsap.utils.toArray(".left-side img").slice(1)


//Avoid repetitions
let opacidad = (img) => {
    return gsap.timeline().fromTo(img, {opacity: 1}, {opacity: 0, duration: 3, delay: 5.5, ease: "power1.out"})
}

//login background carousel
let imageTl = gsap.timeline({repeat: -1, delay: 1});

imagesRotationSlice.reverse().forEach((x,i)=> {
    imageTl.add(opacidad(x))
})
imageTl.set(imageRotation, {zIndex: 10}) 
imageTl.set(imagesRotationSlice, {opacity: 1}) //restarting opacity
imageTl.to(imageRotation, {opacity: 0, duration: 2, delay: 4.5, ease: "power1.out"}) //hiding first img
imageTl.set(imageRotation, {opacity: 1, zIndex: 0}) //restart opacity





let containerTimeline = gsap.timeline();

containerTimeline.fromTo(".right-side", {xPercent: 200, opacity: .5}, {xPercent: 0, delay: .3, opacity: 1, duration: .9, ease: "power2.out"})
containerTimeline.fromTo(".left-side", {xPercent: 100, opacity: 0}, {xPercent: 0, opacity: 1, duration: 1, ease: "power1.out"})
containerTimeline.fromTo(".bi-x-circle", {opacity: 0}, {opacity: 1, duration: 1.4, ease: "power1.out"})









