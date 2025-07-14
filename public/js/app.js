// Variables globales
let tasksDataTable;

// Inicializar aplicación cuando el DOM esté listo
$(document).ready(function() {
  initializeApp();
});

// Función principal de inicialización
function initializeApp() {
  // Solo inicializar DataTables si la tabla existe
  if ($('#tasksTable').length) {
    initializeDataTable();
  }
  
  // Inicializar tooltips
  initializeTooltips();
  
  // Configurar event listeners
  setupEventListeners();
}

// Función para inicializar DataTables
function initializeDataTable() {
  tasksDataTable = $('#tasksTable').DataTable({
    language: {
      url: 'https://cdn.datatables.net/plug-ins/2.0.3/i18n/es-ES.json'
    },
    pageLength: 10,
    lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "Todos"]],
    order: [[3, 'desc']], // Ordenar por fecha (columna 3) descendente
    columnDefs: [
      {
        targets: 'no-sort',
        orderable: false
      },
      {
        targets: 0, // Columna de estado
        width: '5%',
        className: 'text-center'
      },
      {
        targets: 4, // Columna de acciones
        width: '15%',
        className: 'text-center'
      }
    ],
    responsive: true,
    dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>' +
         '<"row"<"col-sm-12"tr>>' +
         '<"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
    drawCallback: function() {
      // Reinicializar tooltips después de cada redibujado
      initializeTooltips();
    }
  });
}

// Función para actualizar DataTables después de cambios HTMX
function refreshDataTable() {
  if (tasksDataTable) {
    tasksDataTable.destroy();
    tasksDataTable = null;
  }
  setTimeout(function() {
    if ($('#tasksTable').length) {
      initializeDataTable();
    }
  }, 100);
}

// Función para abrir el modal de edición
function openEditModal() {
  const editModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
  editModal.show();
}

// Función para cerrar el modal de edición
function closeEditModal() {
  const editModal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
  if (editModal) {
    editModal.hide();
  }
}

// Función para abrir el modal de vista de tarea
function openViewModal() {
  const viewModal = new bootstrap.Modal(document.getElementById('modal-view-task'));
  viewModal.show();
}

// Función para configurar la modal de eliminación
function setupDeleteModal(taskId, taskTitle) {
  console.log('Configurando modal para eliminar tarea:', taskId, taskTitle);
  
  // Establecer el título de la tarea en la modal
  const titleElement = document.getElementById('task-title-to-delete');
  if (titleElement) {
    titleElement.textContent = taskTitle;
  }
  
  // Configurar el botón de confirmación
  const confirmBtn = document.getElementById('confirm-delete-btn');
  if (confirmBtn) {
    confirmBtn.setAttribute('hx-delete', `/api/tasks/${taskId}`);
    confirmBtn.setAttribute('hx-target', `#task-${taskId}`);
    
    // Reinicializar HTMX para el botón actualizado
    if (window.htmx) {
      window.htmx.process(confirmBtn);
    }
    
    console.log('Botón configurado con:', {
      'hx-delete': confirmBtn.getAttribute('hx-delete'),
      'hx-target': confirmBtn.getAttribute('hx-target')
    });
  }
}

// Función para limpiar formulario
function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
}

// Función para inicializar tooltips
function initializeTooltips() {
  // Destruir tooltips existentes
  $('[data-bs-toggle="tooltip"]').tooltip('dispose');
  
  // Inicializar nuevos tooltips
  $('[title]').tooltip();
}

// Configurar event listeners
function setupEventListeners() {
  // Event listener para después de intercambios HTMX
  document.body.addEventListener('htmx:afterSwap', handleHTMXAfterSwap);
  
  // Event listener antes de intercambios HTMX
  document.body.addEventListener('htmx:beforeSwap', handleHTMXBeforeSwap);
  
  // Event listener para cuando se cierre el modal de agregar tarea
  document.getElementById('addTaskModal').addEventListener('hidden.bs.modal', function () {
    clearForm();
  });
}

// Manejar eventos después de intercambios HTMX
function handleHTMXAfterSwap(evt) {
  if (evt.detail.target.id === 'task-list' && evt.detail.xhr.status === 200) {
    // Cerrar modal después de agregar tarea exitosamente
    const addModal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
    if (addModal) {
      addModal.hide();
    }
    
    // Limpiar formulario
    clearForm();
    
    // Refrescar DataTables
    refreshDataTable();
  }
  
  // Refrescar DataTables después de editar o eliminar una tarea
  if (evt.detail.target.id && evt.detail.target.id.startsWith('task-')) {
    setTimeout(refreshDataTable, 100);
  }
}

// Manejar eventos antes de intercambios HTMX
function handleHTMXBeforeSwap(evt) {
  // Si se está actualizando la lista completa, destruir DataTables primero
  if (evt.detail.target.id === 'task-list') {
    if (tasksDataTable) {
      tasksDataTable.destroy();
      tasksDataTable = null;
    }
  }
}

// Funciones globales disponibles para uso en HTML
window.openEditModal = openEditModal;
window.closeEditModal = closeEditModal; 