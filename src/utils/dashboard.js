import axios from 'axios';


const postUserScore = async (user, score) => {
  try {
    const result = await axios.post('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hO7Qjq9E78W8wYzHcUCY/scores/', {
      user,
      score,
    });
    return result;
  } catch (error) {
    throw new Error('Unable to add score to board');
  }
};
const getAllUserScores = async () => {
  try {
    const data = await axios.get('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/hO7Qjq9E78W8wYzHcUCY/scores/');
    return data;
  } catch (error) {
    throw new Error('Unable to get scores at this time');
  }
};

export { postUserScore, getAllUserScores };