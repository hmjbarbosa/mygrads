function colors(args)

* Get arguments
if (args='') 
  say 'Changes the default rainbow color sequence interpolating between two RGB colors.'
  say 'Usage: colors ncor r0 g0 b0  r1 g1 b1 [first color id]'
  return 
endif

* number of colors, including first and last
ncor=subwrd(args,1)

R0=subwrd(args,2)
G0=subwrd(args,3)
B0=subwrd(args,4)

R1=subwrd(args,5)
G1=subwrd(args,6)
B1=subwrd(args,7)

id=subwrd(args,8)
if (id='')
  id=20
endif 

* passos
dR=(R1-R0)/(ncor-1)
dG=(G1-G0)/(ncor-1)
dB=(B1-B0)/(ncor-1)

count=0
_paleta=" "

while (count<ncor)
  R=math_nint(R0+count*dR)
  G=math_nint(G0+count*dG)
  B=math_nint(B0+count*dB)

  comm=" "id" "R" "G" "B
  say comm
  'set rgb 'comm
  _paleta=_paleta" "id

  count=count+1
  id=id+1
endwhile

* muda a paleta de cores
'set rbcols '_paleta 


