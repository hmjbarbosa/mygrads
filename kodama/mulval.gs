**************************************************************
* mulval Ver 0.01
*
* function:
*   draw min/max values using multi-window
* usage:
*   mulval imax jmax ipos jpos var 
*          [-xoffset value/0] [-yoffset value/0]
*     imax    : number of window horizontally ( 1<= imax <= 5 )
*     jmax    : number of window vertically ( 1<= jmax <= 5 )
*     ipos    : horizontal position (count from left window)
*     jpos    : vertical position (count from bottom window)
*     var     : variables
*     xoffset : offset of horizontal position
*     yoffset : offset of vertical position
* note:
*  [arg-name / **] : no need to type (** is default value)
*
*
* history
* 2006.11.05  Ver0.01 release
*
*
**************************************************************
function mulval(args)

*** arguement ***
imax=subwrd(args,1)
jmax=subwrd(args,2)
ipos=subwrd(args,3)
jpos=subwrd(args,4)
var=subwrd(args,5)

xoffset=0
yoffset=0

i=6
arg="dummy"
while(arg!="")
  arg=subwrd(args,i)
  i=i+1

  if(arg="-xoffset")
    xoffset=subwrd(args,i)
    i=i+1
  endif

  if(arg="-yoffset")
    yoffset=subwrd(args,i)
    i=i+1
  endif

endwhile


***** set value *****

***** imax *****
*** 1 ***
xini.1 = 1.0
xwid.1 = 9.5
xint.1 = 0.0

*** 2 ***
xini.2 = 1.0
xwid.2 = 4.5
xint.2 = 0.5

*** 3 ***
xini.3 = 1.0
xwid.3 = 3.0
xint.3 = 0.4

*** 4 ***
xini.4 = 0.4
xwid.4 = 2.3
xint.4 = 0.4

*** 5 ***
xini.5 = 0.9
xwid.5 = 1.9
xint.5 = 0.1


***** jmax *****
*** 1 ***
yini.1 = 1.0
ywid.1 = 7.0
yint.1 = 0.0

*** 2 ***
yini.2 = 1.0
ywid.2 = 3.0
yint.2 = 1.0

*** 3 ***
yini.3 = 0.8
ywid.3 = 2.0
yint.3 = 0.5

*** 4 ***
yini.4 = 0.6
ywid.4 = 1.5
yint.4 = 0.4

*** 5 ***
yini.5 = 0.6
ywid.5 = 1.4
yint.5 = 0.1


***** set parea *****
xmin = xini.imax + (xwid.imax + xint.imax) * (ipos-1) + xoffset
xmax = xini.imax + (xwid.imax + xint.imax) * (ipos-1) + xwid.imax + xoffset
ymin = yini.jmax + (ywid.jmax + yint.jmax) * (jpos-1) + yoffset
ymax = yini.jmax + (ywid.jmax + yint.jmax) * (jpos-1) + ywid.jmax + yoffset

'set string 1 br 4 0'
'set strsiz 0.08 0.1'
'draw string 'xmax' 'ymax+0.30' max='max2d(var)
'draw string 'xmax' 'ymax+0.12' min='min2d(var)

return




function max2d(var)
  com=var
  'q dims'

* lon
  temp=sublin(result,2)
  if(subwrd(temp,3)='varying')
    min=subwrd(temp,6)
    max=subwrd(temp,8)
    com='max('%com',lon='min',lon='max')'
  endif

* lat
  temp=sublin(result,3)
  if(subwrd(temp,3)='varying')
    min=subwrd(temp,6)
    max=subwrd(temp,8)
    com='max('%com',lat='min',lat='max')'
  endif

* lev
  temp=sublin(result,4)
  if(subwrd(temp,3)='varying')
    min=subwrd(temp,6)
    max=subwrd(temp,8)
    com='max('%com',lev='min',lev='max')'
  endif

  say com
  'd 'com

  i=1
  while(1)
    res = sublin(result,i)
    if(res=''); break; endif
    if(subwrd(res,1)='Result'); max=subwrd(res,4); break; endif
    i=i+1
  endwhile

return max



function min2d(var)
  com=var
  'q dims'

* lon
  temp=sublin(result,2)
  if(subwrd(temp,3)='varying')
    min=subwrd(temp,6)
    max=subwrd(temp,8)
    com='min('%com',lon='min',lon='max')'
  endif

* lat
  temp=sublin(result,3)
  if(subwrd(temp,3)='varying')
    min=subwrd(temp,6)
    max=subwrd(temp,8)
    com='min('%com',lat='min',lat='max')'
  endif

* lev
  temp=sublin(result,4)
  if(subwrd(temp,3)='varying')
    min=subwrd(temp,6)
    max=subwrd(temp,8)
    com='min('%com',lev='min',lev='max')'
  endif

  say com
  'd 'com

  i=1
  while(1)
    res = sublin(result,i)
    if(res=''); break; endif
    if(subwrd(res,1)='Result'); max=subwrd(res,4); break; endif
    i=i+1
  endwhile

return max
