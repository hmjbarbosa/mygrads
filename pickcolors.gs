function pickcolors(args)

* output instructions
say 'pickcolors v0.13.10.20 by hbarbosa'
say ' '
say 'Draws a palette on the screen to allow the user to create a palette'
say 'by looking how colors looks like. '
say ' '
say 'Color Map: '
say '   Click to select which pair of colors will be varied.'
say 'Fixed color: '
say '   The large box shows the value of the color not varying. Click on'
say '   the smaller boxes (-10, -1, +1, +10) to change its value. '
say 'Picked RGB: '
say '   When you click on the palette, that color will show up here.'
say 'Palette: '
say '   After picking a color, you must click on one of these numbers to'
say '   save that color in this position of your palette. Once satisfied,'
say '   click on [palette]->save to write the result as text. '

* config
nx=40; dx=8.5/nx
ny=40; dy=8.5/ny
base='Red/Green'
xop='r'
yop='g'
zop='b'
fixc=0
quit=0
rpick=-1
gpick=-1
bpick=-1

* init palette
np=14
i=1
while(i<=np)
  rpal.i=-1
  gpal.i=-1
  bpal.i=-1
  i=i+1
endwhile

* wait for user input
'clear'
while(!quit)
  'set string 1 l'
  'set strsiz 0.16'

  'set button 1 0 1 1   1 0 1 1   1'

* Color map / quit
  'draw string      8.6 8.2 Color Map:'
  'draw dropmenu 1  9.3 7.8 1.5 0.4 'base' | Red/Green | Green/Blue | Blue/Red '
  'draw button   3 10.6 7.8 0.7 0.4 Quit '

* Fixed Color
  'draw string 8.6 7.2 Fixed Color:'
  'draw button 13  8.75 6.7 0.4 0.3 -10'
  'draw button 14  9.25 6.7 0.4 0.3 -1'
  'draw button 15  9.75 6.7 0.5 0.5 'fixc
  'draw button 16 10.25 6.7 0.4 0.3 +1'
  'draw button 17 10.75 6.7 0.4 0.3 +10'

* Picked RGB
  'draw string 8.6 6.1 Picked RGB:'
  if (rpick>=0)
    sum=rpick+gpick+bpick
    if (sum<400) ; tx=0; else ; tx=1; endif
    'set rgb 99 'rpick'  'gpick'  'bpick
    'set button 'tx' 99 1 1   'tx' 99 1 1   1'
    'draw button 10 9.8 5.75 1.5 0.35 'rpick' 'gpick' 'bpick
  endif

* Palette
  'draw dropmenu 2 9.3 5.3 1.5 0.4 Palette | Save | Reset '
  i=1
  while(i<=np)
    y=5.2-i*0.35
    but=100+i
    'set button 1 0 1 1   1 0 1 1   1'
    'draw button 'but' 8.8 'y' 0.35 0.35 'i
    i=i+1
  endwhile

  i=1
  while(i<=np)
    if (rpal.i>=0 & gpal.i>=0 & bpal.i>=0)
      y=5.2-i*0.35
* kill button
      but=150+i
      'set button 1 0 1 1   1 0 1 1   1'
      'draw button 'but' 10.8 'y' 0.35 0.35 X'
* colored button
      but=200+i
      cols=rpal.i'  'gpal.i'  'bpal.i
      sum=rpal.i+gpal.i+bpal.i
      if (sum<400) ; tx=0; else ; tx=1; endif
      'set rgb 99 'cols
      'set button 'tx' 99 1 1   'tx' 99 1 1   1'
      'draw button 'but' 9.8 'y' 1.5 0.35 'cols
    endif
    i=i+1
  endwhile

