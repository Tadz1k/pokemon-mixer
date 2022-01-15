from __future__ import division
from flask import Flask, request, render_template
from fastai.vision.all import *
from fastai.vision.widgets import *
from sassutils.wsgi import SassMiddleware
import pathlib
import os

#Własne importy
import stats_generator
import csv_controller
import battle_system

app = Flask(__name__)

app.wsgi_app = SassMiddleware(app.wsgi_app, {
    __name__: ('static/sass', 'static/css', '/static/css')
})

#Skomentuj jeśli nie robisz tego na windowsie
# pathlib.PosixPath = pathlib.WindowsPath
dir_path = os.path.dirname(os.path.realpath(__file__))
model = f'{os.path.join(dir_path, "models", "densenet_201_87pc.pkl")}'

print(model)

def model_predict(img_path, model_path):
    learn_inf = load_learner(model_path)
    pred , pred_idx , probs = learn_inf.predict(img_path)
    prob_value = probs[pred_idx] * 100
    print(f'{pred} - {prob_value:.02f}%')
    out = f'{pred}'
    return out

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/home', methods=['GET'])
def home():
    return render_template('home.html')

@app.route('/battle', methods=['GET'])
def battle():
    return render_template('battle.html')

@app.route('/battle', methods=['POST'])
def getBattleScore():
    return {'pokemon_data': battle_system.get_winner(request.form['pokemon1-battle-select'], request.form['pokemon2-battle-select'])}

@app.route('/pokedexData', methods=['GET'])
def getPokedexData():
    pokedex_data = csv_controller.get_pokedex_data()
    type_color = { 'bug': "#26de81", 'dragon': "#ffeaa7", 'electric': "#fed330", 'fairy': "#FF0069", 'fighting': "#30336b", 'fire': "#f0932b", 'flying': "#81ecec", 'grass': "#00b894", 'ground': "#EFB549", 'ghost': "#a55eea", 'ice': "#74b9ff", 'normal': "#95afc0", 'poison': "#6c5ce7", 'psychic': "#a29bfe", 'rock': "#2d3436", 'water': "#0190FF"}
    return {'pokedexData': pokedex_data, 'typeColor': type_color}

@app.route('/pokedex', methods=['GET'])
def pokedex():
    pokedexData = getPokedexData()
    return render_template('pokedex.html', pokemons=pokedexData['pokedexData'], typeColor=pokedexData['typeColor'])

@app.route('/pokemon/<pokemon_id>', methods=['GET'])
def getPokemonById(pokemon_id):
    return {'pokemon_data': csv_controller.get_pokemon_by_id(pokemon_id)}

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        basepath = Path(__file__).parent
        uploads_path = basepath.joinpath('uploads')
        pokemons = []
        pokemons_data = {}
        for file in request.files.items():
            file_path1 = uploads_path.joinpath(f'{file[0]}')
            file[1].save(f'{file_path1}')

            path = Path()
            model_path = (path/model)

            out = model_predict(os.path.join(dir_path, "uploads", f'{file[0]}'), path/model_path)
            pokemons_data[out] = {}
            #zliczenie statystyk pokemona
            stats = stats_generator.getPokemonStats(out)
            pokemons_data[out] = stats
            #tutaj możemy też zrobić dicta z statystykami, żeby wyświetlić je na froncie
            pokemons.append(out)

        if pokemons[0] == pokemons[1]: #Trzeba zwracać błąd, jeśli pokemony są takie same
            print('Te same pokemony!')
        else:
            pokemons_test = {}
            pokemons_test['pokemon_parent1'] = pokemons_data.get(pokemons[0])
            pokemons_test['pokemon_parent2'] = pokemons_data.get(pokemons[1])
            print(pokemons_test)
            #pokemons_test.append(pokemons_data.get(pokemons[0]))
            #pokemons_test.append(pokemons_data.get(pokemons[1]))
            new_pokemon = stats_generator.generateNewPokemon(pokemons_data.get(pokemons[0]), pokemons_data.get(pokemons[1]))
            #pokemons_test.append(new_pokemon)
            pokemons_test['pokemon_hybrid'] = new_pokemon
            return pokemons_test
    return None

if __name__ == '__main__':
    app.run(debug=True)
