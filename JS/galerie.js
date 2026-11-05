"use strict";
const images = [
    "../MEDIA/logo.png",
    "../MEDIA/login-img.png"
];
const mainImage = document.getElementById("carousel-image");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
if (!mainImage) {
    throw new Error("Elementul carousel-image nu a fost găsit în DOM.");
}
let currentIndex = 0;
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImageWithAnimation();
}
function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImageWithAnimation();
}
function updateImageWithAnimation() {
    mainImage.style.opacity = "0";
    mainImage.style.transform = "scale(0.95)";
    setTimeout(() => {
        mainImage.src = images[currentIndex];
        mainImage.style.opacity = "1";
        mainImage.style.transform = "scale(1)";
    }, 250);
}
setInterval(showNextImage, 3000);
if (nextBtn) {
    nextBtn.addEventListener("click", showNextImage);
}
if (prevBtn) {
    prevBtn.addEventListener("click", showPrevImage);
}
