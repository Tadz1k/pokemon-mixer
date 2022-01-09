from __future__ import division
from flask import Flask, request, render_template
from fastai.vision.all import *
from fastai.vision.widgets import *
from sassutils.wsgi import SassMiddleware
import pathlib
import os

#Własne importy
import stats_generator

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

@app.route('/pokedex', methods=['GET'])
def pokedex():
    return render_template('pokedex.html')

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
            pokemons_test = []
            pokemons_test.append(pokemons_data.get(pokemons[0]))
            pokemons_test.append(pokemons_data.get(pokemons[1]))
            stats_generator.generateNewPokemon(pokemons_data.get(pokemons[0]), pokemons_data.get(pokemons[1]))
            return tuple(pokemons_test) #pokemons_test[0]['name'] <- wszystkie statystyki są opisane w stats_generator.py
    return None

if __name__ == '__main__':
    app.run(debug=True)
