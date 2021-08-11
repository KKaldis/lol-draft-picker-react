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

for a in champLinks.find_all('a', href=True):
    urlArray = "https://counterstats.net" + a['href'] #add domain to urls
    reqChamp = requests.get(urlArray, headers)
    soupChamp = BeautifulSoup(reqChamp.content, 'html.parser')
    
    champName = soupChamp.h1.text[:-14].replace("-", " ") #champion name crawled variable

    for statBox in soupChamp.find_all("div", {"class":"champ-box__wrap new"}): #find lane box

        lane = statBox.find("h2") #find heading with lane
        # span = lane.span    #remove 1st span
        # span.decompose()    #remove 1st span
        # span = lane.span    #remove 2nd span
        # span.decompose()    #remove 2nd span
        lane = lane.text    #get lane text from div
        lane = "".join([s for s in lane.splitlines(True) if s.strip("\r\n")]) #remove new lines created from removign <span>

        print(f'{champName} - {lane}')

        for champDiv in statBox.find_all("div", {"class" : "champ-box"}):

            pickType = champDiv.find("em").text
            pickTag = champDiv.find("em")['class']
            pickCategory = statBox.find("div", {"class":"champ-box"})['class']
            del pickCategory [0]

            print(f'{pickType} : {pickTag} : {pickCategory}')

            #round stat box
            for roundDiv in champDiv.find_all("a", {"class":"radial-progress"}): #find all graph div
                roundCoutnerChamp = roundDiv.find("img")['alt'][len("Counter Stats for "):].replace("-", " ") #get counter champ name
                roundCoutnerValue = roundDiv.find("span").text #get counter champ value

                print(f'{roundCoutnerChamp} : {roundCoutnerValue}')
                
            #quare stat box
            for squareDiv in champDiv.find_all("div", {"class":"stats-bar"}): #find all graph div
                squareCounterChamp = squareDiv.find("img")['alt'][:-len(champName)-len(" countering ")].replace("-", " ") #get counter champ name
                squareCounterValue = squareDiv.find("span").text #get counter champ value

                print(f'{squareCounterChamp} : {squareCounterValue}')
         
    time.sleep(60) # Sleep for (X) seconds