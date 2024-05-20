function generateRandomId() {
    let min = 10000; // minimum value (inclusive)
    let max = 99999; // maximum value (inclusive)

    // Generate a random number between min and max
    let randomId = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomId;
}

module.exports = {
    generateRandomId:generateRandomId
}
