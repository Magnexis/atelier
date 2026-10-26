/**
 * Portable composition metadata. Recipes describe dependencies and intent;
 * they do not execute arbitrary UI code or modify a consumer project.
 */
export const recipes = Object.freeze([
  Object.freeze({
    id: "local-command-review",
    name: "Local command review",
    category: "workflow",
    components: Object.freeze(["CommandLedger", "SegmentedControl", "Disclosure"]),
    states: Object.freeze(["ready", "filtered", "empty"]),
    accessibility: Object.freeze(["search-label", "radio-group", "native-disclosure"]),
  }),
  Object.freeze({
    id: "signal-ledger",
    name: "Signal ledger",
    category: "local-state",
    components: Object.freeze(["SignalToggle", "LedgerField", "MarginNote"]),
    states: Object.freeze(["local", "shared", "exception"]),
    accessibility: Object.freeze(["switch-semantics", "source-label", "contextual-alert"]),
  }),
  Object.freeze({
    id: "profile-access",
    name: "Profile & access",
    category: "settings",
    components: Object.freeze(["Field", "Notice", "Tabs", "Button"]),
    states: Object.freeze(["default", "validation-error", "saved"]),
    accessibility: Object.freeze(["labelled-fields", "keyboard-tabs", "status-feedback"]),
  }),
  Object.freeze({
    id: "deployment-health",
    name: "Deployment health",
    category: "feedback",
    components: Object.freeze(["Notice", "Button"]),
    states: Object.freeze(["healthy", "degraded", "critical"]),
    accessibility: Object.freeze(["status-feedback", "critical-alert"]),
  }),
  Object.freeze({
    id: "payment-method",
    name: "Payment method",
    category: "commerce",
    components: Object.freeze(["Field", "Tabs", "Button"]),
    states: Object.freeze(["default", "invalid", "processing"]),
    accessibility: Object.freeze(["labelled-fields", "error-identification", "keyboard-tabs"]),
  }),
]);
