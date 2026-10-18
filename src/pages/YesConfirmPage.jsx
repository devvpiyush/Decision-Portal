// External Modules
import { useNavigate } from "react-router-dom";

// Local Modules
import ScreenShell from "../components/ScreenShell";
import DecisionCard from "../components/DecisionCard";
import { QuestionIcon } from "../components/icons";
import { COPY } from "../content/copy";
import useTrackView from "../hooks/useTrackView";
import { track } from "../lib/tracker";

// Yes path, screen 2: "Really?"
//   "Yes, really" → /yes/thanks   |   "No, I want to change my decision" → /decision
function YesConfirmPage() {
  const navigate = useNavigate();
  const c = COPY.yesConfirm;

  useTrackView("yes-confirm");

  const choose = (choice, label, to) => {
    track({ type: "choice", screen: "yes-confirm", choice, label });
    navigate(to);
  };

  return (
    <ScreenShell>
      <DecisionCard
        icon={<QuestionIcon className="h-8 w-8" />}
        kicker={c.kicker}
        title={c.title}
        subtitle={c.subtitle}
        primaryLabel={c.confirm}
        onPrimary={() => choose("confirm", c.confirm, "/yes/thanks")}
        secondaryLabel={c.change}
        onSecondary={() => choose("change", c.change, "/decision")}
      />
    </ScreenShell>
  );
}

export default YesConfirmPage;
