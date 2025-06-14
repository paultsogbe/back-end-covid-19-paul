const express = require('express')
const formidableMiddleware = require("express-formidable")
const app = express()
app.use(formidableMiddleware())

//  import data json
const covid = require("./data/covid-19-api.json")


// Statistiques globales(pour tous les pays)

app.get("/", (req, res) =>{
    // on crée un tableau vide (variable)
    let results = []
    for(let i = 0; i < covid.length; i++){
        let country = {
            name: covid[i].name,
            cases: covid[i].latest_data.confirmed,//nombre de personne atteind
            deaths: covid[i].latest_data.deaths,// ...     ..         décédées
            recovered: covid[i].latest_data.recovered//..     ...       guérir
        }
       // à chaque tour de boucle, on crée un objet "country" dans lequel on ajoute 4 paires clé/valeur, et on l'ajoute dans le tableau "results"
        results.push(country)
    }


    res.json(results)


})
// Statistiques par pays

app.post("/by-country", (req, res) => {
  try {
    const countryName = req.fields.country;
    //  on stocke dans la variable "countryName" le nom du pays récupéré dans les paramètres query
    const results = [];
    for (let i = 0; i < covid.length; i++) {
      if (countryName === covid[i].name) {
        // cette condition permet de trouver, dans les données globales, les informations concernant le pays recherché
        let country = {
          name: covid[i].name,
          cases: covid[i].latest_data.confirmed, // nombre de personnes atteintes
          deaths: covid[i].latest_data.deaths, // décédés
          recovered: covid[i].latest_data.recovered // guéris
        };
        results.push(country);
      }
    }
    res.json(results);
  } catch (error) {
    res.status(404).json({ message: "it is not found" });
  }
});

app.listen(3000 , () =>{
    console.log("Server Started")
})