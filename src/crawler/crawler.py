import requests
from bs4 import BeautifulSoup
import time

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


champLinks = soup.find("div", {"id":"champions"})

for a in champLinks.find_all('a', href=True):
    urlArray = "https://counterstats.net" + a['href']
    reqChamp = requests.get(urlArray, headers)
    soupChamp = BeautifulSoup(reqChamp.content, 'html.parser')
    
    champName = soupChamp.h1.text[:-14] #champion name crawled variable

    
    statBox = soupChamp.find("div", {"class":"champ-box__wrap new"}) 


    lane = statBox.find("h2")
    span = lane.span
    span.decompose()
    span = lane.span
    span.decompose()
    lane = lane.text # lane export
    lane = "".join([s for s in lane.splitlines(True) if s.strip("\r\n")])



    round = statBox.find("a", {"class":"radial-progress"})
    coutnerChamp = round.find("img")['alt'][18:]
    coutnerValue = round.find("span").text



    print(f'{champName} - {lane}')
    print(f'{coutnerChamp} : {coutnerValue}')
    time.sleep(1) # Sleep for (X) seconds
    print(f'')
    


