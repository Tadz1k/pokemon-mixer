from __future__ import division
from flask import Flask, request, render_template
from fastai.vision.all import *
from fastai.vision.widgets import *
from sassutils.wsgi import SassMiddleware
import pathlib

import os

app = Flask(__name__)

app.wsgi_app = SassMiddleware(app.wsgi_app, {
    __name__: ('static/sass', 'static/css', '/static/css')
})

#Skomentuj jeśli nie robisz tego na windowsie
pathlib.PosixPath = pathlib.WindowsPath
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

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        basepath = Path(__file__).parent
        uploads_path = basepath.joinpath('uploads')
        pokemons = []
        for file in request.files.items():
            file_path1 = uploads_path.joinpath(f'{file[0]}')
            file[1].save(f'{file_path1}')

            path = Path()
            model_path = (path/model)
            # do poprawy żeby wrzucić do modelu co potrzebne

            out = model_predict(os.path.join(dir_path, "uploads", f'{file[0]}'), path/model_path)
            print(out)

            pokemons.append(out)



        return tuple(pokemons)
    return None

if __name__ == '__main__':
    app.run(debug=True)
