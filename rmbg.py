

from rembg import remove 
from PIL import Image

# input and output file paths
input_path = "input.png"
output_path = "image_output.png"

#get the image 
input_image =  Image.open(input_path)

#remove the image
output_image = remove(input_image)

#save the image to the output path
output_image.save(output_path)

print("Background removed successfully!")

