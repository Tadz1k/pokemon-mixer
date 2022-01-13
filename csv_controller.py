import csv
import os
import pandas as pd
import numpy as np


dir_path = os.path.dirname(os.path.realpath(__file__))
csv_file = f'{os.path.join(dir_path, "data", "pokemons.csv")}'


def get_new_id():
    #ta metoda zwracała błędy
    #df = pd.read_csv(csv_file, sep=',')
    #if len(df.index) == 0:      #jeśli nie ma danych w pliku csv, to id jest 0
        #return -1               #dlatego bo dodaję +1 w kodzie
    #else:
        #return df['id'].max()   #jeśli są jakieś dane w pliku csv, to zwracam najwyższe id
    max_id = 0
    skip_header = False
    with open(csv_file, 'r', newline='') as f:
        csvreader = csv.reader(csv_file, delimiter=',')
        for line in f:
            if skip_header:
                splitted_line = line.split(',')
                if int(splitted_line[0]) > max_id:
                    max_id = int(splitted_line[0])
            elif not skip_header:
                skip_header = True

        
    return max_id

def save_to_file(pokemon):
    data_list = []
    #konwertuję słownik na listę
    for key in pokemon:
        data_list.append(pokemon[key])
    
    with open(csv_file, 'a', newline='') as f:
        wo = csv.writer(f)
        wo.writerow(data_list)
        f.close()

def get_pokemon_by_id(pokemonid):
    output_data = []
    with open(csv_file, 'r', newline='') as f:
       for line in f:
           splitted_line = line.split(',')
           if splitted_line[0] == str(pokemonid):
               output_data = splitted_line
    return output_data

def get_pokedex_data():
    output_list = []
    with open(csv_file, 'r', newline='') as f:
        lines = f.readlines()[1:]
        for line in lines:
            output_data = {'id':'', 'name':'', 'type':'', 'total':'', 'hp':'', 'attack':'', 'defense':'', 'speedattack':'', 'speeddefense':'', 'speed':'', 'image':'', 'create-date':'', 'parent1':'', 'parent2':''}
            splitted_line = line.split(',')
            output_data['id'] = splitted_line[0]
            output_data['name'] = splitted_line[0]
            output_data['id'] = splitted_line[0]
            output_data['name'] = splitted_line[1]
            output_data['type'] = splitted_line[2]
            output_data['total'] = splitted_line[3]
            output_data['hp'] = splitted_line[4]
            output_data['attack'] = splitted_line[5]
            output_data['defense'] = splitted_line[6]
            output_data['speedattack'] = splitted_line[7]
            output_data['speeddefense'] = splitted_line[8]
            output_data['speed'] = splitted_line[9]
            output_data['image'] = splitted_line[10]
            output_data['create-date'] = splitted_line[11]
            output_data['parent1'] = splitted_line[12].strip()
            output_data['parent2'] = splitted_line[13].strip()
            output_list.append(output_data)
    return output_list


