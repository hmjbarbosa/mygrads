function handpoly

say 'Left button add point, right button finishes.'

'q pos'
res=result
res1=res
bt=subwrd(res,5)
n=0
while (bt!=3)
  n=n+1
  'q xy2w 'subwrd(res,3)' 'subwrd(res,4)
  say 'pt 'n' 'sublin(result,1)

  'draw mark 3 'subwrd(res,3)' 'subwrd(res,4)' 0.08'

  if (n>1) then
    'draw line 'subwrd(res,3)' 'subwrd(res,4)' 'subwrd(res0,3)' 'subwrd(res0,4)
  endif

  res0=res
  'q pos'
  res=result
  bt=subwrd(res,5)
endwhile
'draw line 'subwrd(res1,3)' 'subwrd(res1,4)' 'subwrd(res0,3)' 'subwrd(res0,4)
*