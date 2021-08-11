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


champLinks = soup.find("div", {"id":"champions"}) #get champion urls

for a in champLinks.find_all('a', href=True):
    urlArray = "https://counterstats.net" + a['href'] #add domain to urls
    reqChamp = requests.get(urlArray, headers)
    soupChamp = BeautifulSoup(reqChamp.content, 'html.parser')
    
    champName = soupChamp.h1.text[:-14] #champion name crawled variable

    
    statBox = soupChamp.find("div", {"class":"champ-box__wrap new"}) #find lane box


    lane = statBox.find("h2") #find heading with lane
    span = lane.span    #remove 1st span
    span.decompose()    #remove 1st span
    span = lane.span    #remove 2nd span
    span.decompose()    #remove 2nd span
    lane = lane.text    #get lane text from div
    lane = "".join([s for s in lane.splitlines(True) if s.strip("\r\n")]) #remove new lines created from removign <span>


    #round stat box
    round = statBox.find("a", {"class":"radial-progress"}) #find graph div
    roundCoutnerChamp = round.find("img")['alt'][18:] #get counter champ name
    roundCoutnerValue = round.find("span").text #get counter champ value

    #quare stat box
    square = statBox.find("div", {"class":"stats-bar"}) #find graph div
    squareCounterChamp = square.find("img")['alt'][:12-len(champName)] #get counter champ name
    squareCounterValue = square.find("span").text  #get counter champ value

    print(f'{champName} - {lane}')
    print(f'{roundCoutnerChamp} : {roundCoutnerValue}')
    print(f'{squareCounterChamp} : {squareCounterValue}')
    time.sleep(1) # Sleep for (X) seconds
    print(f'')
    


