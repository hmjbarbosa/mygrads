function monta(args)
nens=subwrd(args,1)
say 'numero de membros='nens
start=subwrd(args,2)
say 'id do primeiro arquivo='start
var=subwrd(args,3)
say 'nome da variavel='var
outvar=subwrd(args,4)
say 'variavel de saida='outvar
i = start
nens = nens+start-1
a = '('
while (i <= nens)
 if (i < nens)
   a = a%var'.'i'+'
 else
   a = a%var'.'i')/'i
 endif
 i = i + 1
endwhile
say a
'define 'outvar'='a
say 'The ensemble average has been defined with the name='outvar
'q define'
say result
return

