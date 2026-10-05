import { StorageService } from '../js/services/storage.js';

const STORAGE_KEY = 'm3_dashboard_tasks';

const INITIAL_TASKS = [
  { id: '1', title: 'Aprender Geolocation API', status: 'done' },
  { id: '2', title: 'Implementar Fetch API', status: 'done' },
  { id: '3', title: 'Dominar Drag & Drop API', status: 'todo' }
];

class TaskBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tasks = StorageService.get(STORAGE_KEY, INITIAL_TASKS);
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  saveTasks() {
    StorageService.set(STORAGE_KEY, this.tasks);
  }

  /* --- EVENTOS Y DRAG & DROP --- */

  setupEvents() {
    const root = this.shadowRoot;

    // Formularios
    const form = root.querySelector('#task-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = root.querySelector('#task-input');
      const val = input.value.trim();
      if (val) {
        this.addTask(val);
        input.value = '';
      }
    });

    // Delegación para Drag & Drop
    root.addEventListener('dragstart', (e) => {
      if (e.target.classList.contains('task-item')) {
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
        e.target.classList.add('dragging');
      }
    });

    root.addEventListener('dragend', (e) => {
      if (e.target.classList.contains('task-item')) {
        e.target.classList.remove('dragging');
      }
    });

    // Zonas de soltar (Columnas)
    const columns = root.querySelectorAll('.column');
    columns.forEach((col) => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault(); // Necesario para permitir soltar
        col.classList.add('drag-over');
      });

      col.addEventListener('dragleave', () => {
        col.classList.remove('drag-over');
      });

      col.addEventListener('drop', (e) => {
        e.preventDefault();
        col.classList.remove('drag-over');
        const taskId = e.dataTransfer.getData('text/plain');
        const newStatus = col.dataset.status;
        this.updateTaskStatus(taskId, newStatus);
      });
    });
  }

  addTask(title) {
    const newTask = {
      id: Date.now().toString(),
      title,
      status: 'todo'
    };
    this.tasks.push(newTask);
    this.saveTasks();
    this.render();
    this.setupEvents();
  }

  updateTaskStatus(id, newStatus) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    this.saveTasks();
    this.render();
    this.setupEvents();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
    this.render();
    this.setupEvents();
  }

  /* --- RENDERIZADO --- */

  render() {
    const todoTasks = this.tasks.filter((t) => t.status === 'todo');
    const doneTasks = this.tasks.filter((t) => t.status === 'done');

    this.shadowRoot.innerHTML = `
      ${this.getStyles()}
      <div class="board-container">
        <h2>Gestor de Tareas (Drag & Drop)</h2>
        
        <form id="task-form" class="task-form">
          <input type="text" id="task-input" placeholder="Nueva tarea..." required>
          <button type="submit">Añadir</button>
        </form>

        <div class="columns-grid">
          <!-- Columna: Por hacer -->
          <div class="column" data-status="todo">
            <h3>Pendientes (${todoTasks.length})</h3>
            <div class="task-list">
              ${todoTasks.map((t) => this.renderTaskCard(t)).join('')}
            </div>
          </div>

          <!-- Columna: Completadas -->
          <div class="column" data-status="done">
            <h3>Completadas (${doneTasks.length})</h3>
            <div class="task-list">
              ${doneTasks.map((t) => this.renderTaskCard(t)).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    // Listener para botones de eliminar
    this.shadowRoot.querySelectorAll('.btn-delete').forEach((btn) => {
      btn.addEventListener('click', () => this.deleteTask(btn.dataset.id));
    });
  }

  renderTaskCard(task) {
    return `
      <div class="task-item" draggable="true" data-id="${task.id}">
        <span>${task.title}</span>
        <button class="btn-delete" data-id="${task.id}">✕</button>
      </div>
    `;
  }

  getStyles() {
    return `
      <style>
        :host {
          display: block;
          font-family: inherit;
        }
        .board-container {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        h2 {
          margin-top: 0;
          font-size: 1.3rem;
        }
        .task-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        .task-form input {
          flex: 1;
          padding: 0.5rem 0.8rem;
          border-radius: 4px;
          border: 1px solid #444;
          background: #222;
          color: #fff;
        }
        .task-form button {
          padding: 0.5rem 1rem;
          background: #238636;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .columns-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .column {
          background: rgba(0, 0, 0, 0.2);
          padding: 1rem;
          border-radius: 6px;
          border: 2px dashed transparent;
          min-height: 150px;
          transition: border-color 0.2s, background-color 0.2s;
        }
        .column.drag-over {
          border-color: #58a6ff;
          background: rgba(88, 166, 255, 0.1);
        }
        .column h3 {
          margin-top: 0;
          font-size: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.5rem;
        }
        .task-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .task-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.6rem 0.8rem;
          background: #2b2b2b;
          border-radius: 4px;
          cursor: grab;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .task-item.dragging {
          opacity: 0.4;
        }
        .btn-delete {
          background: transparent;
          border: none;
          color: #ff6b6b;
          cursor: pointer;
          font-weight: bold;
        }
      </style>
    `;
  }
}

customElements.define('task-board', TaskBoard);