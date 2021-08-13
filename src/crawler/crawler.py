import requests
from bs4 import BeautifulSoup
import time
import pprint
import json
import random

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
counterData = {} #data storage dictionary

#data manipulation (cleaning and fixing)
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
    champName = soupChamp.h1.text[:-14].replace("-", " ").replace('\n','') #champion name crawled variable
    counterData[champName] = {}
    # print(f'{champName}')

    for statBox in soupChamp.find_all("div", {"class":"champ-box__wrap new"}): #find lane box

        laneData = statBox.find("h2") #find heading with lane
        laneData = laneData.text    #get lane text from div
        laneData = "".join([s for s in laneData.splitlines(True) if s.strip("\r\n")]).replace('\n','')[1:].split(')')[0]+")" #styling cleaning from text
        lane = laneData.split('(')[0][:-1] #clear lane data
        lanePersent = laneData.split('(')[1][:-1] #lane persentage data

        if (lane == "Top Lane"):
            lane = "Top"
        elif (lane == "In the Jungle"):
            lane = "Jungle"
        elif (lane == "Middle Lane"):
            lane = "Middle"
        elif (lane == "Bottom Lane"):
            lane = "Bottom"
        else:
            lane = "Support"
        
        counterData[champName][lane] = {}
        # counterData[champName][lane + " : " + lanePersent] = {}
        # print(f'{lane}')

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
            category = (str(pickCategory))[2:-2]

            counterData[champName][lane][category] = {}
            counterData[champName][lane][category][pickType] = {}
            # print(f'{pickType} : {pickCategory}')
            # print(f'{counterData}')
            # print(type(category))

            #round stat box
            for roundDiv in champDiv.find_all("a", {"class":"radial-progress"}): #find all graph div
                counterChamp = roundDiv.find("img")['alt'][len("Counter Stats for "):].replace("-", " ").replace('\n','') #get counter champ name
                counterValue = roundDiv.find("span").text.replace('\n','') #get counter champ value
                counterValue = morphValues(counterValue)
                counterData[champName][lane][category][pickType][counterChamp] = (counterValue)

                # print(f'{counterChamp} : {counterValue}')
                
            #quare stat box
            for squareDiv in champDiv.find_all("div", {"class":"stats-bar"}): #find all graph div
                counterChamp = squareDiv.find("img")['alt'][:-len(champName)-len(" countering ")].replace("-", " ").replace('\n','') #get counter champ name
                counterValue = squareDiv.find("span").text.replace('\n','') #get counter champ value
                counterValue = morphValues(counterValue)
                counterData[champName][lane][category][pickType][counterChamp] = (counterValue)
                
                # print(f'{counterChamp} : {counterValue}')
    
    pp = pprint.PrettyPrinter(depth=4)
    pp.pprint(counterData)

    # json_coutnerData = json.dumps(counterData, indent = 4)  
    # print(json_coutnerData)

    with open("data.json", "w") as outfile: 
        json.dump(counterData, outfile)

    randomTime = random.randint(3, 70)
    print("next run", randomTime)
    time.sleep(randomTime) # Sleep for (X) seconds
    
print("done")