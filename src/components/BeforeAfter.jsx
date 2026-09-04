import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Before / after comparison slider.
 * - Draggable with mouse and touch (pointer events).
 * - Keyboard operable via a real <input type="range"> laid over the image.
 * - No layout shift: the box reserves space with `aspect-ratio`.
 * - The 50/50 split renders server-side, so the component is meaningful before
 *   hydration and to crawlers.
 * - `sweep` ("load" | "inview") plays a one-time divider sweep so it reads as
 *   draggable. It never runs under prefers-reduced-motion, and it stops the
 *   moment the viewer touches the control.
 */
export default function BeforeAfter({
  before,
  after,
  width,
  height,
  eager = false,
  priority = false,
  variant = "",
  sweep = "none",
  start = 50,
}) {
  const [pos, setPos] = useState(start);
  const [touched, setTouched] = useState(false);
  const [sweeping, setSweeping] = useState(false);
  const wrapRef = useRef(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, next)));
  }, []);

  // One-time reveal sweep.
  useEffect(() => {
    if (sweep === "none" || touched) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;

    let timer;
    const play = () => {
      timer = window.setTimeout(() => setSweeping(true), 350);
    };

    if (sweep === "load") {
      play();
      return () => window.clearTimeout(timer);
    }

    // sweep === "inview"
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [sweep, touched]);

  const markTouched = () => {
    if (!touched) setTouched(true);
    if (sweeping) setSweeping(false);
  };

  const onPointerDown = (e) => {
    markTouched();
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

  // Inline --pos only takes over once the viewer has interacted; before that
  // the CSS sweep animation owns the property.
  const style = { aspectRatio: `${width} / ${height}` };
  if (touched) style["--pos"] = rounded;

  return (
    <div
      className={
        `ba${variant ? ` ba--${variant}` : ""}` +
        (sweeping && !touched ? " is-sweeping" : "")
      }
      ref={wrapRef}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
      onAnimationEnd={() => setSweeping(false)}
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
        value={touched ? rounded : 50}
        aria-label="Comparison slider. Left is the original photo, right is the edit."
        aria-valuetext={`${touched ? rounded : 50}% edited`}
        onChange={(e) => {
          markTouched();
          setPos(Number(e.target.value));
        }}
        onKeyDown={markTouched}
      />
      <div className="ba__handle" aria-hidden="true">
        <span className="ba__grip">&#8596;</span>
      </div>
    </div>
  );
}
