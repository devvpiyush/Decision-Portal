// Where each button leads (so the saved data says "chose No → Really???").
// Keep in sync with the routes in main.jsx and the checks in supabase/setup.sql.
export const TRANSITIONS = {
  decision: { yes: "yes-confirm", no: "no-1" },
  "yes-confirm": { confirm: "yes-thanks", change: "decision" },
  // yes-thanks → yes-contact is a plain link, not a tracked choice (the view of yes-contact records it)
  "no-1": { confirm: "no-2", change: "decision" },
  "no-2": { confirm: "no-3", change: "decision" },
  "no-3": { confirm: "no-goodbye", change: "decision" },
};
