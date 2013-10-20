function drawpoly(args)

* Get arguments
Rx.1 = subwrd(args,1)
Ry.1 = subwrd(args,2)
i=1; a=2;
while (Rx.i!='' & Ry.i!='')
  i=i+1
  a=a+1; Rx.i = subwrd(args,a)
  a=a+1; Ry.i = subwrd(args,a)
endwhile
Rx.i=Rx.1
Ry.i=Ry.1
n=i

* Test for parameters
if (Rx.1='' | Ry.1='')
  say 'Draws a polygon on the screen using world coordinates.'
  say 'Usage: drawpoly lon1 lat1 lon2 lat2 lon3 lat3 ... '
  return
endif

* Find allowed dimensions
'q dims'
lin =sublin(result,2); Bxa = subwrd(lin,6); Bxb = subwrd(lin,8)
lin =sublin(result,3); Bya = subwrd(lin,6); Byb = subwrd(lin,8)

i=2
while (i<=n)
  j=i-1

  'q w2xy 'Rx.j' 'Ry.j
  x1=subwrd(result,3)
  y1=subwrd(result,6)
  
  'q w2xy 'Rx.i' 'Ry.i
  x2=subwrd(result,3)
  y2=subwrd(result,6)
  
  'draw line 'x1' 'y1' 'x2' 'y2
  i=i+1
endwhile

return