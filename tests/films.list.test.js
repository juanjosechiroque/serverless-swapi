
const films = require("../src/films/list");

const eventGenerator = require("./eventGenerator");

test('Get 6 films', async () => {
  
  const event = eventGenerator({});
  const res = await films.getFilms(event);  
  const body = JSON.parse(res.body);
  
  expect(body.data.length).toBe(6);
  
});