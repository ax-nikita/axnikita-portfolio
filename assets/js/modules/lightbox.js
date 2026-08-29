let bound = false;

export function initLightbox() {
  if (bound) return;
  bound = true;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox]");
    if (trigger) {
      event.preventDefault();

      const dialog = document.getElementById("lightbox");
      const image = dialog?.querySelector("img");
      if (!dialog || !image) return;

      image.src = trigger.dataset.lightbox;
      image.alt = trigger.querySelector("img")?.alt || "";
      dialog.showModal();
      return;
    }

    if (event.target.closest(".lightbox-close,[data-lightbox-close]") || event.target.matches("#lightbox")) {
      document.getElementById("lightbox")?.close();
    }
  });
}
