import * as React from "react";

const cx = (...values) => values.filter(Boolean).join(" ");

/** A semantic button with consistent variants. Bring your own React and styles. */
export const Button = React.forwardRef(function Button({ className, variant = "primary", type = "button", ...props }, ref) {
  return React.createElement("button", { ref, type, className: cx("at-button", `at-button--${variant}`, className), ...props });
});

/** A labelled native input with description and error support. */
export const Field = React.forwardRef(function Field({ className, description, error, id, label, ...props }, ref) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const describedBy = [description ? `${inputId}-description` : null, error ? `${inputId}-error` : null].filter(Boolean).join(" ") || undefined;
  return React.createElement("label", { className: cx("at-field", error && "at-field--invalid", className), htmlFor: inputId },
    React.createElement("span", { className: "at-field__label" }, label),
    React.createElement("input", { ref, id: inputId, "aria-describedby": describedBy, "aria-invalid": error ? true : undefined, ...props }),
    description && React.createElement("span", { className: "at-field__description", id: `${inputId}-description` }, description),
    error && React.createElement("span", { className: "at-field__error", id: `${inputId}-error`, role: "alert" }, error),
  );
});

/** A status message with a semantic default live region. */
export function Notice({ children, className, title, variant = "info", ...props }) {
  const role = variant === "critical" ? "alert" : "status";
  return React.createElement("section", { className: cx("at-notice", `at-notice--${variant}`, className), role, ...props },
    title && React.createElement("strong", { className: "at-notice__title" }, title),
    React.createElement("div", { className: "at-notice__content" }, children),
  );
}

/** Roving focus behavior is intentionally delegated to consumers until the headless adapter ships. */
export function Tabs({ children, className, label = "Sections", ...props }) {
  return React.createElement("div", { className: cx("at-tabs", className), role: "tablist", "aria-label": label, ...props }, children);
}

/** A controlled or uncontrolled local/share switch with native button semantics. */
export function SignalToggle({ className, checked, defaultChecked = false, leftLabel = "Local", onCheckedChange, rightLabel = "Share" }) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const value = isControlled ? checked : internal;
  const toggle = () => { const next = !value; if (!isControlled) setInternal(next); onCheckedChange?.(next); };
  return React.createElement("div", { className: cx("at-signal-toggle", value && "at-signal-toggle--shared", className) },
    React.createElement("button", { type: "button", role: "switch", "aria-checked": value, onClick: toggle },
      React.createElement("span", null, leftLabel), React.createElement("i", { "aria-hidden": true }, React.createElement("b")), React.createElement("span", null, rightLabel),
    ),
  );
}

/** A source-aware single-line field. The prefix and provenance are visible data, not decoration. */
export const LedgerField = React.forwardRef(function LedgerField({ className, error, label, provenance = "@local", prefix = "app.", ...props }, ref) {
  const id = props.id ?? React.useId();
  return React.createElement("label", { className: cx("at-ledger-field", error && "at-ledger-field--invalid", className), htmlFor: id },
    React.createElement("span", { className: "at-ledger-field__meta" }, React.createElement("b", null, prefix), label, React.createElement("i", null, provenance)),
    React.createElement("input", { ...props, ref, id, "aria-invalid": error ? true : undefined }),
    error && React.createElement("small", { role: "alert" }, error),
  );
});

/** An adjacent annotation intended for contextual feedback, rather than a full-width alert. */
export function MarginNote({ children, className, title, variant = "stable", ...props }) {
  return React.createElement("aside", { className: cx("at-margin-note", `at-margin-note--${variant}`, className), role: variant === "exception" ? "alert" : "status", ...props },
    React.createElement("span", null, `01 / ${variant}`), title && React.createElement("strong", null, title), React.createElement("div", null, children),
  );
}

/** A small layout primitive; deliberately leaves visual styling to tokens. */
export function Stack({ as: Tag = "div", gap = 3, className, style, ...props }) {
  return React.createElement(Tag, { className: cx("at-stack", className), style: { "--at-stack-gap": `var(--at-space-${gap})`, ...style }, ...props });
}

export function VisuallyHidden(props) { return React.createElement("span", { className: "at-visually-hidden", ...props }); }
