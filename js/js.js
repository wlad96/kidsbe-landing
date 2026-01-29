(function () {
    const tabLinks = document.querySelectorAll('.methodsTabsHeader__link');
    const tabBlocks = document.querySelectorAll('.methodsTabs__block');
  
    if (!tabLinks.length || !tabBlocks.length) return;
  
    function openTab(link) {
      const tabId = link.dataset.id;
      const target = document.getElementById(`block-${tabId}`);
  
      if (!target) return;
  
      // активная кнопка
      tabLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
  
      // закрыть все табы
      tabBlocks.forEach(block => {
        block.classList.remove('active');
        block.style.maxHeight = '0';
      });
  
      // открыть нужный
      target.classList.add('active');
      target.style.maxHeight = target.scrollHeight + 'px';
    }
  
    // клики
    tabLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        openTab(link);
      });
    });
  
    // ResizeObserver — если контент меняется
    const observer = new ResizeObserver(entries => {
      entries.forEach(entry => {
        if (entry.target.classList.contains('active')) {
          entry.target.style.maxHeight = entry.target.scrollHeight + 'px';
        }
      });
    });
  
    tabBlocks.forEach(block => observer.observe(block));
  
    // инициализация активного
    const activeLink = document.querySelector('.methodsTabsHeader__link.active');
    if (activeLink) {
      openTab(activeLink);
    }
  })();


  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.js-header-nav');
    const headerTop = document.querySelector('.header__top');

    let lastScroll = 0;

    const getActiveHeader = () => {
        return window.innerWidth < 1024 ? headerTop : nav;
    };

    const getTriggerHeight = () => {
        return window.innerWidth < 1024
            ? headerTop.offsetHeight
            : document.querySelector('.header__top').offsetHeight;
    };

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const activeHeader = getActiveHeader();
        const triggerHeight = getTriggerHeight();

        if (!activeHeader) return;

        if (currentScroll > triggerHeight) {
            activeHeader.classList.add('is-fixed');

            if (currentScroll > lastScroll) {
                // activeHeader.classList.add('is-hidden');
            } else {
                // activeHeader.classList.remove('is-hidden');
            }
        } else {
            activeHeader.classList.remove('is-fixed');
            // activeHeader.classList.remove('is-hidden');
        }

        lastScroll = currentScroll;
    });

    window.addEventListener('resize', () => {
        nav.classList.remove('is-fixed');
        headerTop.classList.remove('is-fixed');
    });
});


document.addEventListener('DOMContentLoaded', () => {

    /* ===== ОБЩИЕ ПЕРЕМЕННЫЕ ===== */
    const nav = document.querySelector('.js-header-nav');
    const navHeight = nav.offsetHeight;

    /* ===== NAV LINKS ===== */
    const links = [...document.querySelectorAll('.nav__link')];

    const sections = links
        .map(link => {
            const id = link.dataset.target;
            const section = document.getElementById(id);
            if (!section) return null;
            return { link, section };
        })
        .filter(Boolean);

    /* ===== ПЛАВНЫЙ СКРОЛЛ ===== */
    function smoothScroll(link) {
        const target = document.getElementById(link.dataset.target);
        if (!target) return;

        const y = target.offsetTop - navHeight + 1;

        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    }

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            smoothScroll(link);
        });
    });

    /* ===== SCROLL SPY ===== */
    function setActiveByScroll() {
        const scrollPos = window.scrollY + navHeight + 10;
        let current = null;

        for (const item of sections) {
            if (scrollPos >= item.section.offsetTop) {
                current = item;
            }
        }

        if (!current) return;

        links.forEach(l => l.parentElement.classList.remove('active'));
        current.link.parentElement.classList.add('active');
    }

    window.addEventListener('scroll', setActiveByScroll);
    window.addEventListener('resize', setActiveByScroll);
    setActiveByScroll();

    /* ===== MOBILE MENU ===== */
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const openBtn = document.querySelector('.mobile__menuBtn');

    const logo = document.querySelector('.header__left').cloneNode(true);
    const menu = document.querySelector('.nav').cloneNode(true);
    const socials = document.querySelector('.socials').cloneNode(true);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('mobile-menu__close');
    closeBtn.innerHTML = '<i class="hgi hgi-stroke hgi-cancel-square"></i>';

    mobileMenu.append(closeBtn, logo, menu, socials);

    const openMenu = () => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('open');
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('open');
    };

    openBtn.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);
    closeBtn.addEventListener('click', closeMenu);

    /* ===== LINKS В МОБИЛЬНОМ МЕНЮ ===== */
    const mobileLinks = mobileMenu.querySelectorAll('.nav__link');

    mobileLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();

            smoothScroll(link);
            closeMenu();

            setTimeout(setActiveByScroll, 300);
        });
    });

});


document.addEventListener('DOMContentLoaded', () => {

    const scrollTopBtn = document.querySelector('.js-scroll-top');
    const showAfter = 400;

    function toggleScrollTopBtn() {
        if (window.scrollY > showAfter) {
            scrollTopBtn.classList.add('is-visible');
        } else {
            scrollTopBtn.classList.remove('is-visible');
        }
    }

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    toggleScrollTopBtn();
    window.addEventListener('scroll', toggleScrollTopBtn);

});

const searchOverlay = document.getElementById('applicationOverlay');

function toggleSearch(open = true) {
    if (open) {
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// закрытие по клику на фон
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        toggleSearch(false);
    }
});

// закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        toggleSearch(false);
    }
});

