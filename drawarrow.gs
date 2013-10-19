function drawarrow(args)

* Get arguments
px = subwrd(args,1)
py = subwrd(args,2)
len = subwrd(args,3)
wid = subwrd(args,4)
hlen = subwrd(args,5)
hwid = subwrd(args,6)
ang = subwrd(args,7)
txt = subwrd(args,8)

* Test for parameters
if (px='' | py='' | len='' | wid='' | hlen='' | wlen='' | ang='')
  say 'Draws a big arrow on the screen using world coordinates.'
  say 'usage: drawarrow lon lat length width head_length head_width angle [text]'
  say '     |-------- len -----|         '
  say '                 |-hlen-|         '
  say '                                  '
  say '                 3                '
  say '                 |\         |     '
  say '     1___________2  \       |     '
  say '  |  |                \     |     '
  say ' wid |      (px,py)    4   hwid   '
  say '  |  |___________6    /     |     '
  say '     7           |  /       |     '
  say '                 |/         |     '
  say '                 5                '
  say '                                  '
  return
endif

* build the list of points centered at (0,0)
npt=8
x.1=-len/2;          y.1=wid/2
x.2=-len/2+len-hlen; y.2=wid/2
x.3=-len/2+len-hlen; y.3=hwid/2
x.4= len/2;          y.4=0
x.5=-len/2+len-hlen; y.5=-hwid/2
x.6=-len/2+len-hlen; y.6=-wid/2
x.7=-len/2;          y.7=-wid/2
x.8=x.1;             y.8=y.1

* rotate the points by the desired angle and move to the central position
th=ang*math_acos(-1.)/180.
n=1
while(n<=npt)
  xx.n=math_cos(th)*x.n-math_sin(th)*y.n +px
  yy.n=math_sin(th)*x.n+math_cos(th)*y.n +py  
  n=n+1
endwhile

* desenha lista de retas
n=1
while(n<npt)
  nn=n+1
  'drawline 'xx.n' 'yy.n' 'xx.nn' 'yy.nn
  n=n+1
endwhile

* texto
if (txt!='')
  'q w2xy 'px' 'py
  x1=subwrd(result,3)
  y1=subwrd(result,6)
  
  'draw string 'x1' 'y1' 'txt
endif
  
return