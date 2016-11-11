* author: Henrique M.J. Barbosa

* Interpolate a field to an exact latitude. Usefull for drawing values at
* specified boundaries or to calculate an average value along a line

function latinterp(args)

f=subwrd(args,1)
fixlat=subwrd(args,2)
ovar=subwrd(args,3)

* Fix lat and let grads find the nearest y 
'set lat 'fixlat
'q dims'; lin=sublin(result,3); 
nearlat=subwrd(lin,6); neary=subwrd(lin,9)
* Save the field on the nearest y
'fitnear='f

* Check if latitude exists or if it need to be interpolated
if (nearlat=fixlat)
  ovar'=fitnear'
  return 0
endif

* Find second most near y
if (nearlat<fixlat)
  fary=neary+1
else
  fary=neary-1
endif
'set y 'fary; 'q dims'
lin=sublin(result,3); farlat=subwrd(lin,6)
* Save the field on the so called far y
'fitfar='f

* The interpolation along y-axis is following a meridian and hence
* there is no need for correcting the lenght along the way
* We do linear in angular distance

* weights
w1=math_abs(farlat-fixlat)
w2=math_abs(nearlat-fixlat)
* interpolated field
'fit=(fitnear*('w1')+fitfar*('w2'))/'w1+w2
if (ovar!='')
  ovar'=fit'
endif

return 0