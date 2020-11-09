
const planets = require("../src/planets/get");

const eventGenerator = require("./eventGenerator");

test("Get planet", async () => {
  
  const planet_add = require("../src/planets/create");
  
  const event_add = eventGenerator({
    body: {
      name: "add jest planet",
      gravity: "2",
      population: "200",
      rotation_period: "48",    
    },
    method: "post"
  });
  
  const res_add = await planet_add.createPlanet(event_add);  
  const body_add = JSON.parse(res_add.body);  
  expect(res_add.statusCode).toBe(200);
  
  const event = eventGenerator({
    pathParametersObject: {
        id: body_add.data.id,
    },
    method: "get"
  });

  const res = await planets.getPlanet(event);
  expect(res.statusCode).toBe(200);

});


test("Get planet without id", async () => {

  const event = eventGenerator({});

  const res = await planets.getPlanet(event);  
  
  expect(res.statusCode).toBe(400);

});


test("Get planet with id doesn't exists", async () => {

  const event = eventGenerator({
    pathParametersObject: {
        id: 112233,
    },
    method: "get"
  });

  const res = await planets.getPlanet(event);  
  
  expect(res.statusCode).toBe(404);

});




/*
const event = eventGenerator({
    pathParametersObject: {
        id: 1604855835645,
    },
    method: "get"
  });

*/
