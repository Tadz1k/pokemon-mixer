import os
import csv
import bs4
#scrapping
import requests
import urllib.request
import time
from bs4 import BeautifulSoup

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

    data = []
    url = f'https://pokemon.alexonsager.net/{stats1["id"]}/{stats2["id"]}'
    image = f'https://images.alexonsager.net/pokemon/fused/{stats1["id"]}/{stats1["id"]}.{stats2["id"]}.png'

    url_contents = urllib.request.urlopen(url).read()
    soup = bs4.BeautifulSoup(url_contents, "html.parser")
    div = soup.find("div", {"id" : "pk_name"})

    pk_name = str(div.text)

    data.append(pk_name)
    data.append(image)

    print(image)
    print(pk_name)

    #TODO : wyliczyć statystyki

    return tuple(data)

