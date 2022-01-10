import csv
import os
import pandas as pd
import numpy as np


dir_path = os.path.dirname(os.path.realpath(__file__))
csv_file = f'{os.path.join(dir_path, "data", "pokemons.csv")}'

def getNewId():

    df = pd.read_csv(csv_file, sep=',')
    if len(df.index) == 0:      #jeśli nie ma danych w pliku csv, to id jest 0
        return -1               #dlatego bo dodaję +1 w kodzie
    else:
        return df['id'].max()   #jeśli są jakieś dane w pliku csv, to zwracam najwyższe id

def saveToFile(pokemon):
    data_list = []
    #konwertuję słownik na listę
    for key in pokemon:
        data_list.append(pokemon[key])
    
    with open(csv_file, 'a', newline='') as f:
        wo = csv.writer(f)
        wo.writerow(data_list)
        f.close()
