// External Modules
import { useNavigate } from "react-router-dom";

// Local Modules
import ScreenShell from "../components/ScreenShell";
import DecisionCard from "../components/DecisionCard";
import { HeartIcon } from "../components/icons";
import { COPY } from "../content/copy";
import useTrackView from "../hooks/useTrackView";
import { track } from "../lib/tracker";

// Screen 1: "Will you be mine?"  →  Yes: /yes   |   No: /no/1
function Decision() {
  const navigate = useNavigate();
  const c = COPY.decision;

  useTrackView("decision");

  // saved the instant she presses a button, then she moves on
  const choose = (choice, label, to) => {
    track({ type: "choice", screen: "decision", choice, label });
    navigate(to);
  };

  return (
    <ScreenShell>
      <DecisionCard
        icon={<HeartIcon className="h-8 w-8" filled />}
        kicker={c.kicker}
        title={c.title}
        subtitle={c.subtitle}
        primaryLabel={c.yes}
        onPrimary={() => choose("yes", c.yes, "/yes")}
        secondaryLabel={c.no}
        onSecondary={() => choose("no", c.no, "/no/1")}
      />
    </ScreenShell>
  );
}

export default Decision;
