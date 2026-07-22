import express from "express";
import schemes from "../data/schemes.js";

const router = express.Router();

const normalize = (value) => (typeof value === "string" ? value.trim() : value);
const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

export const matchesScheme = (scheme, profile) => {
  const eligibility = scheme.eligibility || {};
  const age = Number(profile.age);
  const income = Number(profile.income);
  const gender = normalize(profile.gender);
  const occupation = normalize(profile.occupation);
  const category = normalize(profile.category);
  const areaType = normalize(profile.areaType);

  if (eligibility.minAge !== undefined && age < eligibility.minAge) return false;
  if (eligibility.maxAge !== undefined && age > eligibility.maxAge) return false;
  if (eligibility.occupation && !eligibility.occupation.includes(occupation)) return false;
  if (eligibility.maxIncome !== undefined && income > eligibility.maxIncome) return false;
  if (eligibility.gender !== undefined && gender !== eligibility.gender) return false;
  if (eligibility.category && !eligibility.category.includes(category) && !(eligibility.genderOrCategory && gender === "female")) return false;
  if (eligibility.areaType !== undefined && areaType !== eligibility.areaType) return false;
  if (eligibility.hasDisability !== undefined && (!hasOwn(profile, "hasDisability") || profile.hasDisability !== eligibility.hasDisability)) return false;
  if (eligibility.hasOwnRoof !== undefined && (!hasOwn(profile, "hasOwnRoof") || profile.hasOwnRoof !== eligibility.hasOwnRoof)) return false;
  if (eligibility.firstTimeHomebuyer !== undefined && (!hasOwn(profile, "firstTimeHomebuyer") || profile.firstTimeHomebuyer !== eligibility.firstTimeHomebuyer)) return false;
  if (eligibility.hasNoBankAccount !== undefined && (!hasOwn(profile, "hasBankAccount") || profile.hasBankAccount === eligibility.hasNoBankAccount)) return false;
  if (eligibility.requiresBankAccount !== undefined && (!hasOwn(profile, "hasBankAccount") || profile.hasBankAccount !== eligibility.requiresBankAccount)) return false;
  if (eligibility.childGender !== undefined && normalize(profile.childGender) !== eligibility.childGender) return false;
  if (eligibility.childMaxAge !== undefined && Number(profile.childAge) > eligibility.childMaxAge) return false;
  if (eligibility.lifeStage !== undefined && normalize(profile.lifeStage) !== eligibility.lifeStage) return false;
  if (eligibility.schoolType !== undefined && normalize(profile.schoolType) !== eligibility.schoolType) return false;
  if (eligibility.willingToWork !== undefined && normalize(profile.willingToWork) !== eligibility.willingToWork) return false;
  if (eligibility.disabilityType && !eligibility.disabilityType.includes(normalize(profile.disabilityType))) return false;
  if (eligibility.excludeIfIncomeTaxPayer && Boolean(profile.isIncomeTaxPayer)) return false;
  if (eligibility.excludeIfGovtEmployee && Boolean(profile.isGovtEmployee)) return false;

  if (eligibility.specialRule === "seccListed_OR_age70Plus" && (!hasOwn(profile, "isBPL") || !profile.isBPL) && age < 70) return false;
  if ((eligibility.specialRule === "bpl_or_secc" || eligibility.specialRule === "bpl_household") && (!hasOwn(profile, "isBPL") || !profile.isBPL)) return false;
  if (eligibility.specialRule === "distress_situation" && (!hasOwn(profile, "isInDistress") || !profile.isInDistress)) return false;

  return true;
};

router.post("/match", (req, res) => {
  const matches = schemes.filter((scheme) => matchesScheme(scheme, req.body || {}));
  res.json(matches);
});

export default router;
