import * as React from "react";

const cx = (...values) => values.filter(Boolean).join(" ");

/** A semantic button with consistent variants. Bring your own React and styles. */
export const Button = React.forwardRef(function Button({ className, variant = "primary", type = "button", ...props }, ref) {
  return React.createElement("button", { ref, type, className: cx("at-button", `at-button--${variant}`, className), ...props });
});

/** A small layout primitive; deliberately leaves visual styling to tokens. */
export function Stack({ as: Tag = "div", gap = 3, className, style, ...props }) {
  return React.createElement(Tag, { className: cx("at-stack", className), style: { "--at-stack-gap": `var(--at-space-${gap})`, ...style }, ...props });
}

export function VisuallyHidden(props) { return React.createElement("span", { className: "at-visually-hidden", ...props }); }
