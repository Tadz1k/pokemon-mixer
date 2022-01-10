from datetime import datetime
import os
import csv
import bs4
import random
#scrapping
import requests
import urllib.request
import time
from bs4 import BeautifulSoup

#własne importy
import csv_controller


def getPokemonStats(name):
    dir_path = os.path.dirname(os.path.realpath(__file__))
    stats_path = f'{os.path.join(dir_path, "data", "stats.tsv")}'
    tsv_file = open(stats_path)
    read_tsv = csv.reader(tsv_file, delimiter="\t")

    stats = {'id':'', 'name':'', 'type':'', 'total':'', 'hp':'', 'attack':'', 'defense':'', 'speedattack':'', 'speeddefense':'', 'speed':''}

    for row in read_tsv:
        if name.lower() == row[1].lower():
            stats['id']             = row[0]
            stats['name']           = row[1]
            stats['type']           = row[2]
            stats['total']          = row[3]
            stats['hp']             = row[4]
            stats['attack']         = row[5]
            stats['defense']        = row[6]
            stats['speedattack']    = row[7]
            stats['speeddefense']   = row[8]
            stats['speed']          = row[9]

    return stats

def generateNewPokemon(stats1, stats2):

    temp_list = [stats1, stats2]
    temp_total = 0
    stats = {'id':'', 'name':'', 'type':'', 'total':'', 'hp':'', 'attack':'', 'defense':'', 'speedattack':'', 'speeddefense':'', 'speed':'', 'image':'', 'create-date':'', 'parent1':'', 'parent2':''}
    url = f'https://pokemon.alexonsager.net/{stats1["id"]}/{stats2["id"]}'
    image = f'https://images.alexonsager.net/pokemon/fused/{stats1["id"]}/{stats1["id"]}.{stats2["id"]}.png'

    url_contents = urllib.request.urlopen(url).read()
    soup = bs4.BeautifulSoup(url_contents, "html.parser")
    div = soup.find("div", {"id" : "pk_name"})
    pk_name = str(div.text)

    stats['name'] = pk_name
    stats['image'] = image
    stats['parent1'] = stats1['name']
    stats['parent2'] = stats2['name']

    #pobieranie i formatowanie aktualnej daty
    stats['create-date'] = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    #TODO : wyliczyć statystyki
    for x in stats:
        if x == 'type':
            stats['type'] = temp_list[round(random.random())]['type']
        #statystyki takie jak atak, obrona itd wyznaczane są na zasadzie losowania od kogo można odziedziczyć daną statystykę,
        # a następnie ta wyliczana jest losowo z zakresu (parent -40% / + 30%)
        if x != 'id' and x != 'name' and x != 'type' and x != 'total' and x != 'image' and x != 'create-date' and x != 'parent1' and x != 'parent2':
            #najpierw losuję od kogo chcę wziąć statystykę
            parent = round(random.random())
            #następnie losuję, jaki procent z zakresu -0.4 -> +0.3 chcę użyć
            percent = random.randrange(60, 130)
            stats[x] = str(int(round(int(temp_list[parent][x]))*percent/100))
            temp_total += int(stats[x])
    stats['total'] = temp_total    
    #odczyt z csvki, jakie ID powinien dostać pokemon
    stats['id'] = int(csv_controller.getNewId())+1
    csv_controller.saveToFile(stats)


    return stats



