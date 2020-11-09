const Responses = require("../../common/API_Responses");

module.exports.createPlanet = async (event, context) => {
  
  const body = JSON.parse(event.body);    
  
  if (!body) { 
    return Responses._400({message: "Invalid request" }); 
  }
  
  if (!body.name || !body.gravity) {
    return Responses._400({message: "Missing parameters" }); 
  }
  
  const AWS = require("aws-sdk");  
  const db = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});
  
  const tableName = "swapi_planets";
  
  const id = new Date().valueOf();
  
  const params = {
    TableName: tableName,
    Item: {
      "id": id,
      "name": body.name,
      "gravity": body.gravity,
      "population": body.population,
      "rotation_period": body.rotation_period,      
    }
  }
  
  try {

    var data = await db.put(params).promise();    
    return Responses._200({message: "success" });

  } catch(error) {

    console.log("error: " + error);    
    return Responses._400({message: "error" });

  }
  
};