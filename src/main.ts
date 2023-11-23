// function addEventsForMobile() {
//   document.body.addEventListener("click", (ev: MouseEvent) => {
//     if (ev.target instanceof Element) {
//       menuBtnClickHandler(ev.target);
//       projectsBtnClickHandler(ev.target);
//     }
//   });

//   function menuBtnClickHandler(target: Element) {
//     const btn = document.querySelector(".mobile-menu-btn")!;
//     const nav = document.querySelector("nav")!;

//     if (btn.isEqualNode(target)) {
//       if (btn.classList.contains("fa-bars")) {
//         btn.classList.remove("fa-bars");
//         btn.classList.add("fa-xmark");
//       } else {
//         btn.classList.remove("fa-xmark");
//         btn.classList.add("fa-bars");
//       }

//       nav.classList.toggle("hidden");
//     }

//     if (!btn.isEqualNode(target) && btn.classList.contains("fa-xmark")) {
//       btn.classList.remove("fa-xmark");
//       btn.classList.add("fa-bars");
//       nav.classList.toggle("hidden");
//     }
//   }

//   function projectsBtnClickHandler(target: Element) {
//     const HIDE_PROJECTS = "hidden";
//     const SHOW_ALL = "Show All";
//     const CLOSE = "Close";
//     const btn = document.querySelector(".mobile-projects-btn")!;
//     const cardList = document.querySelectorAll(".card")!;

//     if (btn.isEqualNode(target)) {
//       cardList.forEach((c, i) => {
//         if (i > 0) {
//           c.classList.toggle(HIDE_PROJECTS);
//         }
//       });

//       btn.textContent?.trim() === CLOSE
//         ? (btn.textContent = SHOW_ALL)
//         : (btn.textContent = CLOSE);
//     }
//   }
// }

// function toggleHeaderVisibility() {
//   const HIDE_HEADER = "-translate-y-full";
//   const header = document.querySelector("header")!;
//   const linkList = document.querySelectorAll(".nav-link");

//   let scrollByLink = false;
//   let before = 0;
//   document.addEventListener("scroll", () => {
//     const y = document.body.getBoundingClientRect().y;
//     if (before < y) {
//       // scroll up;
//       header.classList.remove(HIDE_HEADER);
//     }

//     if (before > y) {
//       // scroll down;
//       header.classList.add(HIDE_HEADER);
//     }

//     if (scrollByLink) {
//       header.classList.add(HIDE_HEADER);
//     }

//     if (y === 0) {
//       header.classList.remove(HIDE_HEADER);
//     }

//     before = y;
//   });

//   document.addEventListener("scrollend", () => (scrollByLink = false));

//   linkList.forEach((el) => {
//     el.addEventListener("click", () => {
//       if (before !== 0) {
//         header.classList.add(HIDE_HEADER);
//         scrollByLink = true;
//       }
//     });
//   });
// }

// addEventsForMobile();
// toggleHeaderVisibility();

type TypingData = {
  colData: string[];
  emphasis: number[];
}[][];

function addEventsForMobile() {
  const desc = document.querySelector(".js-header-block-desc");
  const caret: HTMLElement = document.querySelector(".js-header-icon-caret")!;

  const HIDE = "js-hide";
  const ROTATE = "js-rotate";
  const listener = () => {
    desc?.classList.toggle(HIDE);
    caret?.classList.toggle(ROTATE);
  };
  caret?.addEventListener("click", listener);

  caret?.click();
}

function headerTypingEffect() {
  const typingData = [
    [
      {
        colData: ["html", "&", "css"],
        emphasis: [0],
      },
    ],
    [
      {
        colData: ["react"],
        emphasis: [0],
      },
    ],
    [
      {
        colData: ["vue"],
        emphasis: [0],
      },
    ],
    [
      {
        colData: ["angular"],
        emphasis: [0],
      },
    ],
  ];
  typingEffect(document.querySelector(".js-typing-container")!, typingData);
}

function addEfectsToProjects() {
  const container = document.querySelector(".js-slide-container")!;
  const articleList = Array.from(container.querySelectorAll("article"));
}

addEventsForMobile();
headerTypingEffect();
addEfectsToProjects();

