const schemes = [
  {
    "id": "pm-kisan",
    "name": "PM-KISAN",
    "category": "Farmers",
    "description": "Direct income support of ₹6,000 per year for land-owning farmer families, paid in 3 installments.",
    "eligibility": { "minAge": 18, "occupation": ["farmer"], "excludeIfIncomeTaxPayer": true, "excludeIfGovtEmployee": true },
    "benefit": "₹6,000/year direct bank transfer",
    "link": "https://pmkisan.gov.in/"
  },
  {
    "id": "pm-fasal-bima",
    "name": "PM Fasal Bima Yojana",
    "category": "Farmers",
    "description": "Crop insurance protecting farmers against losses from natural calamities, pests, and diseases.",
    "eligibility": { "minAge": 18, "occupation": ["farmer"] },
    "benefit": "Crop loss insurance coverage",
    "link": "https://pmfby.gov.in/"
  },
  {
    "id": "kisan-credit-card",
    "name": "Kisan Credit Card",
    "category": "Farmers",
    "description": "Low-interest credit line for farmers, tenant farmers, and sharecroppers for agricultural needs.",
    "eligibility": { "minAge": 18, "occupation": ["farmer"] },
    "benefit": "Low-interest agricultural credit",
    "link": "https://www.myscheme.gov.in/schemes/kcc"
  },
  {
    "id": "pm-kisan-maan-dhan",
    "name": "PM Kisan Maan Dhan Yojana",
    "category": "Farmers",
    "description": "Voluntary pension scheme for small and marginal farmers.",
    "eligibility": { "minAge": 18, "maxAge": 40, "occupation": ["farmer"] },
    "benefit": "₹3,000/month pension after age 60",
    "link": "https://pmkisan.gov.in/"
  },
  {
    "id": "ayushman-bharat",
    "name": "Ayushman Bharat (PM-JAY)",
    "category": "Health",
    "description": "Cashless health insurance covering hospitalisation for economically vulnerable families and all senior citizens aged 70+.",
    "eligibility": { "minAge": 0, "specialRule": "seccListed_OR_age70Plus" },
    "benefit": "₹5 lakh/year cashless hospitalisation",
    "link": "https://beneficiary.nha.gov.in/"
  },
  {
    "id": "pm-matru-vandana",
    "name": "PM Matru Vandana Yojana",
    "category": "Health",
    "description": "Cash incentive for pregnant and lactating mothers for maternal and child nutrition.",
    "eligibility": { "gender": "female", "lifeStage": "pregnant_or_lactating", "excludeIfGovtEmployee": true },
    "benefit": "Cash maternity benefit (~₹5,000–12,000)",
    "link": "https://pmmvy.wcd.gov.in/"
  },
  {
    "id": "pm-poshan",
    "name": "PM POSHAN (Mid-Day Meal)",
    "category": "Health",
    "description": "Free nutritious daily meal for children in government schools.",
    "eligibility": { "minAge": 5, "maxAge": 14, "occupation": ["student"], "schoolType": "government" },
    "benefit": "Free daily school meal",
    "link": "https://pmposhan-mis.education.gov.in/MDM_Production/Login.aspx"
  },
  {
    "id": "pmay-urban",
    "name": "PM Awas Yojana (Urban)",
    "category": "Housing",
    "description": "Interest subsidy on home loans for first-time homebuyers in urban areas, based on income slab.",
    "eligibility": { "minAge": 18, "maxIncome": 1800000, "firstTimeHomebuyer": true, "areaType": "urban" },
    "benefit": "3–6.5% interest subsidy on home loan",
    "link": "https://pmaymis.gov.in/"
  },
  {
    "id": "pmay-gramin",
    "name": "PM Awas Yojana (Gramin)",
    "category": "Housing",
    "description": "Financial assistance for house construction for rural BPL/SECC-listed households.",
    "eligibility": { "minAge": 18, "specialRule": "bpl_or_secc", "areaType": "rural" },
    "benefit": "₹1.20–1.30 lakh construction assistance",
    "link": "https://pmayg.dord.gov.in/netiayHome/home.aspx"
  },
  {
    "id": "pm-jan-dhan",
    "name": "PM Jan Dhan Yojana",
    "category": "Banking",
    "description": "Zero-balance bank account with RuPay debit card and accidental insurance.",
    "eligibility": { "minAge": 10, "hasNoBankAccount": true },
    "benefit": "Zero-balance account + RuPay card + insurance",
    "link": "https://pmjdy.gov.in/"
  },
  {
    "id": "pm-jeevan-jyoti",
    "name": "PM Jeevan Jyoti Bima Yojana",
    "category": "Banking",
    "description": "Renewable term life insurance for bank/post office account holders.",
    "eligibility": { "minAge": 18, "maxAge": 50, "requiresBankAccount": true },
    "benefit": "₹2 lakh life insurance, low annual premium",
    "link": "https://www.jansuraksha.gov.in/"
  },
  {
    "id": "pm-suraksha-bima",
    "name": "PM Suraksha Bima Yojana",
    "category": "Banking",
    "description": "Accidental death and disability insurance for bank account holders.",
    "eligibility": { "minAge": 18, "maxAge": 70, "requiresBankAccount": true },
    "benefit": "₹2 lakh accident insurance",
    "link": "https://www.jansuraksha.gov.in/"
  },
  {
    "id": "atal-pension",
    "name": "Atal Pension Yojana",
    "category": "Banking",
    "description": "Voluntary pension scheme for unorganized sector workers.",
    "eligibility": { "minAge": 18, "maxAge": 40, "occupation": ["unorganized_worker", "self_employed", "daily_wage"] },
    "benefit": "₹1,000–5,000/month pension after age 60",
    "link": "https://www.npscra.proteantech.in/scheme-details.php"
  },
  {
    "id": "sukanya-samriddhi",
    "name": "Sukanya Samriddhi Yojana",
    "category": "Banking",
    "description": "High-interest savings scheme for the future education/marriage of a girl child.",
    "eligibility": { "childGender": "female", "childMaxAge": 10 },
    "benefit": "High-interest savings account for girl child",
    "link": "https://www.nsiindia.gov.in/"
  },
  {
    "id": "pm-svanidhi",
    "name": "PM SVANidhi",
    "category": "Self-Employed",
    "description": "Collateral-free working capital loans for street vendors.",
    "eligibility": { "minAge": 18, "occupation": ["street_vendor"], "areaType": "urban" },
    "benefit": "Collateral-free working capital loan",
    "link": "https://pmsvanidhi.mohua.gov.in/"
  },
  {
    "id": "pm-vishwakarma",
    "name": "PM Vishwakarma",
    "category": "Self-Employed",
    "description": "Support scheme for traditional artisans and craftspeople.",
    "eligibility": { "minAge": 18, "occupation": ["artisan", "craftsperson"] },
    "benefit": "₹9,000/month stipend + ₹6,000 travel + ₹2L insurance",
    "link": "https://pmvishwakarma.gov.in/"
  },
  {
    "id": "pm-mudra",
    "name": "PM Mudra Yojana",
    "category": "Self-Employed",
    "description": "Collateral-free loans for small and micro non-farm businesses.",
    "eligibility": { "minAge": 18, "occupation": ["self_employed", "small_business"] },
    "benefit": "Collateral-free loans up to ₹10–20 lakh",
    "link": "https://www.mudra.org.in/"
  },
  {
    "id": "stand-up-india",
    "name": "Stand-Up India",
    "category": "Self-Employed",
    "description": "Bank loans for SC/ST and women entrepreneurs setting up new enterprises.",
    "eligibility": { "minAge": 18, "category": ["SC", "ST"], "genderOrCategory": true },
    "benefit": "Bank loans ₹10 lakh – 1 crore",
    "link": "https://www.myscheme.gov.in/schemes/sui"
  },
  {
    "id": "e-shram",
    "name": "e-Shram Card",
    "category": "Self-Employed",
    "description": "Universal ID and accident insurance for unorganized sector workers.",
    "eligibility": { "minAge": 16, "maxAge": 59, "occupation": ["unorganized_worker", "daily_wage", "self_employed"] },
    "benefit": "Universal worker ID + ₹2 lakh accident insurance",
    "link": "https://eshram.gov.in/"
  },
  {
    "id": "national-scholarship-portal",
    "name": "National Scholarship Portal",
    "category": "Students",
    "description": "Merit and means-based scholarships for EWS/minority/SC-ST-OBC students.",
    "eligibility": { "occupation": ["student"], "maxIncome": 250000, "category": ["EWS", "SC", "ST", "OBC", "Minority"] },
    "benefit": "Merit/means-based scholarship",
    "link": "https://scholarships.gov.in/"
  },
  {
    "id": "pm-yasasvi",
    "name": "PM YASASVI Scholarship",
    "category": "Students",
    "description": "Scholarship for OBC/EBC/DNT students from economically weaker backgrounds.",
    "eligibility": { "occupation": ["student"], "maxIncome": 250000, "category": ["OBC", "EBC", "DNT"] },
    "benefit": "School/college scholarship",
    "link": "https://yashasvi.aicte.gov.in/login.php?r=session_invalid"
  },
  {
    "id": "skill-loan-scheme",
    "name": "Skill Loan Scheme",
    "category": "Students",
    "description": "Collateral-free loan for anyone pursuing a skill development or vocational course.",
    "eligibility": { "minAge": 16, "occupation": ["student", "unemployed"] },
    "benefit": "Collateral-free loan up to ₹7.5 lakh",
    "link": "https://www.msde.gov.in/"
  },
  {
    "id": "pmkvy",
    "name": "PM Kaushal Vikas Yojana",
    "category": "Students",
    "description": "Free skill training and certification for unemployed youth and school dropouts.",
    "eligibility": { "minAge": 15, "maxAge": 45, "occupation": ["unemployed", "student"] },
    "benefit": "Free skill training + certification",
    "link": "https://www.skillindiadigital.gov.in/pmkvy-dashboard"
  },
  {
    "id": "pm-ujjwala",
    "name": "PM Ujjwala Yojana",
    "category": "Women",
    "description": "Free LPG gas connection for women from below-poverty-line households.",
    "eligibility": { "gender": "female", "specialRule": "bpl_household" },
    "benefit": "Free LPG connection",
    "link": "https://pmuy.gov.in/"
  },
  {
    "id": "beti-bachao",
    "name": "Beti Bachao Beti Padhao",
    "category": "Women",
    "description": "Awareness and support scheme for girl child welfare and education.",
    "eligibility": { "childGender": "female" },
    "benefit": "Awareness + education support",
    "link": "https://wcd.gov.in/women/beti-bachao-beti-padhao"
  },
  {
    "id": "one-stop-centre",
    "name": "One Stop Centre Scheme",
    "category": "Women",
    "description": "Integrated support and shelter for women facing violence or distress.",
    "eligibility": { "gender": "female", "specialRule": "distress_situation" },
    "benefit": "Integrated support & shelter",
    "link": "https://wcd.gov.in/"
  },
  {
    "id": "ignoaps",
    "name": "Indira Gandhi National Old Age Pension",
    "category": "Senior Citizens",
    "description": "Monthly pension for elderly citizens from BPL households.",
    "eligibility": { "minAge": 60, "specialRule": "bpl_household" },
    "benefit": "Monthly pension (~₹200–500 + state top-up)",
    "link": "https://nsap.dord.gov.in/"
  },
  {
    "id": "adip",
    "name": "ADIP Scheme",
    "category": "Disabled",
    "description": "Free or subsidized assistive devices for persons with disabilities.",
    "eligibility": { "hasDisability": true },
    "benefit": "Free/subsidized assistive devices",
    "link": "https://disabilityaffairs.gov.in/"
  },
  {
    "id": "niramaya",
    "name": "Niramaya Health Insurance",
    "category": "Disabled",
    "description": "Health insurance for persons with autism, cerebral palsy, intellectual disability, or multiple disabilities.",
    "eligibility": { "hasDisability": true, "disabilityType": ["autism", "cerebral_palsy", "intellectual_disability", "multiple_disabilities"] },
    "benefit": "Health cover up to ₹1 lakh/year, no age limit",
    "link": "https://nationaltrust.nic.in/niramaya/"
  },
  {
    "id": "mgnrega",
    "name": "MGNREGA",
    "category": "Employment",
    "description": "Guaranteed wage employment for rural households willing to do unskilled manual work.",
    "eligibility": { "minAge": 18, "areaType": "rural", "willingToWork": "unskilled_manual" },
    "benefit": "100 days guaranteed wage employment/year",
    "link": "https://nrega.nic.in/"
  },
  {
    "id": "pm-surya-ghar",
    "name": "PM Surya Ghar (Muft Bijli)",
    "category": "Employment",
    "description": "Subsidy for households installing rooftop solar panels.",
    "eligibility": { "hasOwnRoof": true },
    "benefit": "Up to 300 units free solar power/month",
    "link": "https://pmsuryaghar.gov.in/"
  }
];

export default schemes;
