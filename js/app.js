/**
 * Proyecto Vivo UBP - Controlador de la SPA
 * Universidad Blas Pascal - Córdoba, Argentina
 */

import { store } from './state.js';

let currentCategory = 'legal';
let selectedMilestoneId = null;
let selectedMentorId = null;

const views = {
  inicio: document.getElementById('view-inicio'),
  hitos: document.getElementById('view-hitos'),
  mentores: document.getElementById('view-mentores'),
  final: document.getElementById('view-final')
};

const statusBar = document.getElementById('phone-status-bar');

/* ==========================================================================
   1. Enrutador y Navegación
   ========================================================================== */

function initRouter() {
  function handleHash() {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    navigateTo(hash, false);
  }

  window.addEventListener('hashchange', handleHash);
  handleHash();
}

export function navigateTo(routeId, updateHash = true) {
  if (!views[routeId]) {
    routeId = 'inicio';
  }

  // Activar vista
  Object.keys(views).forEach(key => {
    if (key === routeId) {
      views[key].classList.add('active');
    } else {
      views[key].classList.remove('active');
    }
  });

  // Actualizar tabs en todas las vistas
  document.querySelectorAll('.tab-link').forEach(link => {
    if (link.getAttribute('data-tab') === routeId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Ajustar color de la barra de estado según el fondo del encabezado
  if (statusBar) {
    if (routeId === 'hitos' || routeId === 'mentores') {
      statusBar.classList.add('dark-text');
    } else {
      statusBar.classList.remove('dark-text');
    }
  }

  if (updateHash && window.location.hash !== `#${routeId}`) {
    window.location.hash = routeId;
  }

  // Reset scroll del teléfono
  const screenContent = document.getElementById('phone-screen-container');
  if (screenContent) {
    screenContent.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/* ==========================================================================
   2. Renderizado de las 4 Pantallas del Prototipo
   ========================================================================== */

function renderAll() {
  renderScreen1();
  renderScreen2();
  renderScreen3();
  renderScreen4();
  renderDesktopControls();
}

// Pantalla 1: Subí tu proyecto
function renderScreen1() {
  const project = store.getProject();
  const inputNombre = document.getElementById('nombre');
  const inputMateria = document.getElementById('materia');
  const optThesis = document.getElementById('opt-thesis');
  const optPractice = document.getElementById('opt-practice');
  const pdfTitle = document.getElementById('pdf-box-title');
  const pdfSub = document.getElementById('pdf-box-sub');

  if (inputNombre && document.activeElement !== inputNombre) {
    inputNombre.value = project.name || '';
  }

  if (inputMateria && document.activeElement !== inputMateria) {
    inputMateria.value = project.subject || '';
  }

  if (optThesis && optPractice) {
    if (project.type === 'practice') {
      optPractice.classList.add('active');
      optThesis.classList.remove('active');
    } else {
      optThesis.classList.add('active');
      optPractice.classList.remove('active');
    }
  }

  if (project.pdfUploaded && pdfTitle && pdfSub) {
    pdfTitle.textContent = project.pdfUploaded.name;
    pdfSub.textContent = `Archivo adjunto · ${project.pdfUploaded.size}`;
  }
}

// Pantalla 2: Hitos y avisos
function renderScreen2() {
  const project = store.getProject();
  const milestones = store.getMilestones();
  const completed = store.getCompletedMilestonesCount();
  const total = store.getTotalMilestonesCount();
  const percent = store.getProgressPercentage();

  // Nombre de proyecto
  const nameEl = document.getElementById('hitos-project-name');
  if (nameEl) nameEl.textContent = project.name || 'App de reciclaje para el campus';

  // Semana y etiquetas de progreso
  const weekLabel = document.getElementById('hitos-week-label');
  if (weekLabel) weekLabel.textContent = `Semana ${project.currentWeek} de ${project.totalWeeks}`;

  const countLabel = document.getElementById('hitos-progress-count-label');
  if (countLabel) countLabel.textContent = `${completed} de ${total} hitos cumplidos`;

  const fillEl = document.getElementById('hitos-progress-bar-fill');
  if (fillEl) {
    fillEl.style.width = `${percent}%`;
    fillEl.style.background = percent === 100 ? '#2F6B4F' : '#9E1B34';
  }

  // Lista de 5 hitos con el estilo exacto del prototipo
  const wrapper = document.getElementById('milestones-list-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = milestones.map((m, index) => {
    let circleHtml = '';
    let badgeHtml = '';
    let fontStyle = 'font-size: 15px;';

    if (m.status === 'completed') {
      circleHtml = `
        <div class="circle-icon-green">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12l5 5L20 7"></path>
          </svg>
        </div>
      `;
      badgeHtml = `<div style="font-size: 12px; font-weight: 600; color: #2F6B4F">Hecho</div>`;
    } else if (m.status === 'in_progress') {
      circleHtml = `<div class="circle-icon-current"></div>`;
      badgeHtml = `<div style="font-size: 12px; font-weight: 600; color: #9E1B34">En curso</div>`;
      fontStyle = 'font-size: 15px; font-weight: 600;';
    } else {
      circleHtml = `<div class="circle-icon-pending"></div>`;
      badgeHtml = `<div style="font-size: 12px; color: #5B5560">[fecha]</div>`;
      fontStyle = 'font-size: 15px; color: #5B5560;';
    }

    return `
      <div class="milestone-row" data-milestone-id="${m.id}" title="Hacé clic para ver detalles o marcar">
        ${circleHtml}
        <div style="flex: 1; ${fontStyle}">${m.title}</div>
        ${badgeHtml}
      </div>
    `;
  }).join('');
}

// Pantalla 3: Mentor UBP
function renderScreen3() {
  const mentors = store.getMentors(currentCategory);
  const featured = mentors.find(m => m.isSuggested) || mentors[0];
  const secondary = mentors.find(m => m.id !== (featured ? featured.id : null)) || mentors[0];

  // Actualizar botones de categoría
  document.querySelectorAll('#mentor-categories-grid .btn-cat-choice').forEach(btn => {
    if (btn.getAttribute('data-category') === currentCategory) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Tarjeta de Mentor Sugerido
  const bigCard = document.getElementById('suggested-mentor-card');
  if (bigCard && featured) {
    bigCard.innerHTML = `
      <div style="display: flex; gap: 14px; align-items: center">
        <div class="mentor-avatar-circle-lg" style="background: ${featured.avatarColor};">${featured.initials}</div>
        <div style="display: flex; flex-direction: column; gap: 2px">
          <div style="font-size: 18px; font-weight: 700">${featured.name}</div>
          <div style="font-size: 14px; color: #5B5560">${featured.degree}</div>
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px">
        ${featured.tags.map(t => `
          <div style="font-size: 13px; padding: 6px 10px; border-radius: 8px; background: #E8EEF7; color: #1F4E8C; font-weight: 600">${t}</div>
        `).join('')}
      </div>
      <div style="font-size: 14px; line-height: 1.45; color: #3A363D">"${featured.quote}"</div>
      <button type="button" class="btn-mentor-talk" data-book-mentor="${featured.id}">Pedir una charla</button>
    `;
  }

  // Tarjeta de Segundo Mentor
  const secCard = document.getElementById('secondary-mentor-card');
  if (secCard && secondary && secondary.id !== (featured ? featured.id : null)) {
    secCard.style.display = 'flex';
    secCard.innerHTML = `
      <div class="mentor-avatar-circle-sm" style="background: ${secondary.avatarColor};">${secondary.initials}</div>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 2px">
        <div style="font-size: 15px; font-weight: 600">${secondary.name}</div>
        <div style="font-size: 13px; color: #5B5560">${secondary.role}</div>
      </div>
      <button type="button" class="btn-circle-action" data-book-mentor="${secondary.id}" aria-label="Pedir charla">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1C1B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 6l6 6-6 6"></path>
        </svg>
      </button>
    `;
  } else if (secCard) {
    secCard.style.display = 'none';
  }
}

// Pantalla 4: Presentación final
function renderScreen4() {
  const project = store.getProject();
  const completed = store.getCompletedMilestonesCount();
  const total = store.getTotalMilestonesCount();

  const statusPill = document.getElementById('final-status-pill');
  if (statusPill) statusPill.textContent = `${completed} de ${total} hitos`;

  const modeText = document.getElementById('final-mode-text');
  if (modeText) {
    modeText.textContent = project.type === 'practice'
      ? 'Como práctica profesional supervisada'
      : 'Como alternativa a tesis';
  }

  const dateText = document.getElementById('final-date-text');
  if (dateText) {
    dateText.textContent = `Fecha: ${project.presentationDate || '[a definir con tu docente]'}`;
  }

  // Botones de Continuidad
  const btnStartup = document.getElementById('btn-path-startup');
  const btnImpact = document.getElementById('btn-path-impact');
  if (btnStartup && btnImpact) {
    if (project.futurePath === 'impact') {
      btnImpact.classList.add('active');
      btnStartup.classList.remove('active');
    } else {
      btnStartup.classList.add('active');
      btnImpact.classList.remove('active');
    }
  }
}

// Controles auxiliares en barra superior desktop
function renderDesktopControls() {
  const isReady = store.isReadyForFinal();
  const toggleBtnText = document.getElementById('label-toggle-all');
  if (toggleBtnText) {
    toggleBtnText.textContent = isReady ? 'Volver a (2/5 hitos)' : 'Completar (5/5)';
  }
}

/* ==========================================================================
   3. Modales y Diálogos
   ========================================================================== */

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal && typeof modal.showModal === 'function') {
    modal.showModal();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal && typeof modal.close === 'function') {
    modal.close();
  }
}

function initDialogBackdrop() {
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const inBox = (
        rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width
      );
      if (!inBox) dialog.close();
    });

    dialog.querySelectorAll('[data-close-dialog]').forEach(btn => {
      btn.addEventListener('click', () => dialog.close());
    });
  });
}

