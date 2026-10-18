// All the words shown on the decision screens live here — edit freely.

export const HER_NAME = "Nishtha";
export const SENDER_NAME = "Piyush";

export const COPY = {
  // Screen 1 — the question
  decision: {
    kicker: `For ${HER_NAME}`,
    title: "Will you be girlfriend?",
    subtitle: "Take your time. An honest answer is all I'm hoping for.",
    yes: "Yes",
    no: "No",
  },

  // She said YES → "Really?"
  yesConfirm: {
    kicker: "One more time",
    title: "Really?",
    subtitle: `Is that your final answer, ${HER_NAME}?`,
    confirm: "Yes, really",
    change: "No, I want to change my decision",
  },

  // She said YES, really → final screen
  yesThanks: {
    kicker: "Forever grateful",
    title: `Thank you, ${HER_NAME}`,
    paragraph:
      "You just made me the happiest person in the world. I can't wait for every ordinary day, every long conversation and every little adventure with you. I promise to be honest, kind and by your side, always. This is only the beginning of our story.",
    signature: `Yours, ${SENDER_NAME} ❤`,
    next: "One last thing →",
  },

  // After YES → how to reach me
  yesContact: {
    kicker: "One last thing",
    title: "Say hello",
    subtext: "Thankyou so much! Please please please leave a message here",
    phoneLabel: "Text here",
    phoneNumber: "9782537179",
    instagramLabel: "Instagram",
    instagramId: "@iampiyyushb",
    scanHint: "Scan with your phone camera",
    signature: `Yours, ${SENDER_NAME} ❤`,
  },

  // She said NO → three more layers ("Yes" continues, "change" goes back to the question)
  noSteps: [
    {
      kicker: "Are you sure?",
      title: "Really???",
      subtitle: `Is this truly what you want, ${HER_NAME}?`,
      confirm: "Yes",
      change: "I want to change my decision",
    },
    {
      kicker: "Think once more",
      title: "Pakka na?",
      subtitle: "Absolutely sure? I'll wait, no rush at all.",
      confirm: "Yes",
      change: "I want to change my decision",
    },
    {
      kicker: "Last time, I promise",
      title: "Pleaseeee...",
      subtitle: "One tiny chance to reconsider. Just asking nicely.",
      confirm: "Yes",
      change: "I want to change my decision",
    },
  ],

  // She said NO all the way → goodbye
  noGoodbye: {
    kicker: "With respect",
    title: `Thank you, ${HER_NAME}`,
    paragraph:
      "Thank you for being honest with me. That takes courage, and I respect your decision completely. Whatever happens next, I'm grateful for every moment we've shared, and I'll always wish you happiness and every good thing life has to offer. Take care, and keep smiling.",
    signature: `Take care, ${SENDER_NAME}`,
  },
};
