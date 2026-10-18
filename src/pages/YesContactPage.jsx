// Local Modules
import ScreenShell from "../components/ScreenShell";
import { COPY } from "../content/copy";
import useTrackView from "../hooks/useTrackView";
import qrInstagram from "../assets/qr-instagram.svg";
import qrPhone from "../assets/qr-phone.svg";

function QrTile({ src, alt, label, value }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="rounded-md bg-white p-1.5 sm:p-2 shadow-[0_14px_34px_-16px_rgba(190,40,100,0.6)] ring-1 ring-rose-200">
        <img src={src} alt={alt} className="h-[8.5rem] w-[8.5rem] min-[400px]:h-36 min-[400px]:w-36 sm:h-44 sm:w-44" draggable="false" />
      </div>
      <p className="mt-3 text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-rose-400 sm:text-[11px] sm:tracking-[0.18em]">{label}</p>
      <p className="mt-0.5 break-all text-sm font-semibold text-rose-950 sm:text-base">{value}</p>
    </div>
  );
}

// Yes path, very last screen: how to reach me
function YesContactPage() {
  const c = COPY.yesContact;

  useTrackView("yes-contact");

  return (
    <ScreenShell>
      <div className="rp-rise relative w-full max-w-lg overflow-hidden rounded-md bg-white px-4 pb-8 pt-9 text-center sm:max-w-xl shadow-[0_30px_80px_-20px_rgba(190,40,100,0.45)] ring-1 ring-white/70 sm:px-10 sm:pb-10 sm:pt-11">
        <div className="pointer-events-none absolute -top-16 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-rose-100/80 blur-3xl" />

        <p className="rp-serif relative text-base font-semibold italic tracking-wide text-rose-400">{c.kicker}</p>
        <h1 className="rp-bebas relative mt-1 text-4xl font-normal tracking-[0.12em] text-rose-950 sm:text-5xl">{c.title}</h1>

        <div className="relative mx-auto mt-3 flex w-32 items-center gap-3 text-rose-400">
          <span className="h-px flex-1 bg-linear-to-r from-transparent to-rose-300" />
          <span className="h-1.5 w-1.5 rotate-45 bg-rose-300" />
          <span className="h-px flex-1 bg-linear-to-l from-transparent to-rose-300" />
        </div>

        <p className="relative mt-5 text-[15px] leading-relaxed text-rose-950/75">
          {c.subtext}. My number is <b className="font-semibold text-rose-700">{c.phoneNumber}</b> and my
          Instagram ID is <b className="font-semibold text-rose-700">{c.instagramId}</b>.
        </p>

        <div className="relative mt-6 flex items-start justify-center gap-3 sm:mt-8 sm:gap-8">
          <QrTile src={qrInstagram} alt="QR code for my Instagram" label={c.instagramLabel} value={c.instagramId} />
          <QrTile src={qrPhone} alt="QR code for my phone number" label={c.phoneLabel} value={c.phoneNumber} />
        </div>

        <p className="relative mt-5 text-xs text-rose-950/50">{c.scanHint}</p>
        <p className="rp-serif relative mt-5 text-2xl font-semibold italic text-rose-700">{c.signature}</p>
      </div>
    </ScreenShell>
  );
}

export default YesContactPage;
