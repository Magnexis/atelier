/**
 * A small React component layer and portable design contract for Atelier.
 * Use {@link tokens} for values that must work outside React.
 *
 * @module atelier
 */
export { tokenCss, tokens, type AtelierTokens } from "./tokens.js";

/** Shared DOM-safe props accepted by Atelier primitives. */
export interface BaseProps {
  className?: string;
  children?: unknown;
  [attribute: string]: unknown;
}

/** Props for a labelled native text field. */
export interface FieldProps extends BaseProps {
  label: string;
  description?: string;
  error?: string;
  id?: string;
}

/** Props for the local/shared Signal Ledger switch. */
export interface SignalToggleProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  onCheckedChange?: (checked: boolean) => void;
}

/** Props for a provenance-aware text field. */
export interface LedgerFieldProps extends FieldProps {
  provenance?: string;
  prefix?: string;
}

/** Native button with Atelier visual variants and safe button defaults. */
export function Button(props: BaseProps & { variant?: "primary" | "secondary" | string; type?: "button" | "submit" | "reset" }): unknown;
/** Labelled native input with description and error relationships. */
export function Field(props: FieldProps): unknown;
/** Source-aware extension of {@link Field}. */
export function LedgerField(props: LedgerFieldProps): unknown;
/** Compact annotation surface for stable, observed, or exceptional state. */
export function MarginNote(props: BaseProps & { title?: string; variant?: "stable" | "observe" | "exception" | string }): unknown;
/** Live-region status surface for product feedback. */
export function Notice(props: BaseProps & { title?: string; variant?: "info" | "critical" | string }): unknown;
/** Switch that represents local and shared ledger state. */
export function SignalToggle(props: SignalToggleProps): unknown;
/** Vertical layout helper using the token spacing scale. */
export function Stack(props: BaseProps & { as?: string; gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; style?: Record<string, string> }): unknown;
/** Explicitly labelled tab-list wrapper. */
export function Tabs(props: BaseProps & { label?: string }): unknown;
/** Assistive-technology-only text utility. */
export function VisuallyHidden(props: BaseProps): unknown;
/** Native details/summary disclosure with optional state reporting. */
export function Disclosure(props: BaseProps & { defaultOpen?: boolean; onToggle?: (open: boolean) => void; summary: string }): unknown;
/** Keyboard-operable radio group for compact mutually exclusive choices. */
export function SegmentedControl(props: BaseProps & { defaultValue?: string; label: string; onValueChange?: (value: string) => void; options: ReadonlyArray<{ label: string; value: string }>; value?: string }): unknown;
/** Local, callback-driven command filter that never executes input itself. */
export function CommandLedger(props: BaseProps & { commands: ReadonlyArray<{ id: string; label: string; description?: string; onSelect?: () => void }>; label?: string; placeholder?: string }): unknown;

/** Portable composition metadata for a reviewable product pattern. */
export interface Recipe {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly components: readonly string[];
  readonly states: readonly string[];
  readonly accessibility: readonly string[];
}

/** Shipped composition metadata; it never writes or runs consumer code. */
export const recipes: readonly Recipe[];
