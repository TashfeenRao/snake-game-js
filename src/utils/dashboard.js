import axios from 'axios'


// Set config defaults when creating the instance
// const instance = axios.create({
//   baseURL: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api'
// });

const postUserScore = async (user, score) => {
  try {
    const result = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hO7Qjq9E78W8wYzHcUCY/scores/', {
      user,
      score,
    });
    console.log(result)
    return result;
  } catch (error) {
    throw new Error('Unable to add score to board');
  }
};
const getAllUserScores = async () => {
  try {
    const data = await axios.get('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hO7Qjq9E78W8wYzHcUCY/scores/');
    console.log(data)
    return data;
  } catch (error) {
    throw new Error('Unable to get scores at this time');
  }
};

export {postUserScore, getAllUserScores}