* draw pallete
  i=1
  while(i<=nx)
    j=1 
    while(j<=ny)
      
      x1=(i-1)*dx
      x2=i*dx
      y1=(j-1)*dy
      y2=j*dy
      
      if (xop='r'); rr=math_nint((i-1)*255/(nx-1)); endif
      if (xop='g'); gg=math_nint((i-1)*255/(nx-1)); endif
      if (xop='b'); bb=math_nint((i-1)*255/(nx-1)); endif
      if (yop='r'); rr=math_nint((j-1)*255/(ny-1)); endif
      if (yop='g'); gg=math_nint((j-1)*255/(ny-1)); endif
      if (yop='b'); bb=math_nint((j-1)*255/(ny-1)); endif
      if (zop='r'); rr=fixc; endif
      if (zop='g'); gg=fixc; endif
      if (zop='b'); bb=fixc; endif
      'set rgb 99 'rr' 'gg' 'bb
      'set line 99'
      'draw recf 'x1' 'y1' 'x2' 'y2
* draw grid
*      'set line 1'
*      'draw rec 'x1' 'y1' 'x2' 'y2
      
      j=j+1
    endwhile
    i=i+1
  endwhile
  
* QUERY FOR MENU CHANGE *****************************************************
*
* Menu definition:
*  1:       color map drop menu
*         1 - red/green
*         2 - green/blue
*         3 - blue/red
*  2:       palette drop menu
*         1 - save
*         2 - reset
*  3:       quit button
*  10:      picked rgb color
*  13-17:   fixed color buttons
*  100-149: palette save color
*  150-199: palette kill color
*  200-249: palette color

  'q pos'
  xpos = subwrd(result,3)
  ypos = subwrd(result,4)
  menunum  = subwrd(result,7)
  menuitem = subwrd(result,8)

* Change color map
  if (menunum = 1)
    if menuitem = 1 ; base = 'Red/Green'  ; xop='r'; yop='g'; zop='b'; endif
    if menuitem = 2 ; base = 'Green/Blue' ; xop='g'; yop='b'; zop='r'; endif
    if menuitem = 3 ; base = 'Blue/Red'   ; xop='b'; yop='r'; zop='g'; endif
  endif
* Option to quit
  if (menunum = 3)
    quit=1
  endif
* Change fixed color value
  if (menunum = 13); fixc=fixc-10; endif
  if (menunum = 14); fixc=fixc-1;  endif
  if (menunum = 16); fixc=fixc+1;  endif
  if (menunum = 17); fixc=fixc+10; endif
  if (fixc<0); fixc=0; endif
  if (fixc>255); fixc=255; endif

  'clear'
* Pick color if clicked on a color box
  if (xpos<=8.5)
    im=math_int(xpos/dx); icol=math_nint(im*255/(nx-1))
    jm=math_int(ypos/dy); jcol=math_nint(jm*255/(ny-1))

    if (base='Red/Green');  rr=icol; gg=jcol; bb=fixc; endif
    if (base='Green/Blue'); rr=fixc; gg=icol; bb=jcol; endif
    if (base='Blue/Red');   rr=jcol; gg=fixc; bb=icol; endif

*    'set line 0'
*    'draw recf 8.6 4.2 11.5 4.6'
*    'draw string 8.6 6.1 Picked RGB:'
*    'draw string 9.0 5.6 'rr' 'gg' 'bb
* save picked color
    rpick=rr
    gpick=gg
    bpick=bb
  endif

* If click on palette dropmenu
  if (menunum=2)
* save palette
    if (menuitem = 1)
      n=1; i=1
      while(i<=np)
        p=20+n
        if (rpal.i>0)
          say 'set rgb 'p' 'rpal.i' 'gpal.i' 'bpal.i
          n=n+1
        endif
        i=i+1
      endwhile
    endif
* reset palette
    if (menuitem = 2)
      i=1
      while(i<=np)
        rpal.i=-1; gpal.i=-1; bpal.i=-1
        i=i+1
      endwhile
    endif
  endif

* If click on palette save color, save picked color into palette
  if (menunum>100 & menunum<150)
    but=menunum-100
    rpal.but=rpick
    gpal.but=gpick
    bpal.but=bpick
  endif
* If click on kill color, remove from palette
  if (menunum>150 & menunum<200)
    but=menunum-150
    rpal.but=-1
    gpal.but=-1
    bpal.but=-1
  endif
* If click on palette color, restore picked color
  if (menunum>200 & menunum<250)
    but=menunum-200
    rpick=rpal.but
    gpick=gpal.but
    bpick=bpal.but
  endif

endwhile

return
*