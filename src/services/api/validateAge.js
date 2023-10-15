function isChildUnder10(dateOfBirth) {
    const birthYear = new Date(dateOfBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;
    return age < 10;
}

module.exports = { isChildUnder10 };