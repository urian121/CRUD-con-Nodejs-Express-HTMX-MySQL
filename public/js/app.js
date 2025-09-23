// Solo mantener la función esencial para configurar modal de eliminación
function setupDeleteModal(taskId, taskTitle) {
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
    confirmBtn.setAttribute('hx-swap', 'outerHTML');
    
    // Reinicializar HTMX para el botón actualizado
    if (window.htmx) {
      window.htmx.process(confirmBtn);
    }
  }
}

// Función global disponible para uso en HTML
window.setupDeleteModal = setupDeleteModal;