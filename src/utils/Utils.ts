export const getPlayerFromIndex = (index: number) => {
    switch (index) {
        case 1:
            return "A";
        case 2:
            return "B";
        case 3:
            return "C";
        case 4:
            return "D";
        default:
            return null;
    }
}

export const getPointFromValue = (value: string) => {
    if (value == "ACE") {
        return 1;
    }
    if (value == "JACK" || value == "QUEEN" || value == "KING") {
        return 10;
    }
    return parseInt(value, 10);
}
