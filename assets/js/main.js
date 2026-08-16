/**
 * Portfolio Alex Medeiros
 * JavaScript principal
 */

(function () {
  "use strict";

  /**
   * Adiciona a classe .scrolled ao body
   * quando a página é rolada.
   */
  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");

    if (!body || !header) return;

    const isSticky =
      header.classList.contains("scroll-up-sticky") ||
      header.classList.contains("sticky-top") ||
      header.classList.contains("fixed-top");

    if (!isSticky) return;

    if (window.scrollY > 50) {
      body.classList.add("scrolled");
    } else {
      body.classList.remove("scrolled");
    }
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Menu mobile
   */
  const mobileNavToggleBtn = document.querySelector(
    ".mobile-nav-toggle"
  );

  function mobileNavToggle() {
    if (!mobileNavToggleBtn) return;

    document.body.classList.toggle("mobile-nav-active");

    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener(
      "click",
      mobileNavToggle
    );
  }

  /**
   * Fecha o menu mobile ao clicar em um link.
   */
  document.querySelectorAll("#navmenu a").forEach((navLink) => {
    navLink.addEventListener("click", () => {
      if (
        document.body.classList.contains(
          "mobile-nav-active"
        )
      ) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Dropdowns do menu mobile
   */
  document
    .querySelectorAll(".navmenu .toggle-dropdown")
    .forEach((dropdownToggle) => {
      dropdownToggle.addEventListener("click", function (event) {
        event.preventDefault();

        const parent = this.parentNode;

        if (!parent) return;

        parent.classList.toggle("active");

        const dropdown = parent.nextElementSibling;

        if (dropdown) {
          dropdown.classList.toggle("dropdown-active");
        }

        event.stopImmediatePropagation();
      });
    });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Botão voltar ao topo
   */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (!scrollTop) return;

    if (window.scrollY > 100) {
      scrollTop.classList.add("active");
    } else {
      scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    window.addEventListener("load", toggleScrollTop);
    document.addEventListener("scroll", toggleScrollTop);
  }

  /**
   * Inicialização do AOS
   */
  function aosInit() {
    if (typeof AOS === "undefined") return;

    AOS.init({
      duration: 650,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 60,
    });
  }

  window.addEventListener("load", aosInit);

  /**
   * GLightbox
   */
  if (typeof GLightbox !== "undefined") {
    GLightbox({
      selector: ".glightbox",
    });
  }

  /**
   * Isotope
   * Filtros dos projetos do portfólio
   */
  document
    .querySelectorAll(".isotope-layout")
    .forEach((isotopeItem) => {
      const isotopeContainer =
        isotopeItem.querySelector(".isotope-container");

      if (!isotopeContainer) return;

      const layout =
        isotopeItem.getAttribute("data-layout") || "masonry";

      const filter =
        isotopeItem.getAttribute("data-default-filter") || "*";

      const sort =
        isotopeItem.getAttribute("data-sort") ||
        "original-order";

      let initIsotope = null;

      function createIsotope() {
        if (typeof Isotope === "undefined") return;

        initIsotope = new Isotope(isotopeContainer, {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      }

      if (typeof imagesLoaded !== "undefined") {
        imagesLoaded(isotopeContainer, createIsotope);
      } else {
        createIsotope();
      }

      isotopeItem
        .querySelectorAll(".isotope-filters li")
        .forEach((filterItem) => {
          filterItem.addEventListener(
            "click",
            function () {
              const activeFilter =
                isotopeItem.querySelector(
                  ".isotope-filters .filter-active"
                );

              if (activeFilter) {
                activeFilter.classList.remove(
                  "filter-active"
                );
              }

              this.classList.add("filter-active");

              if (initIsotope) {
                initIsotope.arrange({
                  filter:
                    this.getAttribute("data-filter"),
                });
              }

              aosInit();
            },
            false
          );
        });
    });

  /**
   * Swiper
   */
  function initSwiper() {
    if (typeof Swiper === "undefined") return;

    document
      .querySelectorAll(".init-swiper")
      .forEach((swiperElement) => {
        const configElement =
          swiperElement.querySelector(".swiper-config");

        if (!configElement) return;

        try {
          const config = JSON.parse(
            configElement.innerHTML.trim()
          );

          new Swiper(swiperElement, config);
        } catch (error) {
          console.warn(
            "Não foi possível inicializar o Swiper:",
            error
          );
        }
      });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Corrige posição do scroll quando a página
   * é carregada com uma âncora na URL.
   */
  window.addEventListener("load", () => {
    if (!window.location.hash) return;

    const section = document.querySelector(
      window.location.hash
    );

    if (!section) return;

    setTimeout(() => {
      const scrollMarginTop =
        getComputedStyle(section).scrollMarginTop;

      window.scrollTo({
        top:
          section.offsetTop -
          (parseInt(scrollMarginTop) || 0),
        behavior: "smooth",
      });
    }, 100);
  });

  /**
   * Scroll suave para links internos
   */
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const header = document.querySelector("#header");

        const headerHeight = header
          ? header.offsetHeight
          : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      });
    });

  /**
   * Scrollspy
   *
   * Atualiza automaticamente o item ativo
   * no menu conforme o usuário navega pela página.
   */
  const navMenuLinks =
    document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    const position = window.scrollY + 200;

    navMenuLinks.forEach((navMenuLink) => {
      const hash = navMenuLink.hash;

      if (!hash) return;

      const section = document.querySelector(hash);

      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom =
        sectionTop + section.offsetHeight;

      if (
        position >= sectionTop &&
        position <= sectionBottom
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => {
            link.classList.remove("active");
          });

        navMenuLink.classList.add("active");
      } else {
        navMenuLink.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener(
    "scroll",
    navmenuScrollspy
  );

  /**
   * Atualiza automaticamente o ano do copyright.
   *
   * No HTML pode ser utilizado:
   *
   * <span class="current-year"></span>
   */
  const currentYear =
    document.querySelector(".current-year");

  if (currentYear) {
    currentYear.textContent =
      new Date().getFullYear();
  }
})();