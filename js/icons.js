// A small, consistent line-icon set — replaces emoji everywhere in the UI.
// Stroke-based, 1.75px, round caps/joins, currentColor — renders identically
// across platforms (unlike emoji, which vary by OS/font) and reads as
// intentional rather than decorative. Shared by js/app.js (browser) and
// scripts/build-pages.mjs (Node) so nav/chrome icons never drift apart.
const svg = (body, size = 18) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;

export const ICONS = {
  home: (s) => svg(`<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9"/>`, s),
  bolt: (s) => svg(`<path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z"/>`, s),
  timer: (s) => svg(`<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/><path d="M9.5 2.5h5"/><path d="M18.5 5.5 20 4"/>`, s),
  book: (s) => svg(`<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20"/>`, s),
  cap: (s) => svg(`<path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z"/><path d="M6.5 11.7v4.3c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.3"/><path d="M21 9.5v6"/>`, s),
  chart: (s) => svg(`<path d="M4 20V10"/><path d="M11 20V4"/><path d="M18 20v-7"/>`, s),
  target: (s) => svg(`<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".75" fill="currentColor" stroke="none"/>`, s),
  calc: (s) => svg(`<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7.5h8"/><path d="M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>`, s),
  bulb: (s) => svg(`<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9v.2h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z"/>`, s),
  flag: (s) => svg(`<path d="M5 21V4"/><path d="M5 5.5c1.4-1 3-1 4.5 0s3.1 1 4.5 0v9c-1.4 1-3 1-4.5 0s-3.1-1-4.5 0"/>`, s),
  flagFilled: (s) => svg(`<path d="M5 21V4"/><path d="M5 5.5c1.4-1 3-1 4.5 0s3.1 1 4.5 0v9c-1.4 1-3 1-4.5 0s-3.1-1-4.5 0" fill="currentColor"/>`, s),
  refresh: (s) => svg(`<path d="M20 11a8 8 0 0 0-14.9-3.4"/><path d="M5 3v5h5"/><path d="M4 13a8 8 0 0 0 14.9 3.4"/><path d="M19 21v-5h-5"/>`, s),
  check: (s) => svg(`<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>`, s),
  cross: (s) => svg(`<path d="M6 6 18 18"/><path d="M18 6 6 18"/>`, s)
};