function typingEffect(container: Element, typingData: TypingData) {
  const ROW_CLASS = "js-typing-row";
  const COL_CLASS = "js-typing-col";
  const CURSOR_CLASS = "js-typing-cursor";
  const EMPHASIS = "emphasis";
  const BLINK = "animate-blink";
  const SPACE = "\u00a0";
  const REG_EXP = /(\s*)/g;
  const TYPE_SPEED = 100;
  const ERASE_SPEED = 25;
  const WAIT_ERASE = 3000;
  const WAIT_TYPE = 1000;

  if (container.textContent && container.lastChild?.nodeType === 3) {
    container.textContent = container.textContent.trim();
  }

  const cursor = document.createElement("span");
  cursor.classList.add(CURSOR_CLASS, BLINK);
  cursor.append(SPACE);
  container.appendChild(cursor);

  let idx = 0;
  function start() {
    // to start erasing when container is empty
    if (container.textContent?.replace(REG_EXP, "")) {
      setTimeout(() => {
        erase().then(() => {
          start();
        });
      }, WAIT_ERASE);
    }

    // to start typing when container is not empty
    if (!container.textContent?.replace(REG_EXP, "")) {
      setTimeout(() => {
        type(typingData[idx++]).then(() => {
          start();
        });
      }, WAIT_TYPE);

      // reset typingData to the first when the data reach to the last
      if (idx > typingData.length - 1) idx = 0;
    }
  }

  function erase() {
    return new Promise((resolve) => {
      if (!document.querySelectorAll("." + ROW_CLASS).length) {
        if (container.textContent) {
          typingData.push([
            { colData: [container.textContent.trim()], emphasis: [] },
          ]);

          const nr = document.createElement("div");
          nr.classList.add(ROW_CLASS);
          const nc = document.createElement("span");
          nc.classList.add(COL_CLASS);
          nc.append(container.textContent.trim());
          nr.appendChild(nc);
          nr.appendChild(cursor);

          container.textContent = "";
          container.appendChild(nr);
        }
      }
      // remove blink animation to cursor
      cursor.classList.remove(BLINK);

      const rows = document.querySelectorAll("." + ROW_CLASS);
      const cols = document.querySelectorAll("." + COL_CLASS);

      let r = rows.length - 1;
      let c = cols.length - 1;
      function loop() {
        setTimeout(() => {
          // move cursor to row above
          if (!rows[r].querySelectorAll("." + COL_CLASS)[0].textContent) {
            rows[--r].appendChild(cursor);
          }

          // select certain text content to erase
          if (!cols[c].textContent) {
            c--;
          }

          // toggle emphasis style of cursor
          cols[c].classList.contains(EMPHASIS)
            ? cursor.classList.add(EMPHASIS)
            : cursor.classList.remove(EMPHASIS);

          // erase text letter by letter
          cols[c].textContent = cols[c].textContent!.substring(
            cols[c].textContent!.length - 1,
            0
          );

          // force to stop loop
          if (!cols[0].textContent!.length) {
            // add blink animation to cursor
            container.append(cursor);
            cursor.classList.add(BLINK);
            resolve(0);
            return;
          }

          loop();
        }, ERASE_SPEED);
      }

      loop();
    });
  }

  function type(data = typingData[0]) {
    return new Promise((resolve) => {
      if (document.querySelectorAll("." + ROW_CLASS).length) {
        document.querySelectorAll("." + ROW_CLASS).forEach((e) => e.remove());
      }

      data.forEach((d) => {
        const nr = document.createElement("div");
        nr.classList.add(ROW_CLASS);
        container.appendChild(nr);
        d.colData.forEach((_, i) => {
          const nc = document.createElement("span");
          nc.classList.add(COL_CLASS);
          if (d.emphasis.includes(i)) nc.classList.add(EMPHASIS);
          nr.appendChild(nc);
        });
      });

      // remove blink animation to cursor
      cursor.classList.remove(BLINK);

      let r = 0;
      let c = 0;
      let i = 0;
      function loop() {
        // remove SPACE
        if (container.childNodes[0].nodeType === 3) {
          container.childNodes[0].remove();
        }

        setTimeout(() => {
          const row = document.querySelectorAll("." + ROW_CLASS)[r];
          const col = row.querySelectorAll("." + COL_CLASS)[c];

          col.classList.contains(EMPHASIS)
            ? cursor.classList.add(EMPHASIS)
            : cursor.classList.remove(EMPHASIS);

          row.appendChild(cursor);
          col.textContent += data[r]["colData"][c][i];

          i++;

          if (col.textContent!.replace(REG_EXP, "") === data[r]["colData"][c]) {
            col.append(SPACE);
            c++;
            i = 0;
          }

          if (c === data[r]["colData"].length) {
            r++;
            c = 0;
          }

          if (r === data.length) {
            col.textContent = col.textContent!.trim();
            cursor.classList.add(BLINK);
            resolve(0);
            return;
          }
          loop();
        }, TYPE_SPEED);
      }
      loop();
    });
  }

  start();
}
