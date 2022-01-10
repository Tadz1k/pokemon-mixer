import csv_controller
import random

#zwraca tuple [id_pokemona, [dane_pokemona], procent, współczynnik zwycięztwa]
def get_winner(id_pokemon1, id_pokemon2):
    pokemon1 = csv_controller.get_pokemon_by_id(id_pokemon1)
    pokemon2 = csv_controller.get_pokemon_by_id(id_pokemon2)
    #grass, fire, flying, water, bug, poison, normal, dark, electric, psychic, ground, ice, steel, fairy, rock, ghost, fighting, dragon

    #kontry
    grass = ['rock', 'normal']
    fire = ['ice', 'dark', 'ground', 'poison', 'normal']
    flying = ['ground', 'normal', 'psychic', 'fighting']
    water = ['flying', 'bug', 'normal', 'electric', 'ground', 'steel']
    poison = ['psychic', 'fairy', 'dragon', 'fighting', 'normal']
    normal = ['bug']
    dark = ['fairy', 'normal', 'bug']
    electric = ['fire', 'grass', 'flying', 'bug', 'psychic', 'fighting']
    psychic = ['ghost', 'normal', 'bug', 'dragon']
    ground = ['grass', 'fighting', 'water', 'ice']
    ice = ['water', 'normal', 'poison', 'psychic', 'electric', 'flying', 'fighting']
    steel = ['fire', 'bug', 'normal', 'electric', 'fairy']
    fairy = ['flying', 'normal', 'bug', 'psychic']
    ghost = ['normal', 'ice', 'bug']
    fighting = ['ground', 'rock', 'steel', 'normal', 'grass', 'water']
    dragon = ['flying', 'ground', 'normal', 'bug', 'fairy', 'ghost']

    counters = {'grass': grass, 'fire': fire, 'flying': flying, 'water': water, 'poison': poison, 'normal': normal, 'dark': dark, 'electric': electric,
     'psychic': psychic, 'ground': ground, 'ice': ice, 'steel': steel, 'fairy': fairy, 'ghost': ghost, 'fighting': fighting, 'dragon': dragon}

    pokemon1_win_rate = 50
    pokemon2_win_rate = 50

    #pokemon data :
    # 0 - ID
    # 1 - Name
    # 2 - Type
    # 3 - Total
    # 4 - HP
    # 5 - Attack
    # 6 - Defense
    # 7 - SpeedAttack
    # 8 - SpeedDefense
    # 9 - Speed

    #analiza danych pokemonów 
    if pokemon1[1] > pokemon2[1] : pokemon1_win_rate += 7
    elif pokemon1[1] < pokemon2[1] : pokemon2_win_rate += 7
    
    pokemon1_types = pokemon1[2].split(' ')
    pokemon2_types = pokemon2[2].split(' ')

    print(pokemon1_types)
    print(pokemon2_types)

    #jeśli pokemon1 ma więcej niż jeden żywioł
    if len(pokemon1_types) > 1:
        for type in pokemon1_types:
            for type2 in pokemon2_types:
                for counter in counters.get(type.lower()):
                    counter = counter.strip().lower()
                    type2 = type2.strip().lower()
                    if counter == type2:
                        pokemon1_win_rate = pokemon1_win_rate * 1.05

    #jeśli pokemon2 ma więcej niż jeden żywioł
    if len(pokemon2_types) > 1:
        for type in pokemon2_types:
            for type2 in pokemon1_types:
                for counter in counters.get(type.lower()):
                    counter = counter.strip().lower()
                    type2 = type2.strip().lower()
                    if counter == type2:
                        pokemon2_win_rate = pokemon2_win_rate * 1.05

    #obliczanie przewagi dla pierwszego pokemona
    if len(pokemon2_types) == 1 and len(pokemon1_types) == 1:
        if pokemon1_types[0].lower() in counters.get(pokemon2_types[0].lower()):
            pokemon1_win_rate = pokemon1_win_rate * 1.05
        if pokemon2_types[0].lower() in counters.get(pokemon1_types[0].lower()):
            pokemon2_win_rate = pokemon2_win_rate * 1.05
    
    #obliczanie poszczególnych statystyk

    #czy atak jest większy niż obrona
    if int(pokemon1[5]) > int(pokemon2[6]) : pokemon1_win_rate = pokemon1_win_rate * 1.05
    if int(pokemon2[5]) > int(pokemon1[6]) : pokemon2_win_rate = pokemon2_win_rate * 1.05

    #czy speedattack jest większy niż speeddefense
    if int(pokemon1[7]) > int(pokemon2[8]) : pokemon1_win_rate = pokemon1_win_rate * 1.05
    if int(pokemon2[7]) > int(pokemon2[8]) : pokemon2_win_rate = pokemon2_win_rate * 1.05

    #jeśli atak jest większy niż hp i większy niż obrona
    if int(pokemon1[5]) > int(pokemon2[6]) + int(pokemon2[4]): pokemon1_win_rate = pokemon1_win_rate * 1.10
    if int(pokemon2[5]) > int(pokemon1[6]) + int(pokemon1[4]): pokemon2_win_rate = pokemon2_win_rate * 1.10

    if pokemon1_win_rate > pokemon2_win_rate : return tuple([id_pokemon1, pokemon1, pokemon1_win_rate])
    if pokemon2_win_rate > pokemon1_win_rate : return tuple([id_pokemon2, pokemon2, pokemon2_win_rate])
    #jeśli satystyki są takie same, to decyduje los
    if pokemon2_win_rate == pokemon1_win_rate:
        winner = round(random.random())
        if winner == 0:
            return tuple([id_pokemon1, pokemon1, pokemon1_win_rate])
        else :
            return tuple([id_pokemon2, pokemon2, pokemon2_win_rate])


print(get_winner(10, 10))


