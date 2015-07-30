function enstdv(args)
nens=subwrd(args,1)
say 'numero de membros='nens
start=subwrd(args,2)
say 'id do primeiro arquivo='start
var=subwrd(args,3)
say 'nome da variavel='var
media=subwrd(args,4)
say 'variavel com a media='media
outvar=subwrd(args,5)
say 'variavel de saida='outvar

'define mesmed=('media')'
i=start
nens=nens+start-1
std=0
while (i<=nens)
std='pow('var'.'i'-'media',2)+'std
i=i+1
endwhile
nens=nens-start
say 'Defining standard deviation among members of ensemble...'
'define 'outvar'=sqrt((('std')/'nens'))'
return
