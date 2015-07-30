* author: Henrique M.J. Barbosa
* integral de linha de funcao escalar ao longo de um paralelo
function fitlat(args)

f=subwrd(args,1)
fixlat=subwrd(args,2)
ovar=subwrd(args,3)

* Fix lat and let grads find the nearest y to this coordinate
'set lat 'fixlat
'q dims'; lin=sublin(result,3); 
nearlat=subwrd(lin,6); neary=subwrd(lin,9)
* Save the field on the nearest y
'near='f

* check if latitude exists or if it need to be interpolated
if (nearlat=fixlat)
  ovar'=near'
  return 0
endif

* find second most near y
if (nearlat<fixlat)
  fary=neary+1
else
  fary=neary-1
endif
'set y 'fary; 'q dims'
lin=sublin(result,3); farlat=subwrd(lin,6)
* Save the field on the so called far y
'far='f

* The interpolation along y-axis is following a meridian and hence
* there is no need for correcting the lenght along the way
* We do linear in angular distance

* weights
w1=math_abs(farlat-fixlat)
w2=math_abs(nearlat-fixlat)
* interpolated field
'fit=(near*('w1')+far*('w2'))/'w1+w2

'd near'
'd far'
'd fit'

*'set x 1'
*ovar'=sum(('f')*xlen ,lon='loni',lon='lonf',-b)'


return 0