function openMilestoneDetail(id) {
  selectedMilestoneId = id;
  const m = store.getMilestones().find(item => item.id === id);
  if (!m) return;

  const titleEl = document.getElementById('modal-milestone-title');
  const bodyEl = document.getElementById('modal-milestone-body');
  const actionBtn = document.getElementById('btn-complete-milestone');

  if (titleEl) titleEl.textContent = `Hito ${m.id}: ${m.title}`;

  if (bodyEl) {
    bodyEl.innerHTML = `
      <div style="font-size: 14px; line-height: 1.45; color: #1C1B1F; margin-bottom: 8px;">
        ${m.description}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; background: #F6F3EF; padding: 10px 14px; border-radius: 10px;">
        <span style="font-size: 13px; font-weight: 600;">Estado:</span>
        <span style="font-size: 13px; font-weight: 700; color: ${m.status === 'completed' ? '#2F6B4F' : (m.status === 'in_progress' ? '#9E1B34' : '#5B5560')}">
          ${m.status === 'completed' ? 'Hecho ✓' : (m.status === 'in_progress' ? 'En curso' : 'Pendiente')}
        </span>
      </div>

      ${m.feedback ? `
        <div style="font-size: 13px; color: #5B5560; background: #FFF4CC; padding: 10px 12px; border-radius: 10px; margin-top: 6px;">
          <strong>Devolución docente:</strong> "${m.feedback}"
        </div>
      ` : ''}
    `;
  }

  if (actionBtn) {
    actionBtn.textContent = m.status === 'completed' ? 'Marcar como pendiente' : 'Aprobar y completar hito';
    actionBtn.style.background = m.status === 'completed' ? '#5B5560' : '#9E1B34';
  }

  openModal('modal-milestone');
}

