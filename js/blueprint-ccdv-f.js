// CCDV-F exam blueprint — mirrors js/blueprint-ccar-p.js's shape.
// Claude Certified Developer — Foundations: 53 questions, 120 minutes,
// pass mark 720/1000 (72%), 8 weighted domains.
import { DOMAINS_LIST_CCDV_F } from "./blueprint-domains-ccdv-f.js";

export const EXAM_NAME_CCDV_F = "Claude Certified Developer — Foundations";
export const EXAM_CODE_CCDV_F = "CCDV-F";
export const DOMAINS_CCDV_F = Object.fromEntries(DOMAINS_LIST_CCDV_F.map((d) => [d.id, d]));
export const EXAM_LENGTH_CCDV_F = 53;
export const EXAM_MINUTES_CCDV_F = 120;
export const PASS_PERCENT_CCDV_F = 72;
