var CACHE_VERSION = 1,
  CURRENT_CACHES = { font: "font-cache-v" + CACHE_VERSION };
self.addEventListener("activate", function (e) {
  var t = Object.keys(CURRENT_CACHES).map(function (e) {
    return CURRENT_CACHES[e];
  });
  e.waitUntil(
    caches.keys().then(function (e) {
      return Promise.all(
        e.map(function (e) {
          if (-1 == t.indexOf(e))
            return (
              console.log("Deletando cache expirado:", e), caches.delete(e)
            );
        })
      );
    })
  );
}),
  self.addEventListener("fetch", function (e) {
    console.log("Obtendo evento fetch para", e.request.url),
      e.respondWith(
        caches.open(CURRENT_CACHES.font).then(function (t) {
          return t
            .match(e.request)
            .then(function (e) {
              if (e) return console.log(" Encontrou resposta em cache:", e), e;
            })
            .catch(function (e) {
              throw (console.error("  Erro na handler:", e), e);
            });
        })
      );
  }),
  window.addEventListener("scroll", (e) => {
    this.scrollY < 60
      ? document.querySelector("header").classList.remove("topoPequeno")
      : document.querySelector("header").classList.add("topoPequeno");
  });
let currentSlide = 0;
const slides = document.querySelectorAll(".slider div"),
  dots = document.querySelectorAll(".dot"),
  init = (e) => {
    slides.forEach((e, t) => {
      (e.style.display = "none"),
        dots.forEach((e, t) => {
          e.classList.remove("active");
        });
    }),
      (slides[e].style.display = "block"),
      dots[e].classList.add("active");
  };
document.addEventListener("DOMContentLoaded", init(currentSlide));
const next = () => {
    currentSlide >= slides.length - 1 ? (currentSlide = 0) : currentSlide++,
      init(currentSlide);
  },
  prev = () => {
    currentSlide <= 0 ? (currentSlide = slides.length - 1) : currentSlide--,
      init(currentSlide);
  };
document.querySelector(".next").addEventListener("click", next),
  document.querySelector(".prev").addEventListener("click", prev),
  setInterval(() => {
    next();
  }, 7500),
  dots.forEach((e, t) => {
    e.addEventListener("click", () => {
      console.log(currentSlide), init(t), (currentSlide = t);
    });
  });
