
* vai para o primeiro arquivo
nf=1
'set dfile 'nf
ok=subwrd(result,3)

* para cada arquivo
while(ok!="error:")

* dimensoes
  'q file'
  lin=sublin(result,2); nome=subwrd(lin,2)
  lin=sublin(result,5)

* max/min
  nx=subwrd(lin,3); 'set x 1 'nx
  ny=subwrd(lin,6); 'set y 1 'ny
  nz=subwrd(lin,9); 'set z 1 'nz
  nt=subwrd(lin,12); 'set t 1 'nt

  'set t 1'; 'vt=max(tos,t=1,t='nt')'
  'set x 1'; 'vx=max(vt,x=1,x='nx')'
  'set y 1'; 'vy=max(vx,y=1,y='ny')'
  'set z 1'; 'vz=max(vy,z=1,z='nz')'
  'd vz'; maximo=subwrd(result,4)

* min
  nx=subwrd(lin,3); 'set x 1 'nx
  ny=subwrd(lin,6); 'set y 1 'ny
  nz=subwrd(lin,9); 'set z 1 'nz
  nt=subwrd(lin,12); 'set t 1 'nt

  'set t 1'; 'vt=min(tos,t=1,t='nt')'
  'set x 1'; 'vx=min(vt,x=1,x='nx')'
  'set y 1'; 'vy=min(vx,y=1,y='ny')'
  'set z 1'; 'vz=min(vy,z=1,z='nz')'
  'd vz'; minimo=subwrd(result,4)

  say 'nx='nx' ny='ny' nz='nz' nt='nt' max='maximo' min='minimo'  nome='nome

* proximo
  nf=nf+1
  'set dfile 'nf
  ok=subwrd(result,3)

endwhile

*fim




