from __future__ import division
from flask import Flask, request, render_template
from fastai.vision.all import *
from fastai.vision.widgets import *
from sassutils.wsgi import SassMiddleware

app = Flask(__name__)

app.wsgi_app = SassMiddleware(app.wsgi_app, {
    __name__: ('static/sass', 'static/css', '/static/css')
})

model = 'model.pkl'

def model_predict(img_path, model_path):
    learn_inf = load_learner(model_path)
    pred , pred_idx , probs = learn_inf.predict(img_path)
    prob_value = probs[pred_idx] * 100 
    out = f'Na zdjęciu ewidentnie znajduje się {pred}. Wiem to z {prob_value:.02f} % prawdopodobieństwem 👨‍🔬.'
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
        for file in request.files.items():
            basepath = Path(__file__).parent
            file_path = basepath.joinpath('uploads')
            filename = file[0]
            file_path = file_path.joinpath(filename)
            file[1].save(file_path)

        path = Path()
        model_path = (path/model)
        # do poprawy żeby wrzucić do modelu co potrzebne
        out = model_predict(file_path, model_path)
        return out
    return None

if __name__ == '__main__':
    app.run(debug=True)
