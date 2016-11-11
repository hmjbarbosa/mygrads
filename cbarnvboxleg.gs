* HMJBarbosa Julho 2004
* Equivalente ao script cbarn2.gs, mas foi feito pela Diane Stokes
* e consegue fazer 1 barra em baixo dos paneis de maneira bem
* mais simples. Uso este script e nao o cbarn2.gs
* HMJBarbosa Julho 2004
* fiz uma modificacao para nao desenhar o canto das setas e para
* os numeros ficarem centrados nas cores

*  Script to plot a colorbar
*
*  The script will assume a colorbar is wanted even if there is
*  not room -- it will plot on the side or the bottom if there is
*  room in either place, otherwise it will plot along the bottom and
*  overlay labels there if any.  This can be dealt with via
*  the 'set parea' command.  In version 2 the default parea will
*  be changed, but we want to guarantee upward compatibility in
*  sub-releases.
*
*
*       modifications by mike fiorino 940614
*       rvp added by diane stokes 20040729
*
*       - the extreme colors are plotted as triangles
*       - the colors are boxed in white
*       - input arguments in during a run execution:
*
*       run cbarn sf vert xmid ymid rvp
*
*       sf   - scale the whole bar 1.0 = original 0.5 half the size, etc.
*       vert - 0 FORCES a horizontal bar = 1 a vertical bar
*       xmid - the x position on the virtual page the center the bar
*       ymid - the x position on the virtual page the center the bar
*       rvp  - 1 resets virtual page (one colorbar for several plots)
*
*       if vert,xmid,ymid are not specified, they are selected
*       as in the original algorithm
*

*function itemleg (sf,vert,xmid,ymid,rvp,l1='',l2,l3,l4,l5,l6,l7,l8,l9,l10)
function itemleg (args)

sf=subwrd(args,1)
vert=subwrd(args,2)
xmid=subwrd(args,3)
ymid=subwrd(args,4)
rvp=subwrd(args,5)

*leg=subwrd(args,6)
say l1
if (l1='')
  say 'vazio'
else
  say 'xxx'
endif
leg.1=l1
leg.2=l2
leg.3=l3
leg.4=l4
leg.5=l5
leg.6=l6
leg.7=l7
leg.8=l8
leg.9=l9
leg.10=l10

if(sf='');sf=1.0;endif

*
*  Check shading information
*
  'query shades'
  shdinfo = result
  if (subwrd(shdinfo,1)='None')
    say 'Cannot plot color bar: No shading information'
    return
  endif

*
* Check if reset of virtual page is desired
*
    if(rvp = 1) ; 'set vpage off' ; endif

*
*  Get plot size info
*
  'query gxinfo'
  rec2 = sublin(result,2)
  rec3 = sublin(result,3)
  rec4 = sublin(result,4)
  xsiz = subwrd(rec2,4)
  ysiz = subwrd(rec2,6)
  ylo = subwrd(rec4,4)
  xhi = subwrd(rec3,6)
  xd = xsiz - xhi

  ylolim=0.6*sf
  xdlim1=1.0*sf
  xdlim2=1.5*sf
  barsf=0.8*sf
  yoffset=0.2*sf
  stroff=0.05*sf
  strxsiz=0.12*sf
  strysiz=0.13*sf
*
*  Decide if horizontal or vertical color bar
*  and set up constants.
*
  if (ylo<ylolim & xd<xdlim1)
    say "Not enough room in plot for a colorbar"
    return
  endif
  cnum = subwrd(shdinfo,5)
* hmjbarbosa
  cnum=cnum-1

*
* hmjbarbosa: skip intervals colored in white
*
  ccnum = 0
  num = 0
  while (num<cnum)
    rec = sublin(shdinfo,num+2)
    col = subwrd(rec,1)

    if (col != 0)
      ccnum = ccnum + 1
    endif

    num=num+1
  endwhile

*
*       logic for setting the bar orientation with user overides
*
  if (ylo<ylolim | xd>xdlim1)
    vchk = 1
    if(vert = 0) ; vchk = 0 ; endif
  else
    vchk = 0
    if(vert = 1) ; vchk = 1 ; endif
  endif
*
*       vertical bar
*
  if (vchk = 1 )
    if(xmid = '') ; xmid = xhi+xd/2 ; endif
    xwid = 0.2*sf
    ywid = 0.5*sf

    xl = xmid-xwid/2
    xr = xl + xwid
    if (ywid*ccnum > ysiz*barsf)
      ywid = ysiz*barsf/ccnum
    endif
    if(ymid = '') ; ymid = ysiz/2 ; endif
    yb = ymid - ywid*ccnum/2
    'set string 1 l 5'
    vert = 1

  else
*
*       horizontal bar
*
    ywid = 0.4
    xwid = 0.8

    if(ymid = '') ; ymid = ylo/2-ywid/2 ; endif
    yt = ymid + yoffset
    yb = ymid
    if(xmid = '') ; xmid = xsiz/2 ; endif
    if (xwid*ccnum > xsiz*barsf)
      xwid = xsiz*barsf/ccnum
    endif
    xl = xmid - xwid*ccnum/2
    'set string 1 tc 5'
    vert = 0
  endif

*
*  Plot colorbar
*
  'set strsiz 'strxsiz' 'strysiz
  num = 0
  nowhite=0
  while (num<cnum)
    rec = sublin(shdinfo,num+2)
    col = subwrd(rec,1)
    hi = subwrd(rec,3)

* hmjbarbosa: skip white colors
    if (col = 0)
      num=num+1
      continue
    endif
    nowhite=nowhite+1
* now custom legend
    myleg = leg.nowhite
*subwrd(leg,nowhite)
    if (myleg!='')
      hi=myleg
    endif

    if (vert)
      yt = yb + ywid
    else
      xr = xl + xwid
    endif

*   Draw the boxes
    'set line 'col
    'draw recf 'xl' 'yb' 'xr' 'yt
    'set line 1 1 5'
    'draw rec  'xl' 'yb' 'xr' 'yt

*   Put numbers under each segment of the color key
    if (num < cnum)
      if (vert)
        xp=xr+stroff
        'draw string 'xp' '%(yt-ywid*0.5)%' 'hi
      else
        yp=yb-stroff
       'draw string '%(xr-xwid*0.5)%' 'yp' 'hi
      endif
    endif

*   Reset variables for next loop execution
    if (vert)
      yb = yt
    else
      xl = xr
    endif
    num = num + 1

  endwhile

return

