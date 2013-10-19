function drawline(args)

* Get arguments
Rxa = subwrd(args,1)
Rya = subwrd(args,2)
Rxb = subwrd(args,3)
Ryb = subwrd(args,4)

* Test for parameters
if (Rxa='' | Rxb='' | Rya='' | Ryb='')
  say 'Draws a line on the screen using world coordinates.'
  say 'Usage: drawline lon_min lat_min lon_max lat_max '
  return
endif

* Find allowed dimensions
'q dims'
lin =sublin(result,2); Bxa = subwrd(lin,6); Bxb = subwrd(lin,8)
lin =sublin(result,3); Bya = subwrd(lin,6); Byb = subwrd(lin,8)

* Test if user input within allowed dimensions
if (Rya<Bya | Rya>Byb); say 'warn: lat_min='Rya' is outside range ['Bya','Byb']'; endif
if (Ryb<Bya | Ryb>Byb); say 'warn: lat_max='Rya' is outside range ['Bya','Byb']'; endif
if (Rxa<Bxa | Rxa>Bxb); say 'warn: lon_min='Rxa' is outside range ['Bxa','Bxb']'; endif
if (Rxb<Bxa | Rxb>Bxb); say 'warn: lon_max='Rxa' is outside range ['Bxa','Bxb']'; endif

'q w2xy 'Rxa' 'Rya
x1=subwrd(result,3)
y1=subwrd(result,6)

'q w2xy 'Rxb' 'Ryb
x2=subwrd(result,3)
y2=subwrd(result,6)

'draw line 'x1' 'y1' 'x2' 'y2
return