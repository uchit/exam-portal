// Official Claude Certification exam blueprint — 5 weighted domains.
// Mirrors the Claude Certified Architect – Foundations (CCA-F), launched
// 2026-03-17: 60 questions, 120 minutes, pass mark 720/1000 (72%).
import { DOMAINS_LIST } from "./blueprint-domains.js";

export const EXAM_NAME = "Claude Certified Architect — Foundations";
export const EXAM_CODE = "CCA-F";

export const DOMAINS = Object.fromEntries(DOMAINS_LIST.map((d) => [d.id, d]));

export const DIFFICULTY = {
  1: "Recall",
  2: "Apply",
  3: "Analyze",
  4: "Evaluate",
  5: "Expert"
};

// Domain weights drive the mock-exam question distribution.
export const EXAM_LENGTH = 60;      // questions per full mock exam (matches CCA-F)
export const EXAM_MINUTES = 120;    // timed mock exam length (matches CCA-F)
export const PASS_PERCENT = 72;     // pass threshold (720/1000)
