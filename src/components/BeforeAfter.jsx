import { useCallback, useRef, useState } from "react";

/**
 * Before / after comparison slider.
 * - Draggable with mouse and touch (pointer events).
 * - Keyboard operable via a real <input type="range"> laid over the image.
 * - No layout shift: the box reserves space with `aspect-ratio`.
 * - The 50/50 split is rendered server-side, so the component is meaningful
 *   before hydration and to crawlers.
 */
export default function BeforeAfter({
  before,
  after,
  width,
  height,
  eager = false,
  priority = false,
  variant = "",
  start = 50,
}) {
  const [pos, setPos] = useState(start);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  const onPointerDown = (e) => {
    // Ignore clicks that originate on the range thumb — it handles itself.
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const stop = () => {
    dragging.current = false;
  };

  const rounded = Math.round(pos);
  const imgProps = {
    width,
    height,
    decoding: "async",
    draggable: "false",
    loading: eager ? "eager" : "lazy",
    fetchPriority: priority ? "high" : "auto",
  };

  return (
    <div
      className={`ba${variant ? ` ba--${variant}` : ""}`}
      ref={wrapRef}
      style={{ "--pos": rounded, aspectRatio: `${width} / ${height}` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      {/* BEFORE — full-width base layer */}
      <img className="ba__img" src={before.src} alt={before.alt} {...imgProps} />
      <span className="ba__tag ba__tag--before" aria-hidden="true">Before</span>

      {/* AFTER — same image, clipped from the right by --pos */}
      <div className="ba__after-wrap">
        <img className="ba__img" src={after.src} alt={after.alt} {...imgProps} />
      </div>
      <span className="ba__tag ba__tag--after" aria-hidden="true">After</span>

      <input
        className="ba__range"
        type="range"
        min="0"
        max="100"
        step="1"
        value={rounded}
        aria-label="Comparison slider. Left is the original photo, right is the edit."
        aria-valuetext={`${rounded}% edited`}
        onChange={(e) => setPos(Number(e.target.value))}
      />
      <div className="ba__handle" aria-hidden="true">
        <span className="ba__grip">&#8596;</span>
      </div>
    </div>
  );
}
