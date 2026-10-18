// External Modules
import { useNavigate } from "react-router-dom";

import "../styles/rosePetals.css";

// Local Modules
import GlowOrbs from "../components/GlowOrbs";
import SatinSweep from "../components/SatinSweep";
import Sparkles from "../components/Sparkles";
import FallingPetals from "../components/FallingPetals";
import FinishLayers from "../components/FinishLayers";
import Secret from "../components/Secret";
import Credit from "../components/Credit";
import { UNLOCK_KEY } from "../components/RequireUnlock";
import useTrackView from "../hooks/useTrackView";
import { track } from "../lib/tracker";

function Unlock() {
  const navigate = useNavigate();

  // she opened the link
  useTrackView("unlock");

  // Runs ~1s after the correct code (after the green "Unlocked" state)
  const handleUnlocked = () => {
    try {
      sessionStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      /* ignore */
    }
    navigate("/decision", { replace: true });
  };

  return (
    <div className={`rp-silk fixed inset-0 overflow-hidden`}>
      <GlowOrbs />
      <SatinSweep />
      <Sparkles />
      <FinishLayers />
      <Secret
        onWrong={() => track({ type: "unlock_failed", screen: "unlock" })}
        onSubmit={() => track({ type: "unlocked", screen: "unlock" })}
        onUnlocked={handleUnlocked}
      />
      <FallingPetals />
      <Credit />
    </div>
  );
}

export default Unlock;