function openBookingModal(mentorId) {
  selectedMentorId = mentorId;
  const mentor = store.getMentors('all').find(m => m.id === mentorId);
  if (!mentor) return;

  const summary = document.getElementById('modal-booking-summary');
  if (summary) {
    summary.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center; background: #F6F3EF; padding: 10px 14px; border-radius: 12px;">
        <div class="mentor-avatar-circle-sm" style="background: ${mentor.avatarColor};">${mentor.initials}</div>
        <div>
          <div style="font-size: 14px; font-weight: 700;">${mentor.name}</div>
          <div style="font-size: 12px; color: #5B5560;">${mentor.degree}</div>
        </div>
      </div>
    `;
  }

  openModal('modal-booking');
}

/* ==========================================================================
   4. Notificaciones Toast
   ========================================================================== */

function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 200ms ease';
    setTimeout(() => toast.remove(), 220);
  }, duration);
}

/* ==========================================================================
   5. Event Listeners Interactivos
   ========================================================================== */

function initEvents() {
  // Navegación por tabs (Inicio, Hitos, Mentores, Final)
  document.addEventListener('click', (e) => {
    const tabLink = e.target.closest('.tab-link');
    if (tabLink) {
      e.preventDefault();
      const target = tabLink.getAttribute('data-tab');
      navigateTo(target);
      return;
    }

    // Botón "¿Te trabaste? Pedí ayuda" en Hitos
    if (e.target.closest('#btn-pedir-ayuda')) {
      e.preventDefault();
      navigateTo('mentores');
      return;
    }

    // Botones de categoría en Mentores
    const catBtn = e.target.closest('.btn-cat-choice');
    if (catBtn) {
      currentCategory = catBtn.getAttribute('data-category');
      renderScreen3();
      return;
    }

    // Botón "Pedir una charla"
    const bookBtn = e.target.closest('[data-book-mentor]');
    if (bookBtn) {
      const mentorId = bookBtn.getAttribute('data-book-mentor');
      openBookingModal(mentorId);
      return;
    }

    // Fila de hito en Pantalla 2
    const milestoneRow = e.target.closest('.milestone-row');
    if (milestoneRow) {
      const id = parseInt(milestoneRow.getAttribute('data-milestone-id'), 10);
      openMilestoneDetail(id);
      return;
    }
  });

  // Pantalla 1: Formulario
  const formSubi = document.getElementById('form-subi-proyecto');
  if (formSubi) {
    formSubi.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value.trim();
      const materia = document.getElementById('materia').value.trim();

      store.updateProject({
        name: nombre || 'App de reciclaje para el campus UBP',
        subject: materia || 'Innovación Tecnológica'
      });

      showToast('¡Proyecto subido! Redirigiendo a tus hitos...');
      navigateTo('hitos');
    });
  }

  // Toggles Alternativa a Tesis / Práctica
  const optThesis = document.getElementById('opt-thesis');
  const optPractice = document.getElementById('opt-practice');
  if (optThesis && optPractice) {
    optThesis.addEventListener('click', () => {
      store.updateProject({ type: 'thesis' });
      showToast('Seleccionado: Alternativa a tesis', 'info');
    });

    optPractice.addEventListener('click', () => {
      store.updateProject({ type: 'practice' });
      showToast('Seleccionado: Práctica profesional', 'info');
    });
  }

  // Dropzone PDF
  const dropzone = document.getElementById('dropzone-pdf');
  const fileInput = document.getElementById('file-pdf-input');
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        store.updateProject({
          pdfUploaded: {
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            date: 'Hoy',
            status: 'Subido'
          }
        });
        showToast(`Documento "${file.name}" cargado`);
      }
    });
  }

  // Acción Modal Hito
  const btnCompleteMilestone = document.getElementById('btn-complete-milestone');
  if (btnCompleteMilestone) {
    btnCompleteMilestone.addEventListener('click', () => {
      if (selectedMilestoneId) {
        store.toggleMilestone(selectedMilestoneId);
        closeModal('modal-milestone');
        showToast('Estado del hito actualizado');

        if (store.isReadyForFinal()) {
          setTimeout(() => {
            showToast('¡Todos los hitos completados! Ya podés ver tu presentación final.', 'success');
          }, 400);
        }
      }
    });
  }

  // Formulario Reserva Mentor
  const formBooking = document.getElementById('form-booking');
  if (formBooking) {
    formBooking.addEventListener('submit', (e) => {
      e.preventDefault();
      const mode = document.getElementById('booking-mode').value;
      const date = document.getElementById('booking-date').value;
      const query = document.getElementById('booking-query').value;

      store.bookMentorSession({
        mentorId: selectedMentorId,
        type: mode,
        date,
        topic: query
      });

      closeModal('modal-booking');
      showToast('¡Charla agendada con el graduado UBP!');
      formBooking.reset();
    });
  }

  // Pantalla 4: Selector de camino posterior
  const btnStartup = document.getElementById('btn-path-startup');
  const btnImpact = document.getElementById('btn-path-impact');
  if (btnStartup && btnImpact) {
    btnStartup.addEventListener('click', () => {
      store.setFuturePath('startup');
      showToast('Camino: Emprendimiento UBP DoingLABS', 'info');
    });

    btnImpact.addEventListener('click', () => {
      store.setFuturePath('impact');
      showToast('Camino: Iniciativa de Impacto', 'info');
    });
  }

  // Botón Agendar Presentación
  const btnAgendarPres = document.getElementById('btn-agendar-presentacion');
  if (btnAgendarPres) {
    btnAgendarPres.addEventListener('click', () => {
      openModal('modal-presentation');
    });
  }

  const formPres = document.getElementById('form-presentation-schedule');
  if (formPres) {
    formPres.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedDate = document.getElementById('pres-date').value;
      store.schedulePresentation({ date: selectedDate });
      closeModal('modal-presentation');
      showToast(`¡Defensa agendada: ${selectedDate}!`);
    });
  }

  // Controles Desktop
  const btnToggleAll = document.getElementById('btn-toggle-complete-all');
  if (btnToggleAll) {
    btnToggleAll.addEventListener('click', () => {
      if (store.isReadyForFinal()) {
        store.resetDemo();
        showToast('Estado reestablecido a 2/5 hitos');
      } else {
        store.completeAllMilestones();
        showToast('¡5 de 5 hitos completados!');
      }
    });
  }

  const btnDesktopReset = document.getElementById('btn-desktop-reset');
  if (btnDesktopReset) {
    btnDesktopReset.addEventListener('click', () => {
      store.resetDemo();
      showToast('Prototipo restablecido a valores originales');
      navigateTo('inicio');
    });
  }
}

/* ==========================================================================
   6. Inicialización
   ========================================================================== */

function initApp() {
  store.subscribe(() => {
    renderAll();
  });

  initRouter();
  initDialogBackdrop();
  initEvents();
  renderAll();
}

document.addEventListener('DOMContentLoaded', initApp);
