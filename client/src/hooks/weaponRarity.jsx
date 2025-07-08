export const weaponRarity = (rarity, name) => {
    if (name[0] == "★") {
        return "rare";
    }

    switch (rarity) {
        case "Classified":
            return "classified";
            
        case "Restricted":
            return "restricted"

        case "Mil-Spec Grade":
            return "milspec";

        case "Consumer Grade":
            return "uncommon";
        
        case "Industrial Grade":
            return "uncommon";

        case "Covert":
            return "covert";

        default:
            return "restricted";
    }
}