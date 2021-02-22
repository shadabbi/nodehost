// clone of navBar

const nav = document.querySelector("nav");
const navContainer = document.querySelector(".navContainer");

const cloneNav = nav.cloneNode(true);

navContainer.append(cloneNav);

cloneNav.classList.add("nav2");

window.addEventListener("scroll", () => {
  const top = window.pageYOffset;
  if (top > 400) {
    cloneNav.style.top = 0;
    cloneNav.style.opacity = 1;
    cloneNav.style.position = "fixed";
  } else {
    cloneNav.style.top = "-170%";
  }
});

// crousel

const carousel2 = document.querySelector(".carousel-2");

if (carousel2) {
  $(".carousel-2").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });
}

const carousel3 = document.querySelector(".carousel-3");

if (carousel3) {
  $(".carousel-3").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 2,
      },
    },
  });
}

const carousel4 = document.querySelector(".carousel-4");

if (carousel4) {
  $(".carousel-4").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  });
}

const carousel = document.querySelector(".owl-carousel");

if (carousel) {
  const owl = $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    items: 1,
  });
}

anim();

setInterval(() => {
  anim();
}, 5000);

function anim() {
  const item = document.querySelector(".owl-item.active");
  if (item) {
    const first = item.querySelector(".first");
    const second = item.querySelector(".second");
    if (first && second) {
      setTimeout(() => {
        first.style.animationName = "slide-text-first";
        second.style.animationName = "slide-text-second";
      }, 100);

      first.style.animationName = "none";
      second.style.animationName = "none";
    }
  }
}

// counter

const counter = document.querySelectorAll(".counter p");

function set(input, value) {
  let sum = 0;
  const id = setInterval(() => {
    sum += 1;
    if (sum <= value) {
      input.textContent = sum;
    }
    if (sum > value) {
      clearInterval(id);
    }
  }, 10);
}

let shouldStart = false;

const checkPageOffset = () => {
  if (pageYOffset >= 470) {
    shouldStart = true;
    startCounter();
    removeEventListener("scroll", checkPageOffset);
  }
};

window.addEventListener("scroll", checkPageOffset);

const startCounter = () => {
  counter.forEach((element) => {
    set(element, +element.getAttribute("data-value"));
  });
};

// masonry

const grid = document.querySelector(".grid");

if (grid) {
  $(".grid").masonry({
    itemSelector: ".grid-item",
    columnWidth: 120,
    fitWidth: true,
    gutter: 0,
  });
}

// lighcase

const lightcase = document.querySelector(".masonry-grid");

if (lightcase) {
  jQuery(document).ready(function ($) {
    $("a[data-rel^=lightcase]").lightcase();
  });
}

// news

const newsSlider = document.querySelector(".listContainer ul");

if (newsSlider) {
  let sum = 0;

  setInterval(() => {
    if (sum <= -67) {
      sum = 0;
    } else {
      sum += -17;
    }
    newsSlider.style.transform = `translateY(${sum}%)`;
  }, 4000);
}
