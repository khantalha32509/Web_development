import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "khantalha3250@123";
const yourPassword = "talha@3250";
const yourAPIKey = "93e802d6-b71c-4e39-a908-16a9688b6a47";
const yourBearerToken = "c61cfaca-8719-4caf-8137-69003e298b8a";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const result = await axios.get(API_URL + "/random");
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth",async (req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2",{
      auth: {
        username: 'yourUsername',
        password: 'yourPassword'
    }
    })
    res.render("index.js",{
      content:JASON.stringify(response.data)
    })
  }
  catch(error){
    console.log(error.message)
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
});

app.get("/apiKey", async (req, res) => {
  try{
    const response= await axios.get(`https://secrets-api.appbrewery.com/filter`,{
      params:{
        apiKey:yourAPIKey,
        score:5
      }
    })
    res.render("index.js",{
      content:JSON.stringify(response.data)
    })
  }
  catch(error){
    res.status(404).send(error.message);
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  try{
  const response= await axios.get("https://secrets-api.appbrewery.com/user-secrets",{
    headers:{
      Authorization:`Bearer ${yourBearerToken}`
    },
    params:{
      id:42
    }
  })
  res.render("index.js",{
    content:JSON.stringify(response.data)
  })
}
catch(error){
  console.log(error.message)
}
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
