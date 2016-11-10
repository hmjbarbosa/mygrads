function makebg(args)
* makebg.gs
*
* This script creates a background image that shows topographic texture
* It requires an OPeNDAP-enabled version of GrADS and also uses the external
* ImageMagick utility "composite" to merge the intermediate gif files
* see http://www.imagemagick.org for info on how to get this software

* Get the topographic data and define variables
'sdfopen http://monsoondata.org:9090/dods/navytopo'
say '1 ok'
'sdfopen http://monsoondata.org:9090/dods/navyh2o'
say '2 ok'
'define shadow = hdivg(smth9(z),const(z,0))'

* Set colors
'set rgb 24   0   0   0'
'set rgb 25  16  16  16'
'set rgb 26  32  32  32'
'set rgb 30 222 222 222'
'set rgb 92 216 255 255'

* Set map characteristics
*'set mproj nps'
*'set mpvals -120 -76 25 50'  ;* Coordinates for the United States 
'set mpdraw off'
'set grid off'
'set gxout shaded'

* Draw the shadow images
'c'
'set grads off'
'set clevs -0.015 -0.003 '
'set ccols 26 25 24 '
'd shadow'
'printim shadow1.gif gif'

'c'
'set grads off'
'set clevs 0.003 0.015'
'set ccols 24 25 26 '
'd shadow'
'printim shadow2.gif gif'

* Draw the water mask
'c'
'set grads off'
'set clevs 50'
'set ccols 30 92'
'd w.2'
'printim water.gif gif'

* Combine the images to create bg.gif
'!composite -compose plus water.gif shadow1.gif e1.gif'
'!composite -compose minus e1.gif shadow2.gif bg.gif'

* Create a copy in png format
'!convert bg.gif bg.png'
exit

* Clean up
'!rm -f shadow1.gif'
'!rm -f shadow2.gif'
'!rm -f water.gif'
'!rm -f e1.gif'
