function textbox(args)
ok=gsfallow('on')

* Get arguments
pos=subwrd(args,1)
bcol=subwrd(args,2)
fcol=subwrd(args,3)
tcol=subwrd(args,4)
* Get text
i=1; ok=-1; n=strlen(args); text=''
while (i<=n)
  c=substr(args,i,1)
  if (c='"')
    ok=-ok
  else
    if (ok>0); text=text''c; endif
  endif
  i=i+1
endwhile

* Test for parameters
if (pos='' | bcol='' | fcol='' | tcol='' | text='')
  say 'Draws a box in corner of the figure with a text inside.'
  say 'Usage: textbox <pos> <border color> <fill color> <text color> <text>'
  say '  pos = relative: br (bottom right), bl, tr, tl'
  say '        absolute: lon,lat'
  say '  colors = an integer as in any grads colors command'
  say '           for filling: -1 (no fill), >=0 to fill'
  say '  text = must be enclosed in double quotes'
  return
endif
lon=''; lat=''
if (pos!='br' & pos!='bl' & pos!='tr' & pos!='tl')
  i=1; ok=-1; n=strlen(pos); lon=''; lat=''
  while(i<=n)
    c=substr(args,i,1)
    if (c=',')
      ok=-ok
    else
      if (ok<0)
        lon=lon''c
      else
        lat=lat''c
      endif
    endif
    i=i+1
  endwhile  
  if (!isnumber(lon) | !isnumber(lat))
    say 'pos = br, bl, tr, tl or lon,lat'
    return
  endif
endif
if (!isnumber(bcol)) 
  say 'Border color should be a number: bcol='bcol' 'isnumber(bcol)
  return
endif
if (!isnumber(fcol)) 
  say 'Fill color should be a number: fcol='fcol' 'isnumber(fcol)
  return
endif
if (!isnumber(tcol)) 
  say 'Text color should be a number: tcol='tcol' 'isnumber(tcol)
  return
endif

* Find draw limits
*
* (x1,y2)------------(x2,y2) 
*   |                   |
*   |                   |
* (x1,y1)------------(x1,y2)
*
'q gxinfo'
lin=sublin(result,2) 
wid=subwrd(lin,4)
hei=subwrd(lin,6)
lin=sublin(result,3) 
tx1=subwrd(lin,4)
tx2=subwrd(lin,6)-0.01
lin=sublin(result,4) 
ty1=subwrd(lin,4)+0.02
ty2=subwrd(lin,6)

* Define size of box to contain text
'q string "'text'"'
twid=subwrd(result,4)*1.05
siz=strlen(text)
perchar=twid/siz
thei=2.5*perchar
twid=twid+0.2

* Define vertex coordinates
if (pos='bl')
  x1=tx1; x2=x1+twid
  y1=ty1; y2=y1+thei
endif
if (pos='br')
  x2=tx2; x1=x2-twid
  y1=ty1; y2=y1+thei
endif
if (pos='tl')
  x1=tx1; x2=x1+twid
  y2=ty2; y1=y2-thei
endif
if (pos='tr')
  x2=tx2; x1=x2-twid
  y2=ty2; y1=y2-thei
endif
if (lon!='' | lat!='')
  'q w2xy 'lon' 'lat
  xc=subwrd(result,3)
  yc=subwrd(result,6)

  x1=xc-twid/2
  x2=xc+twid/2
  y1=yc-thei/2
  y2=yc+thei/2
endif

* Draw
if (fcol>=0) then
  'set line 'fcol
  'draw recf 'x1' 'y1' 'x2' 'y2
endif

'set line 'bcol
'draw rec 'x1' 'y1' 'x2' 'y2
'set string 'tcol' c'
cx=(x1+x2)*0.5
cy=(y1+y2)*0.5
'draw string 'cx' 'cy' 'text

return
