function dd(args)

par.1=subwrd(args,1)
par.2=subwrd(args,2)

if (par.2='')
   say 'Clear screen, display var at specific leves and add cbarn.'
   say 'Usage: dd var clevs'
   return
endif

n=2
while (par.n!='')
  n=n+1
  par.n=subwrd(args,n)
endwhile
npar=n

n=2
clevs=''
while(n<=npar)
  clevs=clevs' 'par.n
  n=n+1
endwhile

'clear'
'set clevs 'clevs
'd 'par.1
'q shades'; lin=sublin(result,1)
if (lin!='None')
   'cbarn'
endif

return