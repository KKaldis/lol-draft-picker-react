const apikey = "RGAPI-6d95b220-86fb-42d6-96d4-fc5d2df9bccd";
const api_url =
  "https://eun1.api.riotgames.com/lol/match/v4/matches/2914193919?api_key=" +
  apikey;

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);
  // Storing data in form of JSON
  var data = await response.json();

  // Check Game Type (mode, )
  if (
    data["gameMode"] === "CLASSIC" &&
    data["gametype"] === "MATCHED_GAME" &&
    data["mapId"] === 11
  );
  {
    // console.log(data);
    var matchData = {};

    for (let i = 0; i < data["participants"].length; i++) {
      var team = data["participants"][i]["teamId"];
      var champion = data["participants"][i]["championId"];
      var lane = data["participants"][i]["timeline"]["lane"];
      var role = data["participants"][i]["timeline"]["role"];
      var kills = data["participants"][i]["stats"]["kills"];
      var deaths = data["participants"][i]["stats"]["deaths"];
      var assists = data["participants"][i]["stats"]["assists"];
      var win = data["participants"][i]["stats"]["win"];
      var xpDif = data["participants"][i]["timeline"]["xpDiffPerMinDeltas"];
      var csDif = data["participants"][i]["timeline"]["csDiffPerMinDeltas"];
      var dtDif = data["participants"][i]["timeline"]["damageTakenDiffPerMinDeltas"];
      const kaldor =[{ team, champion, lane, role }, { kills, deaths, assists, win },{ xpDif,csDif , dtDif}]


      //   console.log(JSON.stringify({ team, champion, lane, role }));
      //   console.log(JSON.stringify({ kills, deaths, assists, win, xpDif }));

     
      if (lane === "BOTTOM") {
        console.log(kaldor);
        // console.log({ team, champion, lane, role });
        // console.log({ kills, deaths, assists, win });
        // console.log({ xpDif,csDif , dtDif});
      }
    }
  }

  if (response) {
    hideloader();
  }
  show(data);
}
// Calling that async function
getapi(api_url);
