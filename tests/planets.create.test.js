
const planets = require("../src/planets/create");

const eventGenerator = require("./eventGenerator");


test("Add planet", async () => {

  const event = eventGenerator({
    body: {
      name: "jest planet",
      gravity: "1",
      population: "100",
      rotation_period: "24",    
    },
    method: "post"
  });

  const res = await planets.createPlanet(event);  

  const body = JSON.parse(res.body);

  expect(res.statusCode).toBe(200);

});


test("Add planet with invalid request", async () => {

  const event = eventGenerator({    
    method: "post"
  });

  const res = await planets.createPlanet(event);  
  
  expect(res.statusCode).toBe(400);  
  
  const body = JSON.parse(res.body);
  
  expect(body.message).toMatch(/Invalid/);

});



test("Add planet with missing parameters", async () => {

  const event = eventGenerator({  
    body: {
      name: "jest planet"
    },
    method: "post"
  });

  const res = await planets.createPlanet(event);  
  
  expect(res.statusCode).toBe(400);  
  
  const body = JSON.parse(res.body);
  
  expect(body.message).toMatch(/Missing/);

});
