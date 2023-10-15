// formSubmission.js
const { fetchUserData } = require('../api/datafetcher');
const { isChildUnder10 } = require('../api/validateAge');

const pendingRequests = [];

async function handleFormSubmission(req, res) {
    const username = req.body.user;
    const wish = req.body.wish;

    try {
        const { userProfiles, users } = await fetchUserData();
        const userExists = users.find((user) => user.username === username);
        if (!userExists) {
            res.status(404).json({ message: "User doesn't exist" });
            return;
        }
        const userProfile = userProfiles.find((profile) => profile.userUid === userExists.uid);
        const userValidAge = isChildUnder10(userProfile.birthdate);
        if (!userValidAge) {
            res.status(422).json({ message: "User doesn't have a valid age" });
            return;
        }
        const request = {
            username,
            address: userProfile.address,
            wish,
        };
        pendingRequests.push(request);
        res.status(200).json({ message: 'Request received and validated successfully.' });
    } catch (error) {
        res.status(error.status).json({ message: error.message });
    }
}

module.exports = { handleFormSubmission, pendingRequests };
