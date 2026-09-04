import { useId, useState } from "react";

/**
 * FAQ accordion. Every answer is present in the server-rendered HTML (collapsed
 * with the `hidden` attribute, not injected by JS), and the same text is also
 * emitted as FAQPage JSON-LD on the page, so search and AI crawlers get it
 * regardless of hydration.
 */
export default function FaqAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const base = useId();

  return (
    <div className="faq">
      {items.map((item, i) => {
        const expanded = openIndex === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div className="faq__item" key={item.q}>
            <h3 style={{ margin: 0 }}>
              <button
                id={btnId}
                type="button"
                className="faq__q"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpenIndex(expanded ? null : i)}
              >
                <span>{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="faq__a"
              hidden={!expanded}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
