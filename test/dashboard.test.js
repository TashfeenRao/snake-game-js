import { postUserScore, getAllUserScores } from '../src/utils/dashboard';


test('should successfully create the player and score given name and score', async () => {
  const data = await postUserScore('steve-test', 100);
  expect(data.data.result).toBe('Leaderboard score created correctly.');
  expect(data.status).toBe(201);
  expect(data.statusText).toBe('Created');
}, 30000);

test('should successfully return all players and their scores', async () => {
  const result = await getAllUserScores();
  expect(typeof result).toBe('object');
  expect(result.status).toBe(200);
  expect(result.statusText).toBe('OK');
}, 30000);