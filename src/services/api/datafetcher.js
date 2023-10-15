// modules/dataFetcher.js
const axios = require('axios');
require('dotenv').config();

async function fetchUserData() {
    try {
        const { USER_PROFILE_URL, USER_URL } = process.env;
        const userProfileData = await axios.get(USER_PROFILE_URL);
        const userData = await axios.get(USER_URL);
        return {
            userProfiles: userProfileData.data,
            users: userData.data,
        };
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = { fetchUserData };