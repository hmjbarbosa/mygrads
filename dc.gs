function dc(args)
if (args='')
   say 'Clear screen, display var with limits and add cbarn.'
   say 'Usage: dc var [cint [cmin [cmax]]]'
   return
endif

arg1=subwrd(args,1)
arg2=subwrd(args,2)
arg3=subwrd(args,3)
arg4=subwrd(args,4)

if (arg4!='')
  'set cmax 'arg4
endif

if (arg3!='')
  'set cmin 'arg3
endif

if (arg2!='')
  'set cint 'arg2
endif

'clear'
'd 'arg1''
'q shades'; lin=sublin(result,1)
if (lin!='None')
   'cbarn'
endif

return