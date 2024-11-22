const tareas = JSON.parse(localStorage.getItem('tareas')) || [];

const actualizarLocalStorage = () => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
};

const renderizarTareas = () => {
    const listaTareas = document.getElementById('lista-tareas');
    listaTareas.innerHTML = tareas
        .map(
            (tarea, indice) => `
            <li>
                <span>${tarea.texto}</span>
                <button data-indice="${indice}" class="boton-eliminar">Eliminar</button>
            </li>
        `
        )
        .join('');

    document.querySelectorAll('.boton-eliminar').forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const indice = e.target.dataset.indice;
            tareas.splice(indice, 1);
            actualizarLocalStorage();
            renderizarTareas();
        });
    });
};

document.getElementById('formulario-tareas').addEventListener('submit', (e) => {
    e.preventDefault();
    const entradaTarea = document.getElementById('entrada-tarea');
    const textoTarea = entradaTarea.value.trim();

    if (textoTarea) {
        tareas.push({ texto: textoTarea });
        entradaTarea.value = '';
        actualizarLocalStorage();
        renderizarTareas();
    }
});

document.addEventListener('DOMContentLoaded', renderizarTareas);
