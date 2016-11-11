* author: Henrique M.J. Barbosa

* Interpolate a field to an exact longitude. Usefull for drawing values at
* specified boundaries or to calculate an average value along a line

function loninterp(args)

f=subwrd(args,1)
fixlon=subwrd(args,2)
ovar=subwrd(args,3)

* Fix lon and let grads find the nearest x
'set lon 'fixlon
'q dims'; lin=sublin(result,2); 
nearlon=subwrd(lin,6); nearx=subwrd(lin,9)
* Save the field on the nearest x
'fitnear='f

* Check if longitude exists or if it need to be interpolated
if (nearlon=fixlon)
  ovar'=fitnear'
  return 0
endif

* Find second most near x
if (nearlon<fixlon)
  farx=nearx+1
else
  farx=nearx-1
endif
'set x 'farx; 'q dims'
lin=sublin(result,2); farlon=subwrd(lin,6)
* Save the field on the so called far x
'fitfar='f

* The interpolation along x-axis is following a parallel. Even though
* these lines change their lenght with different latitude, we don't
* need any correction because we interpolate between gridpoints on the
* same latitutde.

* weights
w1=math_abs(farlon-fixlon)
w2=math_abs(nearlon-fixlon)
* interpolated field
'fit=(fitnear*('w1')+fitfar*('w2'))/'w1+w2
if (ovar!='')
  ovar'=fit'
endif

return 0