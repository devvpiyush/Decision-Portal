// External Modules
import { Navigate, Outlet } from "react-router-dom";

export const UNLOCK_KEY = "rp-unlocked";

// Keeps the decision screens private: without the secret code you go back to "/"
function RequireUnlock() {
  let unlocked = false;
  try {
    unlocked = sessionStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    /* storage blocked → treat as locked */
  }
  return unlocked ? <Outlet /> : <Navigate to="/" replace />;
}

export default RequireUnlock;
