* This script calculates the monthly means from a daily output

function day2month(args)

reinit
say ''
say '--- day2month.gs v1.0 ---'
say ''

* get arguments
ctl=subwrd(args,1)
base=subwrd(args,2)
start=subwrd(args,3)
end=subwrd(args,4)
if (ctl='' | bin='')
  say 'Usage: day2month.gs <input ctl> <output base name> <start time> <final time>'
  say ''
  say ' input ctl: A template ctl pointing to various daily output files'
  say ' out basename: A full path to the output files. Each month will'
  say '    be output to basename_YYYYMM.bin. Notice that it may cotains'
  say '    directories'
  say ' start time: A starting month in the format YYYYMM. Only months'
  say '    equal to or after this date will be written.'
  say ' end time: A starting month in the format YYYYMM. Only months'
  say '    equal to or before this date will be written.'
  exit
endif
if (start='')
  start=0
endif
if (end='')
  end=999999
endif
'open 'ctl
say 'input ctl='ctl

* grab levs, ndays and nvars
'q file'
lin=sublin(result,5)
nx=subwrd(lin,3)
ny=subwrd(lin,6)
nz=subwrd(lin,9)
nt=subwrd(lin,12)
lin=sublin(result,6)
nv=subwrd(lin,5)

say 'vert levs='nz
say 'num days ='nt
say 'num varbl='nv

* convert daily time scale to monthly
t=0
pmon=0
ptime=''
nm=0
while (t<nt)
  t=t+1
  'set t 't
  'q dims'
  lin=sublin(result,5)
  ctime=subwrd(lin,6)
  cmon=substr(ctime,6,3)

* check if still inside the same month
  if (cmon!=pmon)
    pmon=cmon
    ftime.nm=ptime
    nm=nm+1
    itime.nm=ctime
    ntime.nm=1
  else
    ntime.nm=ntime.nm+1
  endif

  ptime=ctime
endwhile
ftime.nm=ctime
say 'num months='nm
if (start>0)
  say 'Will output only those >= 'start
endif
if (end!=999999)
  say 'Will output only those <= 'end
endif

* write ctl
*fname=base'.ctl'
*rc=write(fname,'dset ^'base'.bin')

* create list of variables
'q ctlinfo'
total=0
n=0
pp=''
while (pp!='vars' & pp!='VARS')
  n=n+1
  lin=sublin(result,n)
  pp=subwrd(lin,1)
endwhile
v=1
while (v<=nv)
  n=n+1
  lin=sublin(result,n)
  var.v=subwrd(lin,1)
  lev.v=subwrd(lin,2)
  if (lev.v=0)
    lev.v=1
  endif
  total=total+lev.v
  v=v+1
endwhile
size=4*nx*ny*total
say nv' variables totalizing 'total' levels'
say 'output file should be: 'size' bytes'

* calcula as medias e escreve a saida
'set t 1'
'set x 1 'nx
'set y 1 'ny
m=1
while(m<=nm)

  n=strlen(itime.m)
  mes=substr(itime.m,n-6,3)
  if (mes='JAN'); mes='01'; endif
  if (mes='FEB'); mes='02'; endif
  if (mes='MAR'); mes='03'; endif
  if (mes='APR'); mes='04'; endif
  if (mes='MAY'); mes='05'; endif
  if (mes='JUN'); mes='06'; endif
  if (mes='JUL'); mes='07'; endif
  if (mes='AUG'); mes='08'; endif
  if (mes='SEP'); mes='09'; endif
  if (mes='OCT'); mes='10'; endif
  if (mes='NOV'); mes='11'; endif
  if (mes='DEC'); mes='12'; endif
  ano=substr(itime.m,n-3,4)
  fname=base'_'ano''mes'.bin'


* check month
  num=ano''mes
  if (num>=start & num<=end)
    'set gxout fwrite'
    'set fwrite -le -st -cl 'fname
    
    say 'Averaging: 'itime.m' 'ftime.m' 'ntime.m' -> 'fname
    
    v=1
    while(v<=nv)
      'set z 1 'lev.v
      'mean=ave('var.v',time='itime.m',time='ftime.m')'
      z=1
      while(z<=lev.v)
        'set z 'z
        'd mean'
        z=z+1
      endwhile
      v=v+1
    endwhile
    
    'disable fwrite'
    'set gxout contour'

  endif

  m=m+1
endwhile

* end
