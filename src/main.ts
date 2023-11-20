function addEventsForMobile() {
  document.body.addEventListener("click", (ev: MouseEvent) => {
    if (ev.target instanceof Element) {
      menuBtnClickHandler(ev.target);
      projectsBtnClickHandler(ev.target);
    }
  });

  function menuBtnClickHandler(target: Element) {
    const btn = document.querySelector(".mobile-menu-btn")!;
    const nav = document.querySelector("nav")!;

    if (btn.isEqualNode(target)) {
      if (btn.classList.contains("fa-bars")) {
        btn.classList.remove("fa-bars");
        btn.classList.add("fa-xmark");
      } else {
        btn.classList.remove("fa-xmark");
        btn.classList.add("fa-bars");
      }

      nav.classList.toggle("hidden");
    }

    if (!btn.isEqualNode(target) && btn.classList.contains("fa-xmark")) {
      btn.classList.remove("fa-xmark");
      btn.classList.add("fa-bars");
      nav.classList.toggle("hidden");
    }
  }

  function projectsBtnClickHandler(target: Element) {
    const HIDE_PROJECTS = "hidden";
    const SHOW_ALL = "Show All";
    const CLOSE = "Close";
    const btn = document.querySelector(".mobile-projects-btn")!;
    const cardList = document.querySelectorAll(".card")!;

    if (btn.isEqualNode(target)) {
      cardList.forEach((c, i) => {
        if (i > 0) {
          c.classList.toggle(HIDE_PROJECTS);
        }
      });

      btn.textContent?.trim() === CLOSE
        ? (btn.textContent = SHOW_ALL)
        : (btn.textContent = CLOSE);
    }
  }
}

function toggleHeaderVisibility() {
  const HIDE_HEADER = "-translate-y-full";
  const header = document.querySelector("header")!;
  const linkList = document.querySelectorAll(".nav-link");

  let scrollByLink = false;
  let before = 0;
  document.addEventListener("scroll", (ev) => {
    const y = document.body.getBoundingClientRect().y;
    if (before < y) {
      // scroll up;
      header.classList.remove(HIDE_HEADER);
    }

    if (before > y) {
      // scroll down;
      header.classList.add(HIDE_HEADER);
    }

    if (scrollByLink) {
      header.classList.add(HIDE_HEADER);
    }

    if (y === 0) {
      header.classList.remove(HIDE_HEADER);
    }

    before = y;
  });

  document.addEventListener("scrollend", () => (scrollByLink = false));

  linkList.forEach((el) => {
    el.addEventListener("click", () => {
      if (before !== 0) {
        header.classList.add(HIDE_HEADER);
        scrollByLink = true;
      }
    });
  });
}

addEventsForMobile();
toggleHeaderVisibility();
