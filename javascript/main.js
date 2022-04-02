// -----------------------------
// Toggle Navigation Menu
function toggleNav(){
    let nav = document.querySelector(".main-nav");
    if(nav.style.display == "none"){
        nav.style.display = "flex";
    }
    else {
        nav.style.display = "none"
    }
}
// -----------------------------

// -----------------------------
// Change Landing Images randomly every 10 sec 
let landingBackgroung = document.querySelector(".landing");
// Array of Images 
let imageArray = ["landing-01.jpg" , "landing-02.jpg" , "landing-03.jpg" , "landing-04.png" , "landing-05.jpg"];

setInterval(() => {
    if(document.title == "ZAZA - Car Wash"){
        // Generate Random number 
    let randomNumber = Math.floor(Math.random() * imageArray.length);
    // change image
    landingBackgroung.style.backgroundImage = 'url("../images/' + imageArray[randomNumber] + '")';
    }
},10000);

    
// -----------------------------

// -----------------------------
//Scroll to Top Button
mybutton = document.getElementById("myBtn");
// When the user scrolls down 20px from the top of the document, show the button
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
    } else {
    mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.documentElement.scrollTop = 0; 
}
// -----------------------------

// -----------------------------
// Filter Gallery Images
let galleryFilter = document.querySelectorAll(".filter li");

galleryFilter.forEach(item => {
    item.addEventListener('click' ,  (e) => {
        
        let galleryImages = document.querySelectorAll(".images .box")

        galleryFilter.forEach(itm => {itm.classList.remove("active");});
        
        galleryImages.forEach(image => {
            if (e.target.dataset.servetype == "all"){
                image.style.display = "flex";
            }
            else {
                galleryImages.forEach(img => image.style.display = "flex");
                if(image.lastElementChild.lastElementChild.dataset.service != e.target.dataset.servetype) {
                    image.style.display = "none";
                }
            }
        });
        e.target.classList.add("active");
    })
});
// -----------------------------

// -----------------------------
// Create Popup for Images in Gallery section
let ourGalleryFrames = document.querySelectorAll(".gallery .image-frame");

ourGalleryFrames.forEach(frame => {
    frame.addEventListener('click' , (e) => {
        
        //Create overlay Element
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // Create popup box
        let popupBox = document.createElement("div")
        popupBox.className = "popup-box"
        let popupImage = document.createElement("img");
        popupImage.src = frame.children[0].src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // Create close Button
        let popupCloseBtn = document.createElement("span");
        popupCloseBtn.className = "close-popup"
        popupCloseBtn.innerText= "X";
        popupBox.appendChild(popupCloseBtn);
    });    
});

// Close Popup 
document.addEventListener('click' , function(e) {
    if(e.target.className == "close-popup"){
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})
// -----------------------------

// -----------------------------
// Change testimonials 
let allTestimonials = document.querySelectorAll(".testi-container .box");

let currentTestimonial = document.getElementsByClassName("act-box");
let currentTestimonialIndex =0;

function changeTestimonial(n) {
    let i=0;
    allTestimonials.forEach(box => {
        if (box.classList.contains("act-box")){
            currentTestimonialIndex = i;
        }
        bullets[i].classList.remove("active");
        i++;
    });
    
    if(n == 111 && currentTestimonialIndex < allTestimonials.length-1){
        allTestimonials[currentTestimonialIndex].classList.remove("act-box");
        allTestimonials[currentTestimonialIndex+1].classList.add("act-box");
        currentTestimonialIndex++;
    }
    else if(n == -111 && currentTestimonialIndex > 0){
        allTestimonials[currentTestimonialIndex].classList.remove("act-box");
        allTestimonials[currentTestimonialIndex-1].classList.add("act-box");
        currentTestimonialIndex--;
    }
    else if (n>=0 && n<allTestimonials.length){
        allTestimonials[currentTestimonialIndex].classList.remove("act-box");
        allTestimonials[n].classList.add("act-box");
        currentTestimonialIndex=n;
    }
    bullets[currentTestimonialIndex].classList.add("active");
}

// Change bullets color
let bullets = document.querySelectorAll(".dot");
bullets.forEach(bullet =>{
    bullet.addEventListener('click' , function (e){
        bullets.forEach(bull => {bull.classList.remove("active");});
        changeTestimonial(e.target.dataset.index);
        e.target.classList.add("active");
    })
    
});

// -----------------------------


// -----------------------------
// Animate Car and counters in About Page When Scroll to it
let aboutSecText = document.querySelector(".aboutSec .aboutInfo .secText");
let aboutCarImage = document.querySelector(".aboutSec .aboutInfo .secText img");

let aboutCounter = document.querySelector(".aboutSec .counters");
let aboutCountItem = document.querySelectorAll(".aboutSec .counters .content .box .counter")
window.onscroll = function () {
    scrollFunction();
    //Car
    if(document.title == "ZAZA - Car Wash - About"){
        if(this.pageYOffset > (aboutSecText.offsetTop + aboutSecText.offsetHeight - this.innerHeight)){
            aboutCarImage.style.transform ="translateX(50px)";
        };
    
        //Counters
        if(this.pageYOffset > (aboutCounter.offsetTop + aboutCounter.offsetHeight - this.innerHeight)){
            startCounters();
        }
    }
    
};

function startCounters() {
    aboutCountItem.forEach(item =>{
         setInterval(()=>{
            if(item.innerText < item.dataset.count){
                item.innerHTML++}
            else{
                clearInterval();
            }
            },5);    
    });
};

// Show and Hide Service Details
let servicesName = document.querySelectorAll(".servicesSec .serviceList .servItem h3");

servicesName.forEach(service => {
    let servicesNamePseudo = window.getComputedStyle(service, "::after");
    
    service.addEventListener('click' , (e) => {
        if(service.nextElementSibling.style.display == "none"){
            hideServiseDetails();
            service.nextElementSibling.style.display="flex";
            service.children[0].classList.replace("fa-caret-down","fa-caret-up")
        }
        else {
            service.nextElementSibling.style.display="none";
            service.children[0].classList.replace("fa-caret-up","fa-caret-down");
        }
    });
});

function hideServiseDetails () {
    document.querySelectorAll(".servicesSec .serviceList .servItem .serviceDetails").forEach(service => {
        service.style.cssText="display: none";
    });

    servicesName.forEach(icon => {
        icon.children[0].classList.replace("fa-caret-up","fa-caret-down");
    });
}

// Show and Hide Pricing Tabs
function openTab(e,packageName) {
    console.log(e.target);
    console.log(packageName);

    let tabcontent = document.getElementsByClassName("tabContent");
    let tabLinks = document.getElementsByClassName("tabLink");
    for(let i=0 ; i<tabcontent.length ; i++){
        tabcontent[i].style.display = "none";
        tabLinks[i].classList.remove("active");
    }
    document.getElementById(packageName).style.display = "flex";
    e.target.classList.add("active");
}