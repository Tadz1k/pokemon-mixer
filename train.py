from fastbook import *
from fastai.vision.widgets import *
from fastai.vision import *
from fastai.metrics import *
#images
import os
from svglib.svglib import svg2rlg
from reportlab.graphics import renderPM
from PIL import Image

def main():
	path = Path('./dataset')

	classes = ()

	#dynamic import classes
	classes = tuple(os.listdir('dataset'))

	#check
	print(classes)

	#prepare data - conver svg to png files

	print('==================================================')
	print('Konwertowanie zdjęć....')
	print('==================================================')
	for dir in classes:
		for file in os.listdir(f'dataset/{dir}'):
			file_path = (f'dataset/{dir}/{file}')
			if '.svg' in file:
				jpg_file = file.replace('.svg', '.jpg')
				jpg_path = (f'dataset/{dir}/{jpg_file}')
				svg_path = (f'dataset/{dir}/{file}')
				drawing = svg2rlg(svg_path)                         #load svg to memory
				print(f'{dir}/{file} ===> {dir}/{jpg_file}')
				os.remove(svg_path)                                 #delete svg file
				renderPM.drawToFile(drawing, jpg_path, fmt='JPG')   #convert svg to jpg and save
			if '.png' in file:
				jpg_file = file.replace('.png', '.jpg')
				jpg_path = (f'dataset/{dir}/{jpg_file}')

				png_image = Image.open(file_path).convert('RGBA')               #load png file with alpha
				background = Image.new("RGBA", png_image.size, (255,255,255))   #create white background
				alpha_composite = Image.alpha_composite(background, png_image)  #replace alpha with white color
				alpha_composite_3 = alpha_composite.convert('RGB')              #convert to RGB
				print(f'{dir}/{file} ===> {dir}/{jpg_file}')
				os.remove(file_path)                                            #delete png file
				alpha_composite_3.save(jpg_path, 'JPEG', quality=100)           #save jpg file

	#load once more classes
	classes = tuple(os.listdir('dataset'))
	print('==================================================')
	print('KONIEC KONWERTOWANIA ZDJĘĆ...')
	print('==================================================')

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

	learn = cnn_learner(dls, models.resnet101, metrics = accuracy)

	#earn.fit_one_cycle(5)
	#learn.save('a3.1.1.1')
	#learn.export(fname="model.pkl")

	for i in range(10): #20 epok
		print(f'iteracja : {i}')
		learn.fit_one_cycle(1)
		learn.save(f'a3.1.1.{i}')
		learn.export(fname=f'learned_pickles/model{i}.pkl')

if __name__ == '__main__':
	main() #added for freeze support
