function iconFor(ptype) {
    switch (ptype) {
        case "Bexicap": 
        case "Capsule": 
        case "Capsule (Pellet)": 
        case "Cozycap":  
        case "Inhalation Capsule": 
            return "capsule";
        case "Caplet": 
        case "Tablet": 
            return "tablet";
        case "Suppository": 
        case "Vaginal Cream": 
        case "Vaginal Suppository": 
        case "Vaginal Tablet":
            return "suppository";
        case "Elixir": 
        case "Emulsion": 
        case "Oral Solution":  
        case "Powder for Solution":  
        case "Suspension": 
        case "Syrup": 
            return "syrup";
        case "Cream": 
        case "Dental Gel": 
        case "Muscle Rub": 
        case "Oral Capsule & Vaginal Cream": 
        case "Oral Gel": 
        case "Oral Paste":
            return "cream";
        case "Rectal Saline": 
        case "Solution": 
        case "Topical Solution":
            return "solution";
        case "Inhaler": 
        case "Evohaler": 
            return "inhaler";
        case "Ear Drop": 
        case "E/E Drop": 
        case "Nasal Drop": 
            return "nasal-drop";
        case "Effervescent Granules": 
        case "Oral Powder": 
        case "Oral Soluble Film": 
        case "Powder":
        case "Granules": 
            return "sachet";
        case "Eye Drop": 
        case "E/E Ointment":  
            return "eye-drop";
        case "Eye Ointment":
            return "eye-ointment";
        case "Gel": 
        case "Lotion": 
        case "Ointment": 
        case "Rectal Ointment": 
        case "Topical Gel": 
        case "Vaginal Gel": 
        case "Vaginal Pessary":
            return "ointment";
        case "Hand Rub": 
        case "Mouthwash": 
        case "Scalp Applicator": 
        case "Scalp Lotion": 
        case "Scalp Solution": 
        case "Shampoo":
            return "hand-rub";
        case "Injection": 
            return "injection";
        case "Infusion":
            return "iv-infusion";
        case "Solution for Inhalation":
            return "dry-powder-inhalation";
        case "Cleanser Soap": 
        case "Medicated Bar":
            return "soap";
        case "Nasal Spray":
            return "nasal-spray";
        case "Drops":
        case "Pediatric Drop":
            return "drop";
        case "Spray":
            return "spray";
        case "Gas": 
        case "Patch": 
        case "Surgical Scrub": 
        case "NULL":
            return "medicine";
        default:
            return "medicine";
    }
}