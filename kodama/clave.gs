*
* help is in the end of this script
*
function clave(args)
  _version='0.01r3'

  if( args = '' )
    help()
    return
  endif

  varin = subwrd(args, 1)
  time1 = subwrd(args, 2)
  time2 = subwrd(args, 3)
  y1    = subwrd(args, 4)
  y2    = subwrd(args, 5)
  varout= subwrd(args, 6)

  if( varin = '' | time1 = '' | time2 = '' | y1 = '' | y2 = '' | y1 > y2 )
    say 'Error: arguements are inscorrect!'
    say 'try "clave" for help'
    return
  endif

***** Calculate *****
  y=y1
  while( y <= y2 )

    timey1 = gettime(time1, y)
    timey2 = gettime(time2, y)

    say 'ave( 'varin', time='timey1', time='timey2 ')'

    if( y = y1 )
      'clave = ave( 'varin', time='timey1', time='timey2' )'
    else
      'clave = clave + ave( 'varin', time='timey1', time='timey2' )'    
    endif

    y = y + 1
  endwhile

  ynum = y2 - y1 + 1
  'clave = clave / 'ynum


***** Output *****
  if( varout = '' )
    'd clave'
  else
    varout'=clave'
  endif

  'undefine clave'
return



*
* get time for grads
*
* e.g. %y, %ypp -> 1980, 1981
*
function gettime( str, y )
  time = ''
  len = math_strlen( str )
  pos = 1
  while( pos <= len )
    c = substr( str, pos, 1 )

    if( c = '%' )
      c1 = substr(str, pos+1, 1)
      c2 = substr(str, pos+2, 1)
      c3 = substr(str, pos+3, 1)

      while(1)

        if( c1 = 'y' & c2 = 'p' & c3 = 'p' )
          ypp = y + 1
          time = time % ypp
          pos = pos + 3
          break
        endif

        if( c1 = 'y' )
          time = time % y
          pos = pos + 1
          break
        endif

        time = time % '%'
      endwhile

    else      
      time = time % c

    endif

    pos = pos + 1
  endwhile

return ( time )


*
* help
*
function help()
  say ' Name:'
  say '   clave '_version' - make climatological mean '
  say ' '
  say ' Usage:'
  say '   clave var_in time1 time2 y1 y2 [var_out]'
  say ' '
  say '     var_in      : variable'
  say '     time1 time2 : (seasonal) time range'
  say '                   %y and %ypp shoulb be included. '
  say '                   They will be replaced by a particular year '
  say '                                            and the next year'
  say '                   e.g.  time1    time2'
  say '                         01jan%y  01feb%y  : January-mean (including 00z01feb)'
  say '                         01jun%y  01sep%y  : JJA-mean (including 00z01sep)'
  say '                         01dec%y  01mar%ypp: DJF-mean (including 00z01mar)'
  say '     y1 y2       : year range (y1 <= y2)'
  say '     var_out     : variable in which climatological mean will be stored.'
  say ''
  say ' Note:'
  say '   if var_out is not specified, climatological mean will be drawn.'
  say ''
return


