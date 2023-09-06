document.addEventListener("DOMContentLoaded", ()=>{
    const contactoForm = document.getElementById('contacto-form');

    contactoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombreconst = contactoForm.getElementById('nombre').value();
    })
})