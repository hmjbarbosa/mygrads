function drawmark(args)

* Get arguments
typ = subwrd(args,1)
Rxa = subwrd(args,2)
Rya = subwrd(args,3)
siz = subwrd(args,4)
txt = subwrd(args,5)

* Test for parameters
if (type='' | Rxa='' | Rxb='')
  say 'Draws a marker on the screen using world coordinates.'
  say 'Usage: drawmark type lon lat [size=0.1] [text=""]'
  return
endif

* Find allowed dimensions
'q dims'
lin =sublin(result,2); Bxa = subwrd(lin,6); Bxb = subwrd(lin,8)
lin =sublin(result,3); Bya = subwrd(lin,6); Byb = subwrd(lin,8)

* Test if user input within allowed dimensions
if (Rya<Bya); Rya=Rya+360; endif
if (Rya>Byb); Rya=Rya-360; endif
if (Rxa<Bxa); Rxa=Rxa+360; endif
if (Rxa>Bxb); Rxa=Rxa-360; endif
if (Rya<Bya | Rya>Byb); say 'warn: lat='Rya' is outside range ['Bya','Byb']'; endif
if (Rxa<Bxa | Rxa>Bxb); say 'warn: lon='Rxa' is outside range ['Bxa','Bxb']'; endif

'q w2xy 'Rxa' 'Rya
x1=subwrd(result,3)
y1=subwrd(result,6)

if (siz=''); siz=0.1; endif
'draw mark 'typ' 'x1' 'y1' 'siz
x1=x1+siz*1.1
if (txt!='')
  'draw string 'x1' 'y1' 'txt
endif

return