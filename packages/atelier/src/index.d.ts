/**
 * A small React component layer and portable design contract for Atelier.
 * Use {@link tokens} for values that must work outside React.
 *
 * @module atelier
 */
export { tokenCss, tokens, type AtelierTokens } from "./tokens.js";

export interface BaseProps {
  className?: string;
  children?: unknown;
  [attribute: string]: unknown;
}

export interface FieldProps extends BaseProps {
  label: string;
  description?: string;
  error?: string;
  id?: string;
}

export interface SignalToggleProps extends BaseProps {
  checked?: boolean;
  defaultChecked?: boolean;
  leftLabel?: string;
  rightLabel?: string;
  onCheckedChange?: (checked: boolean) => void;
}

export interface LedgerFieldProps extends FieldProps {
  provenance?: string;
  prefix?: string;
}

export function Button(props: BaseProps & { variant?: "primary" | "secondary" | string; type?: "button" | "submit" | "reset" }): unknown;
export function Field(props: FieldProps): unknown;
export function LedgerField(props: LedgerFieldProps): unknown;
export function MarginNote(props: BaseProps & { title?: string; variant?: "stable" | "observe" | "exception" | string }): unknown;
export function Notice(props: BaseProps & { title?: string; variant?: "info" | "critical" | string }): unknown;
export function SignalToggle(props: SignalToggleProps): unknown;
export function Stack(props: BaseProps & { as?: string; gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8; style?: Record<string, string> }): unknown;
export function Tabs(props: BaseProps & { label?: string }): unknown;
export function VisuallyHidden(props: BaseProps): unknown;
export function Disclosure(props: BaseProps & { defaultOpen?: boolean; onToggle?: (open: boolean) => void; summary: string }): unknown;
export function SegmentedControl(props: BaseProps & { defaultValue?: string; label: string; onValueChange?: (value: string) => void; options: ReadonlyArray<{ label: string; value: string }>; value?: string }): unknown;
export function CommandLedger(props: BaseProps & { commands: ReadonlyArray<{ id: string; label: string; description?: string; onSelect?: () => void }>; label?: string; placeholder?: string }): unknown;

export interface Recipe {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly components: readonly string[];
  readonly states: readonly string[];
  readonly accessibility: readonly string[];
}

export const recipes: readonly Recipe[];
