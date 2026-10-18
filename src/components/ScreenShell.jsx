import "../styles/rosePetals.css";

// Local Modules
import GlowOrbs from "./GlowOrbs";
import SatinSweep from "./SatinSweep";
import Sparkles from "./Sparkles";
import FallingPetals from "./FallingPetals";
import FinishLayers from "./FinishLayers";
import Credit from "./Credit";

// The shared pink background for every decision screen — put a card inside as `children`
function ScreenShell({ children }) {
  return (
    <div className="rp-silk fixed inset-0 overflow-hidden">
      <GlowOrbs />
      <SatinSweep />
      <Sparkles />
      <FinishLayers />

      <div className="absolute inset-0 z-10 flex overflow-y-auto p-4 pb-20">
        {/* m-auto centres when there is room and lets tall cards scroll from the top (items-center would clip them) */}
        <div className="m-auto flex w-full justify-center">{children}</div>
      </div>

      <FallingPetals />
      <Credit />
    </div>
  );
}

export default ScreenShell;
