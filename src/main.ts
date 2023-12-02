type TypingData = {
  colData: string[];
  emphasis: number[];
}[][];

function colorSchemeControl() {
  const IS_ACTIVE = 'js-is-active';
  const container = document.querySelector('.js-color-scheme');
  const sun = document.querySelector('.fa-sun');
  const moon = document.querySelector('.fa-moon');

  container?.addEventListener('click', (ev) => {
    if (ev?.target instanceof Element) {
      if (ev.target.classList.contains('fa-sun')) {
        sun?.classList.add(IS_ACTIVE);
        moon?.classList.remove(IS_ACTIVE);
        document.documentElement.classList.remove('dark');
        return;
      }

      if (ev.target.classList.contains('fa-moon')) {
        moon?.classList.add(IS_ACTIVE);
        sun?.classList.remove(IS_ACTIVE);
        document.documentElement.classList.add('dark');
        return;
      }
    }
  });

  if (
    localStorage.getItem('color-theme') === 'dark' ||
    (!('color-theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)')
    ? moon?.classList.add(IS_ACTIVE)
    : sun?.classList.add(IS_ACTIVE);
}

function addTransition() {
  const IS_SHOWN = 'js-is-shown';
  const sectionList = document.querySelectorAll(
    'main > section > div > article'
  );
  sectionList.forEach((el) => el.classList.add('opacity-0'));

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(IS_SHOWN);
        }
      });
    },
    { threshold: 0.9 }
  );

  sectionList.forEach((el) => obs.observe(el));
}

function addEventsForMobile() {
  const desc = document.querySelector('.js-header-block-desc');
  const caret: HTMLElement = document.querySelector('.js-header-icon-caret')!;

  const HIDE = 'js-hide';
  const ROTATE = 'js-rotate';
  const listener = () => {
    desc?.classList.toggle(HIDE);
    caret?.classList.toggle(ROTATE);
  };
  caret?.addEventListener('click', listener);

  caret?.click();
}

function addTypingEffect() {
  const typingData = [
    [
      {
        colData: ['html', '&', 'css'],
        emphasis: [0],
      },
    ],
    [
      {
        colData: ['react'],
        emphasis: [0],
      },
    ],
    [
      {
        colData: ['vue'],
        emphasis: [0],
      },
    ],
    [
      {
        colData: ['angular'],
        emphasis: [0],
      },
    ],
  ];
  typingEffect(document.querySelector('.js-typing-container')!, typingData);
}

function addEfectsToProjects() {}

colorSchemeControl();
addTransition();
addEventsForMobile();
addTypingEffect();
addEfectsToProjects();

function typingEffect(container: Element, typingData: TypingData) {
  const ROW_CLASS = 'js-typing-row';
  const COL_CLASS = 'js-typing-col';
  const CURSOR_CLASS = 'js-typing-cursor';
  const EMPHASIS = 'emphasis';
  const BLINK = 'animate-blink';
  const SPACE = '\u00a0';
  const REG_EXP = /(\s*)/g;
  const TYPE_SPEED = 100;
  const ERASE_SPEED = 25;
  const WAIT_ERASE = 3000;
  const WAIT_TYPE = 1000;

  if (container.textContent && container.lastChild?.nodeType === 3) {
    container.textContent = container.textContent.trim();
  }

  const cursor = document.createElement('span');
  cursor.classList.add(CURSOR_CLASS, BLINK);
  cursor.append(SPACE);
  container.appendChild(cursor);

  let idx = 0;
  function start() {
    // to start erasing when container is empty
    if (container.textContent?.replace(REG_EXP, '')) {
      setTimeout(() => {
        erase().then(() => {
          start();
        });
      }, WAIT_ERASE);
    }

    // to start typing when container is not empty
    if (!container.textContent?.replace(REG_EXP, '')) {
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
      if (!document.querySelectorAll('.' + ROW_CLASS).length) {
        if (container.textContent) {
          typingData.push([
            { colData: [container.textContent.trim()], emphasis: [] },
          ]);

          const nr = document.createElement('div');
          nr.classList.add(ROW_CLASS);
          const nc = document.createElement('span');
          nc.classList.add(COL_CLASS);
          nc.append(container.textContent.trim());
          nr.appendChild(nc);
          nr.appendChild(cursor);

          container.textContent = '';
          container.appendChild(nr);
        }
      }
      // remove blink animation to cursor
      cursor.classList.remove(BLINK);

      const rows = document.querySelectorAll('.' + ROW_CLASS);
      const cols = document.querySelectorAll('.' + COL_CLASS);

      let r = rows.length - 1;
      let c = cols.length - 1;
      function loop() {
        setTimeout(() => {
          // move cursor to row above
          if (!rows[r].querySelectorAll('.' + COL_CLASS)[0].textContent) {
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
      if (document.querySelectorAll('.' + ROW_CLASS).length) {
        document.querySelectorAll('.' + ROW_CLASS).forEach((e) => e.remove());
      }

      data.forEach((d) => {
        const nr = document.createElement('div');
        nr.classList.add(ROW_CLASS);
        container.appendChild(nr);
        d.colData.forEach((_, i) => {
          const nc = document.createElement('span');
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
          const row = document.querySelectorAll('.' + ROW_CLASS)[r];
          const col = row.querySelectorAll('.' + COL_CLASS)[c];

          col.classList.contains(EMPHASIS)
            ? cursor.classList.add(EMPHASIS)
            : cursor.classList.remove(EMPHASIS);

          row.appendChild(cursor);
          col.textContent += data[r]['colData'][c][i];

          i++;

          if (col.textContent!.replace(REG_EXP, '') === data[r]['colData'][c]) {
            col.append(SPACE);
            c++;
            i = 0;
          }

          if (c === data[r]['colData'].length) {
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
