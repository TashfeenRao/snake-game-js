import axios from 'axios'


// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: 'https://us-central1-js-capstone-backend.cloudfunctions.net/api'
});

const postUserScore = async (name, score) => {
  try {
    const result = await instance().post('/games/yfzJ1aThnvYlVW10EJEr/scores', {
      user: name,
      score,
    });
    return result;
  } catch (error) {
    throw new Error('Unable to add score to board');
  }
};
