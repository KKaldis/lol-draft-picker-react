import requests
import pprint
import json

result = requests.get ('https://eun1.api.riotgames.com/lol/match/v4/matches/2914178522?api_key=RGAPI-6d95b220-86fb-42d6-96d4-fc5d2df9bccd')

# result.status_code

data = result.text
# print(data) 


# pp = pprint.PrettyPrinter(depth=10)
# pp.pprint(data)

with open("data.json", "w") as outfile:
   json.dump(data, outfile)


print("done")