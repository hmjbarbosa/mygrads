function drawrec(args)

* Get arguments
Rxa = subwrd(args,1)
Rxb = subwrd(args,2)
Rya = subwrd(args,3)
Ryb = subwrd(args,4)
fill = subwrd(args,5)
opt = subwrd(args,6)
if (fill='')
  fill=0
endif

* Test for parameters
if (Rxa='' | Rxb='' | Rya='' | Ryb='')
  say 'Draw a rectangle on the screen using world coordinates.'
  say 'usage: drawrec lon_min lon_max lat_min lat_max [fill]'
  return
endif

* Find allowed dimensions
'q dims'
lin =sublin(result,2); Bxa = subwrd(lin,6); Bxb = subwrd(lin,8)
lin =sublin(result,3); Bya = subwrd(lin,6); Byb = subwrd(lin,8)

* Test if user input within allowed dimensions
if (Rya<Bya); Rya=Rya+360; endif
if (Rya>Byb); Rya=Rya-360; endif
if (Ryb<Bya); Ryb=Ryb+360; endif
if (Ryb>Byb); Ryb=Ryb-360; endif
if (Rxa<Bxa); Rxa=Rxa+360; endif
if (Rxa>Bxb); Rxa=Rxa-360; endif
if (Rxb<Bxa); Rxb=Rxb+360; endif
if (Rxb>Bxb); Rxb=Rxb-360; endif

if (Rya<Bya | Rya>Byb); say 'warn: lat_min='Rya' is outside range ['Bya','Byb']'; endif
if (Ryb<Bya | Ryb>Byb); say 'warn: lat_max='Ryb' is outside range ['Bya','Byb']'; endif  
if (Rxa<Bxa | Rxa>Bxb); say 'warn: lon_min='Rxa' is outside range ['Bxa','Bxb']'; endif
if (Rxb<Bxa | Rxb>Bxb); say 'warn: lon_max='Rxb' is outside range ['Bxa','Bxb']'; endif

'q w2xy 'Rxa' 'Rya
x1=subwrd(result,3)
y1=subwrd(result,6)

'q w2xy 'Rxb' 'Ryb
x2=subwrd(result,3)
y2=subwrd(result,6)

if (fill=1)
  'draw recf 'x1' 'y1' 'x2' 'y2
else
  'draw rec 'x1' 'y1' 'x2' 'y2
endif

return