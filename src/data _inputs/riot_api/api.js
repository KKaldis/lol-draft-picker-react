// import matchlist  from "matchLists/matchlist_eun1.json";

// for (const val of matchlist) { // You can use `let` instead of `const` if you like
//     console.log(val);
// }

const api_url =
  "https://eun1.api.riotgames.com/lol/match/v4/matches/2914193919?api_key=RGAPI-00d33b67-8465-4b2a-b78e-809b39fded6e";

// Defining async function
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();

  if (data["gameMode"] === "CLASSIC" && data["gametype"] === "MATCHED_GAME" && data["mapId"] === 11);
  {
    console.log(data);
  }

  if (response) {
    hideloader();
  }
  show(data);
}
// Calling that async function
getapi(api_url);
