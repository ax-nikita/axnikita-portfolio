let bound = false;

export function initLightbox() {
  if (bound) return;
  bound = true;

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-lightbox]");
    if (trigger) {
      event.preventDefault();
      openLightbox(trigger);
      return;
    }

    if (event.target.closest("[data-lightbox-close]") || event.target.matches("#lightbox")) {
      document.getElementById("lightbox")?.close();
    }
  });
}

function openLightbox(trigger) {
  const lightbox = document.getElementById("lightbox");
  const image = lightbox?.querySelector("img");

  if (!lightbox || !image) return;

  image.src = trigger.dataset.lightbox;
  image.alt = trigger.querySelector("img")?.alt || "";
  lightbox.showModal();
}
