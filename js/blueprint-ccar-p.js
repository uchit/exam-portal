// CCAR-P exam blueprint — mirrors js/blueprint.js's shape for CCA-F.
// Claude Certified Architect — Professional: 63 questions, 120 minutes,
// pass mark 720/1000 (72%), 7 weighted domains.
import { DOMAINS_LIST_CCAR_P } from "./blueprint-domains-ccar-p.js";

export const EXAM_NAME_CCAR_P = "Claude Certified Architect — Professional";
export const EXAM_CODE_CCAR_P = "CCAR-P";
export const DOMAINS_CCAR_P = Object.fromEntries(DOMAINS_LIST_CCAR_P.map((d) => [d.id, d]));
export const EXAM_LENGTH_CCAR_P = 63;
export const EXAM_MINUTES_CCAR_P = 120;
export const PASS_PERCENT_CCAR_P = 72;
