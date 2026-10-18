// External Modules
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Local Modules
import ScreenShell from "../components/ScreenShell";
import DecisionCard from "../components/DecisionCard";
import { FlowerIcon, QuestionIcon } from "../components/icons";
import { COPY } from "../content/copy";
import useTrackView from "../hooks/useTrackView";
import { track } from "../lib/tracker";

// No path: /no/1 "Really???" → /no/2 "Pakka na?" → /no/3 "Pleaseeee..." → /no/goodbye
// "I want to change my decision" on any of them → /decision
function NoStepPage() {
  const navigate = useNavigate();
  const { step } = useParams();

  const steps = COPY.noSteps;
  const n = Number(step);
  const valid = Number.isInteger(n) && n >= 1 && n <= steps.length;

  // hooks must run before any early return; skip tracking for an invalid step
  useTrackView(valid ? `no-${n}` : null);

  if (!valid) return <Navigate to="/decision" replace />;

  const c = steps[n - 1];
  const isLast = n === steps.length;
  const screen = `no-${n}`;

  const choose = (choice, label, to) => {
    track({ type: "choice", screen, choice, label });
    navigate(to);
  };

  return (
    <ScreenShell>
      <DecisionCard
        key={n} // replay the entrance animation on every step
        icon={
          isLast ? (
            <FlowerIcon className="h-8 w-8" />
          ) : (
            <QuestionIcon className="h-8 w-8" />
          )
        }
        kicker={c.kicker}
        title={c.title}
        subtitle={c.subtitle}
        step={n}
        totalSteps={steps.length}
        primaryLabel={c.confirm}
        onPrimary={() =>
          choose("confirm", c.confirm, isLast ? "/no/goodbye" : `/no/${n + 1}`)
        }
        secondaryLabel={c.change}
        onSecondary={() => choose("change", c.change, "/decision")}
      />
    </ScreenShell>
  );
}

export default NoStepPage;
