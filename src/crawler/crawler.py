import requests
from bs4 import BeautifulSoup


headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
    }

url = "https://www.counterstats.net/"
req = requests.get(url, headers)
soup = BeautifulSoup(req.content, 'html.parser')

# print(soup.prettify())
soup = soup.find("div", {"class":"foot-champs__links"})

for a in soup.find_all('a', href=True):
    urlArray = "https://counterstats.net" + a['href']
    reqChamp = requests.get(urlArray, headers)
    soupChamp = BeautifulSoup(req.content, 'html.parser')

    soupChamp = soupChamp.find_all("a", href=True)
    print (soupChamp)
    


