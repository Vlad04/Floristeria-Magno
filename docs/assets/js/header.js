async function loadSharedHeader() {
  const container = document.getElementById('header-container');

  if (!container) {
    return;
  }

  try {
    const response = await fetch('components/header.html', {
      cache: 'no-cache'
    });

    if (!response.ok) {
      throw new Error(
        `No se pudo cargar el encabezado. HTTP ${response.status}`
      );
    }

    container.innerHTML = await response.text();

    initializeSharedHeader();
  } catch (error) {
    console.error('Error cargando el encabezado:', error);
  }
}

function initializeSharedHeader() {
  const navbar = document.getElementById('navbar');

  if (!navbar) {
    return;
  }

  // Cambia el estilo del encabezado al desplazarse.
  const handleNavbarScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  };

  window.addEventListener('scroll', handleNavbarScroll, {
    passive: true
  });

  handleNavbarScroll();

  // Determina en qué página se encuentra el usuario.
  const currentFile =
    window.location.pathname
      .split('/')
      .pop()
      .toLowerCase() || 'index.html';

  let currentPage = 'index';

  if (currentFile.includes('catalogo')) {
    currentPage = 'catalogo';
  } else if (currentFile.includes('rastreo')) {
    currentPage = 'rastreo';
  } else if (currentFile.includes('carrito')) {
    currentPage = 'carrito';
  }

  // Limpia cualquier estado activo anterior.
  navbar
    .querySelectorAll('.nav-link-custom')
    .forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });

  // Marca la página actual.
  let activeLink = navbar.querySelector(
    `[data-page="${currentPage}"]`
  );

  if (currentPage === 'index') {
    activeLink = navbar.querySelector(
      '[data-section="inicio"]'
    );
  }

  if (activeLink) {
    activeLink.classList.add('active');
    activeLink.setAttribute('aria-current', 'page');
  }

  // Activa el scroll spy existente de index.html después
  // de que el encabezado haya sido insertado.
  if (
    currentPage === 'index' &&
    typeof window.initNavbarScrollSpy === 'function'
  ) {
    window.initNavbarScrollSpy();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    loadSharedHeader
  );
} else {
  loadSharedHeader();
}