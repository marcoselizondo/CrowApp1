import type React from "react";

type P = { size?: number; color?: string; sw?: number };
const S: React.FC<P & { children: React.ReactNode; vb?: string }> = ({
  size = 72,
  color = "#fff",
  sw = 5,
  vb = "0 0 100 100",
  children,
}) => (
  <svg width={size} height={size} viewBox={vb} fill="none" stroke={color}
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const IconBox: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M20 35 L50 22 L80 35 L50 48 Z" />
    <path d="M20 35 V70 L50 83 V48" />
    <path d="M80 35 V70 L50 83" />
  </S>
);

export const IconCamera: React.FC<P> = (p) => (
  <S {...p}>
    <rect x="16" y="34" width="68" height="44" rx="9" />
    <path d="M38 34 l6 -9 h12 l6 9" />
    <circle cx="50" cy="56" r="13" />
  </S>
);

export const IconPerson: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="50" cy="35" r="13" />
    <path d="M25 80 c0 -17 12 -26 25 -26 s25 9 25 26" />
  </S>
);

export const IconLeaf: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M50 18 C29 33 25 60 50 82 C75 60 71 33 50 18 Z" />
    <path d="M50 30 V74" />
    <path d="M50 50 L38 42 M50 58 L62 50" />
  </S>
);

/** CO₂ credit token: leaf inside a coin. */
export const IconToken: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="50" cy="50" r="34" />
    <path d="M50 30 C40 39 38 55 50 68 C62 55 60 39 50 30 Z" />
    <path d="M50 38 V62" />
  </S>
);

export const IconUnlock: React.FC<P> = (p) => (
  <S {...p}>
    <rect x="27" y="47" width="46" height="35" rx="7" />
    <path d="M37 47 V37 a13 13 0 0 1 24 -6" />
    <circle cx="50" cy="63" r="4.5" />
  </S>
);

export const IconCheck: React.FC<P> = (p) => (
  <S {...p}>
    <circle cx="50" cy="50" r="34" />
    <path d="M35 51 l10 11 l21 -23" />
  </S>
);

export const IconWallet: React.FC<P> = (p) => (
  <S {...p}>
    <rect x="18" y="30" width="64" height="46" rx="9" />
    <path d="M18 45 h64" />
    <circle cx="67" cy="60" r="5" />
  </S>
);

export const IconCoffee: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M28 42 h36 v16 a18 18 0 0 1 -36 0 Z" />
    <path d="M64 46 h8 a9 9 0 0 1 0 18 h-8" />
    <path d="M40 32 v-7 M50 32 v-9 M60 32 v-7" />
  </S>
);

export const IconTent: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M18 76 L50 26 L82 76 Z" />
    <path d="M50 26 V76" />
    <path d="M41 76 L50 56 L59 76" />
  </S>
);

export const IconPaddle: React.FC<P> = (p) => (
  <S {...p}>
    <ellipse cx="42" cy="52" rx="12" ry="34" />
    <path d="M66 24 v44 M58 30 h16" />
  </S>
);

export const IconProjector: React.FC<P> = (p) => (
  <S {...p}>
    <rect x="18" y="42" width="46" height="30" rx="7" />
    <circle cx="34" cy="57" r="8" />
    <path d="M66 50 l16 -8 M66 64 l16 8 M68 57 h15" />
  </S>
);

export const IconLamp: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M34 30 h32 l9 22 h-50 Z" />
    <path d="M50 52 v26" />
    <path d="M37 80 h26" />
  </S>
);

export const IconChair: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M37 26 V58 h28" />
    <path d="M37 58 V80 M65 44 V80" />
    <path d="M37 70 h28" />
  </S>
);

/** Simple right arrow used between flow steps. */
export const IconArrow: React.FC<P> = (p) => (
  <S {...p}>
    <path d="M24 50 h50 M58 34 l16 16 l-16 16" />
  </S>
);
