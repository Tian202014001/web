/**
* Template Name: Medilab - v4.7.0
* Template URL: https://bootstrapmade.com/medilab-free-medical-bootstrap-theme/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()
const readMoreBtn1 = document.querySelector(".read-more-btn1");
const text1 = document.querySelector(".text1");

readMoreBtn1.addEventListener("click", (e) => {
  text1.classList.toggle("show-more");
  if (readMoreBtn1.innerText === "Read More") {
    readMoreBtn1.innerText = "Read Less";
  } else {
    readMoreBtn1.innerText = "Read More";
  }
});
const readMoreBtn2 = document.querySelector(".read-more-btn2");
const text2 = document.querySelector(".text2");

readMoreBtn2.addEventListener("click", (e) => {
  text2.classList.toggle("show-more");
  if (readMoreBtn2.innerText === "Read More") {
    readMoreBtn2.innerText = "Read Less";
  } else {
    readMoreBtn2.innerText = "Read More";
  }
});


const readMoreBtn3 = document.querySelector(".read-more-btn3");
const text3 = document.querySelector(".text3");

readMoreBtn3.addEventListener("click", (e) => {
  text3.classList.toggle("show-more");
  if (readMoreBtn3.innerText === "Read More") {
    readMoreBtn3.innerText = "Read Less";
  } else {
    readMoreBtn3.innerText = "Read More";
  }
});

const readMoreBtn4 = document.querySelector(".read-more-btn4");
const text4 = document.querySelector(".text4");

readMoreBtn4.addEventListener("click", (e) => {
  text4.classList.toggle("show-more");
  if (readMoreBtn4.innerText === "Read More") {
    readMoreBtn4.innerText = "Read Less";
  } else {
    readMoreBtn4.innerText = "Read More";
  }
});


const readMoreBtn5 = document.querySelector(".read-more-btn5");
const text5 = document.querySelector(".text5");

readMoreBtn5.addEventListener("click", (e) => {
  text5.classList.toggle("show-more");
  if (readMoreBtn5.innerText === "Read More") {
    readMoreBtn5.innerText = "Read Less";
  } else {
    readMoreBtn5.innerText = "Read More";
  }
});

const readMoreBtn6 = document.querySelector(".read-more-btn6");
const text6 = document.querySelector(".text6");

readMoreBtn6.addEventListener("click", (e) => {
  text6.classList.toggle("show-more");
  if (readMoreBtn6.innerText === "Read More") {
    readMoreBtn6.innerText = "Read Less";
  } else {
    readMoreBtn6.innerText = "Read More";
  }
});

// const readMoreBtn7 = document.querySelector(".read-more-btn7");
// const text7 = document.querySelector(".text7");

// readMoreBtn7.addEventListener("click", (e) => {
//   text7.classList.toggle("show-more");
//   if (readMoreBtn7.innerText === "Read More") {
//     readMoreBtn7.innerText = "Read Less";
//   } else {
//     readMoreBtn7.innerText = "Read More";
//   }
// });
// const readMoreBtn8 = document.querySelector(".read-more-btn8");
// const text8 = document.querySelector(".text8");
//  readMoreBtn8.addEventListener("click", (e) => {
//   text8.classList.toggle("show-more");
//   if (readMoreBtn8.innerText === "Read More") {
//     readMoreBtn8.innerText = "Read Less";   } else {     readMoreBtn8.innerText = "Read More";   } });

//  const readMoreBtn9 = document.querySelector(".read-more-btn9");
// const text9 = document.querySelector(".text9");

//  readMoreBtn9.addEventListener("click", (e) => {
//    text9.classList.toggle("show-more");
//    if (readMoreBtn9.innerText === "Read More") {
//      readMoreBtn9.innerText = "Read Less";
//    } else {
//      readMoreBtn9.innerText = "Read More";
//    }
//  }

const readMoreBtn10 = document.querySelector(".read-more-btn10");
const text10 = document.querySelector(".text10");

readMoreBtn10.addEventListener("click", (e) => {
  text10.classList.toggle("show-more");
  if (readMoreBtn10.innerText === "Read More") {
    readMoreBtn10.innerText = "Read Less";
  } else {
    readMoreBtn10.innerText = "Read More";
  }
})
const readMoreBtn11 = document.querySelector(".read-more-btn11");
const text11 = document.querySelector(".text11");

readMoreBtn11.addEventListener("click", (e) => {
  text11.classList.toggle("show-more");
  if (readMoreBtn11.innerText === "Read More") {
    readMoreBtn11.innerText = "Read Less";
  } else {
    readMoreBtn11.innerText = "Read More";
  }
});




// *********************
// This Code is for only the floating card in right bottom corner
// **********************

const touchButton = document.querySelector(".float-text");
const card = document.querySelector(".float-card-info");
const close = document.querySelector(".gg-close-r");

touchButton.addEventListener("click", moveCard);
close.addEventListener("click", moveCard);

function moveCard() {
  card.classList.toggle("active");
}

// function search() {
//   var id = document.getElementById("id1").value;

//   firebase.database().ref('User/' + id).once('value').then(function (snapshot) {
//     if (snapshot.exists()) {
//       var name_ = snapshot.val().name;
//       var id_ = snapshot.val().id;
//       var mail_ = snapshot.val().email;

//        var phone_ = snapshot.val().phone;
//        var appointment_date_ = snapshot.val().appointment_date;
//        var department_ = snapshot.val().department;
//        var doctor_ = snapshot.val().doctor;
//        var hospital_ = snapshot.val().hospital;
//        var message_ = snapshot.val().message;
//       document.getElementById("name").value = name_;
//       document.getElementById("id").value = id_;
//       document.getElementById("email").value = mail_;
//        document.getElementById("phone").value = phone_;
//        document.getElementById("appointment_date").value = appointment_date_;
//        document.getElementById("department").value = department_;
//        document.getElementById("doctor").value = doctor_;
//        document.getElementById("hospital").value = hospital_;
//        document.getElementById("message").value = message_;

//     }
//     else {

//     }
//   }, function (error) {
//     if (error)

//     } else {

//     }
//   });


// function show() {

//   var name = document.getElementById("name").value;
//   var id = document.getElementById("id").value;
//   var email = document.getElementById("email").value;
//    var phone = document.getElementById("phone").value;
//    var appointment_date = document.getElementById("date").value;
//    var department = document.getElementById("department").value;
//    var doctor = document.getElementById("doctor").value;
//    var hospital = document.getElementById("hospital").value;
//    var message = document.getElementById("message").value;



//   firebase.database().ref('User/' + id).set({
//     name: name,
//     id: id,
//     email: email,
//      phone: phone,
//      appointment_date: appointment_date,
//      department: department,
//      doctor: doctor,
//      hospital: hospital,
//      message: message
//   }, function (error) {
//     if (error) {
//       // The write failed...
//     } else {
//       alert("DONE");


//     }
//   });
// }

// function show1() {

//   var name = document.getElementById("name").value;
//   var email= document.getElementById("email").value;
//   var subject= document.getElementById("subject").value;
//   var message= document.getElementById("message").value;
  


//    firebase.database().ref('User/' + name).set({
//           name : name,
        

//           email : email,
//           subject:subject,
//           message:message
//         }, function(error) {
//           if (error) {
//             // The write failed...
//           } else {
//               alert("DONE");
            
         
//           }
//         });
// } 
function show2() {

  var name = document.getElementById("name").value;
  var email= document.getElementById("email").value;
  // var subject= document.getElementById("subject").value;
  var message= document.getElementById("message").value;
  


   firebase.database().ref('User/' + name).set({
          name : name,
        

          email : email,
          // subject:subject
           message:message
        }, function(error) {
          if (error) {
            // The write failed...
          } else {
              alert("DONE");
            
         
          }
        });
} 
// function search() 
// {
//     var name= document.getElementById("id1").value;

// firebase.database().ref('User/'+ name).once('value').then(function(snapshot) {
//                 if (snapshot.exists()) {
//                      var name_ = snapshot.val().name;
//                      var subject_ = snapshot.val().subject;
//                     var mail_ = snapshot.val().email;
//                     // var message_ = snapshot.val().message;
//                       document.getElementById("name").value = name_;
//                       document.getElementById("subject").value = subject_;
//                       document.getElementById("email").value =  mail_;
//                       // document.getElementById("message").value =  message_;
//                 }
//                 else
//                 {

//                 }
//         }, function(error) {
//             if (error) {

//             } else {

//             }
//           });
// }


