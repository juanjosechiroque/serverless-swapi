const Responses = require("../common/API_Responses");

module.exports.getPlanet = async (event, context) => {
  
  if (!event.pathParameters || !event.pathParameters.id) {        
    return Responses._400({message: "Missing parameters" }); 
  }
  
  if (isNaN(event.pathParameters.id)) {        
    return Responses._400({message: "Invalid id" }); 
  }
  
  const id = parseInt(event.pathParameters.id);
  
  const AWS = require("aws-sdk");  
  const db = new AWS.DynamoDB.DocumentClient({ region: "us-east-1"});
  
  const tableName = "swapi_planets";
  
  const params = {
    TableName: tableName,
    Key: {
      id: id,
    },
  };
  
  try {

    var data = await db.get(params).promise(); 
    
    if (data.Item) {
      return Responses._200({message: "success", data: data });
    } else {
      return Responses._404({message: "planet not found" });  
    }
    
  } catch(error) {
    
    console.log("error: " + error);    
    console.log("id: " + id);    
    console.log(typeof id);    
    return Responses._400({message: "error" });

  }
  
};