import requests
from bs4 import BeautifulSoup
import time
import json

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

def morphValues(val):
    val = val.replace(' ','')
    if (val[-1] == '%'):
        val = val[:-1]
        f = float(val)
        val = f
    elif (val[-1] == 'K'):
        val = val[:-1]
        f = float(val)
        val = f * 1000
    elif (val[-1] == 'R'):
        val = val[:-2]
        f = float(val)
        val = f * 10
    else:
        f = float(val)
        val = f
    intVal = int(val)
    return intVal

for a in champLinks.find_all('a', href=True):
    urlArray = "https://counterstats.net" + a['href'] #add domain to urls
    reqChamp = requests.get(urlArray, headers)
    soupChamp = BeautifulSoup(reqChamp.content, 'html.parser')

    champName = soupChamp.h1.text[:-14].replace("-", " ") #champion name crawled variable
    print(f'{champName}')

    for statBox in soupChamp.find_all("div", {"class":"champ-box__wrap new"}): #find lane box

        lane = statBox.find("h2") #find heading with lane
        lane = lane.text    #get lane text from div
        lane = "".join([s for s in lane.splitlines(True) if s.strip("\r\n")]) #remove new lines created from removign <span>

        print(f'{lane}')

        for champDiv in statBox.find_all("div", {"class" : "champ-box"}):

            pickType = champDiv.find("em").text
            if (pickType == "Best Picks"):
                pickType = "Best"
            elif (pickType == "Worst Picks"):
                pickType = "Worst"
            else:
                pickType = "Popular"

            pickTag = champDiv.find("em")['class'] #get class name green, red, blue for best, worst, popular
            pickCategory = statBox.find("div", {"class":"champ-box"})['class']
            del pickCategory [0]


            print(f'{pickType} : {pickCategory}')

            #round stat box
            for roundDiv in champDiv.find_all("a", {"class":"radial-progress"}): #find all graph div
                counterChamp = roundDiv.find("img")['alt'][len("Counter Stats for "):].replace("-", " ").replace('\n','') #get counter champ name
                counterValue = roundDiv.find("span").text.replace('\n','') #get counter champ value
                counterValue = morphValues(counterValue)

                print(f'{counterChamp} : {counterValue}')
                
            #quare stat box
            for squareDiv in champDiv.find_all("div", {"class":"stats-bar"}): #find all graph div
                counterChamp = squareDiv.find("img")['alt'][:-len(champName)-len(" countering ")].replace("-", " ").replace('\n','') #get counter champ name
                counterValue = squareDiv.find("span").text.replace('\n','') #get counter champ value
                counterValue = morphValues(counterValue)

                print(f'{counterChamp} : {counterValue}')

        time.sleep(60) # Sleep for (X) seconds