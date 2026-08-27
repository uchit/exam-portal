// CCAO-F exam blueprint — mirrors js/blueprint-ccar-p.js's shape.
// Claude Certified Associate — Foundations: 60 questions, 120 minutes,
// pass mark 720/1000 (72%), 7 weighted domains.
import { DOMAINS_LIST_CCAO_F } from "./blueprint-domains-ccao-f.js";

export const EXAM_NAME_CCAO_F = "Claude Certified Associate — Foundations";
export const EXAM_CODE_CCAO_F = "CCAO-F";
export const DOMAINS_CCAO_F = Object.fromEntries(DOMAINS_LIST_CCAO_F.map((d) => [d.id, d]));
export const EXAM_LENGTH_CCAO_F = 60;
export const EXAM_MINUTES_CCAO_F = 120;
export const PASS_PERCENT_CCAO_F = 72;
