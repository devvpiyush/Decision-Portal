// Local Modules
import { Link } from "react-router-dom";
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
      >
        <Link
          to="/yes/contact"
          className="relative mt-7 inline-flex items-center justify-center rounded-md bg-linear-to-r from-rose-400 to-pink-500 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-rose-300/50 transition hover:brightness-105 active:scale-[0.98]"
        >
          {c.next}
        </Link>
      </FinalCard>
    </ScreenShell>
  );
}

export default YesThanksPage;
