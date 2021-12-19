from fastbook import *
from fastai.vision.widgets import *

path = Path('./dataset')

classes = ()

#dynamic import classes
classes = tuple(os.listdir('dataset'))

#check
print(classes)

#prepare data - conver svg to png files
import os
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM

for dir in classes:
	for file in os.listdir(f'dataset/{dir}'):
		if '.svg' in file:
			svg_path = (f'dataset/{dir}/{file}')
			drawing = svg2rlg(svg_path)
			png_file = file.replace('.svg', '.png')
			file_path = (f'dataset/{dir}/{png_file}')
			#save file to png
			renderPM.drawToFile(drawing, file_path, fmt='PNG')
			#delete svg old
			os.remove(svg_path)

#load once more classes
classes = tuple(os.listdir('dataset'))

data = DataBlock(
    blocks=(ImageBlock, CategoryBlock),
    get_items=get_image_files,
    splitter=RandomSplitter(valid_pct=0.2,seed=42),
    get_y=parent_label,
    item_tfms=Resize(128)
)

data = data.new(
    item_tfms=RandomResizedCrop(224, min_scale=0.5),
    batch_tfms=aug_transforms(mult=0.0, do_flip=False, flip_vert=False, max_rotate=0.0, min_zoom=0.0, max_zoom=0.0, max_lighting=0.0, max_warp=0.0, p_affine=0.0, p_lighting=0.0, xtra_tfms=None, size=None, mode='bilinear', pad_mode='border', align_corners=True, batch=False, min_scale=1.0))

dls = data.dataloaders(path, bs = 32)

learn = cnn_learner(dls, alexnet, metrics=error_rate)

learn.fit_one_cycle(1) #jedna epoka
learn.save('a3.1.1.1')
learn.export(fname="model.pkl")
