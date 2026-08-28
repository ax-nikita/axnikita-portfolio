let cleanupTimeline = () => {};

export function initAboutPage() {
  cleanupTimeline();

  const scroller = document.querySelector(".timeline-scroll");
  const wrap = document.querySelector(".timeline-scroll-wrap");

  if (!scroller || !wrap) {
    cleanupTimeline = () => {};
    return cleanupTimeline;
  }

  const controller = new AbortController();
  const { signal } = controller;
  let dragging = false;
  let pointerId = null;
  let startX = 0;
  let startScrollLeft = 0;

  const updateTimelineEdge = () => {
    const max = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    wrap.classList.toggle("is-end", max === 0 || scroller.scrollLeft >= max - 8);
  };

  const stopDrag = () => {
    if (!dragging) return;

    dragging = false;
    scroller.classList.remove("is-dragging");

    if (pointerId !== null && scroller.hasPointerCapture?.(pointerId)) {
      scroller.releasePointerCapture(pointerId);
    }

    pointerId = null;
  };

  scroller.addEventListener(
    "pointerdown",
    (event) => {
      if (event.pointerType === "touch" || event.button !== 0) return;

      const rect = scroller.getBoundingClientRect();
      const scrollbarTop = rect.top + scroller.clientHeight;
      if (event.clientY >= scrollbarTop) return;

      dragging = true;
      pointerId = event.pointerId;
      startX = event.clientX;
      startScrollLeft = scroller.scrollLeft;

      scroller.classList.add("is-dragging");
      scroller.setPointerCapture?.(event.pointerId);
    },
    { signal }
  );

  scroller.addEventListener(
    "pointermove",
    (event) => {
      if (!dragging || event.pointerId !== pointerId) return;

      scroller.scrollLeft = startScrollLeft - (event.clientX - startX);
      updateTimelineEdge();
      event.preventDefault();
    },
    { signal }
  );

  scroller.addEventListener("pointerup", stopDrag, { signal });
  scroller.addEventListener("pointercancel", stopDrag, { signal });
  scroller.addEventListener("lostpointercapture", stopDrag, { signal });
  scroller.addEventListener("dragstart", (event) => event.preventDefault(), { signal });
  scroller.addEventListener("scroll", updateTimelineEdge, { passive: true, signal });
  window.addEventListener("resize", updateTimelineEdge, { signal });

  updateTimelineEdge();

  cleanupTimeline = () => {
    stopDrag();
    controller.abort();
  };

  return cleanupTimeline;
}
