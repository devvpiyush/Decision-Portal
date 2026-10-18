// Small inline icons used on the decision screens (no extra packages)

const Svg = ({ children, className = "h-8 w-8", fill = "none" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill={fill}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const HEART_PATH =
  "M12 20.5s-7.5-4.6-9.6-9.2C.9 7.9 3 4.2 6.6 4.2c2 0 3.6 1.1 4.4 2.6.8-1.5 2.4-2.6 4.4-2.6 3.6 0 5.7 3.7 4.2 7.1-2.1 4.6-9.6 9.2-9.6 9.2z";

export const HeartIcon = ({ className, filled = false }) => (
  <Svg className={className} fill={filled ? "currentColor" : "none"}>
    <path d={HEART_PATH} />
  </Svg>
);

export const QuestionIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.4 9.4a2.7 2.7 0 1 1 3.8 2.5c-.8.4-1.2 1-1.2 1.8" />
    <circle cx="12" cy="17" r=".6" fill="currentColor" />
  </Svg>
);

export const FlowerIcon = ({ className }) => (
  <Svg className={className}>
    <circle cx="12" cy="12" r="2.2" />
    <circle cx="12" cy="6.2" r="2.8" />
    <circle cx="17.5" cy="10.2" r="2.8" />
    <circle cx="15.4" cy="16.7" r="2.8" />
    <circle cx="8.6" cy="16.7" r="2.8" />
    <circle cx="6.5" cy="10.2" r="2.8" />
  </Svg>
);
