document.addEventListener("DOMContentLoaded", () => {
  const contactoForm = document.getElementById("contacto-form");

  contactoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombreconst = contactoForm.getElementById("nombre").value();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ScrollToBottomButton = document.getElementById("btn-ir-arriba");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      ScrollToBottomButton.style.display = "block";
    } else {
      ScrollToBottomButton.style.display = "none";
    }
  });

  ScrollToBottomButton.addEventListener("click", () => {
    window.scrollTo(top);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const ScrollToBottomButton = document.getElementById("btn-ir-arriba");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      ScrollToBottomButton.style.display = "block";
    } else {
      ScrollToBottomButton.style.display = "none";
    }
  });

  ScrollToBottomButton.addEventListener("click", () => {
    window.scrollTo(top);
  });
});
