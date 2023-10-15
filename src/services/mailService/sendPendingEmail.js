const { sendEmail } = require("./mailSender");

// Function to send pending emails
function sendPendingEmails(pendingRequests) {
    pendingRequests.forEach((request) => {
        sendEmail(request);
        // Remove the sent request from the array
        const index = pendingRequests.indexOf(request);
        if (index !== -1) {
            pendingRequests.splice(index, 1);
        }
    });
}

module.exports = {
    sendPendingEmails,
};
