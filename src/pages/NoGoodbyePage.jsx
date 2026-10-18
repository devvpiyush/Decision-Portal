// Local Modules
import ScreenShell from "../components/ScreenShell";
import FinalCard from "../components/FinalCard";
import { FlowerIcon } from "../components/icons";
import { COPY } from "../content/copy";
import useTrackView from "../hooks/useTrackView";

// No path, final screen: thank you + goodbye
function NoGoodbyePage() {
  const c = COPY.noGoodbye;

  useTrackView("no-goodbye");

  return (
    <ScreenShell>
      <FinalCard
        icon={<FlowerIcon className="h-10 w-10" />}
        kicker={c.kicker}
        title={c.title}
        paragraph={c.paragraph}
        signature={c.signature}
      />
    </ScreenShell>
  );
}

export default NoGoodbyePage;
