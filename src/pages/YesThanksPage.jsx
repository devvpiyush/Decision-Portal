// Local Modules
import ScreenShell from "../components/ScreenShell";
import FinalCard from "../components/FinalCard";
import { HeartIcon } from "../components/icons";
import { COPY } from "../content/copy";
import useTrackView from "../hooks/useTrackView";

// Yes path, final screen: thank you
function YesThanksPage() {
  const c = COPY.yesThanks;

  useTrackView("yes-thanks");

  return (
    <ScreenShell>
      <FinalCard
        beating
        icon={<HeartIcon className="h-10 w-10" filled />}
        kicker={c.kicker}
        title={c.title}
        paragraph={c.paragraph}
        signature={c.signature}
      />
    </ScreenShell>
  );
}

export default YesThanksPage;
