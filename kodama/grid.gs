**************************************************************
* grid Ver 0.02
*
* function:
*   display grid
*
* usage:
*   grid [xstep [ystep [numflag]]]
*
*     xstep   : grid step for x (default=1.0)
*     ystep   : grid step for y (default=1.0)
*     numflag : numbering switch (0:no Number 1:draw Number)
*               (default=11)
*
*   note:[arg-name] : no need to type
**************************************************************
function grid (args)


*** arguements ***
xstep = subwrd(args,1)
ystep = subwrd(args,2)
numflag = subwrd(args,3)


*** default value ***
if( xstep = "" | xstep = -9999)
  xstep = 1.0
endif
if(ystep = "" | ystep = -9999)
  ystep = 1.0
endif
if(numflag = "" | numflag = -9999)
  numflag = 1
endif


*** checking value ***
if( xstep <= 0 | ystep <= 0 )
  say "error! ---step value is negative---"
  return
endif
if( numflag != 0 & numflag != 1 )
  say "warning! ---invalid num flag -> set to 1---"
  numflag = 1
endif


*** draw line (x) ***
i = xstep + 0
while( i < 11.0 )
  if( numflag = 1 )
    'set strsiz 'xstep/3' 'xstep/3
    'set string 1 bc'
    'draw string 'i' 0.05 'i
    'draw line 'i' 'xstep/3+0.1' 'i' 8.5'

  else
    'draw line 'i' 0 'i' 8.5'

  endif

  i = i + xstep
endwhile


*** draw line (y) ***
i = ystep + 0
while( i < 8.5 )
  if( numflag = 1 )
    'set strsiz 'ystep/3' 'ystep/3
    'set string 1 l'
    'draw string 0.05 'i' 'i
    'draw line '0.1+ystep/3*math_strlen(i)' 'i' 11 'i

  else
    'draw line 0 'i' 11 'i

  endif

  i = i + ystep
endwhile

return
