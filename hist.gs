***************************************************************************************
*	$Id: hist.gs,v 1.16 2013/03/22 22:41:24 bguan Exp $
*	Copyright (C) 2008-2013 Bin Guan.
*	Distributed under GNU/GPL.
***************************************************************************************
function hist(arg)
*
* Histogram.
*
rc=gsfallow('on')

dimension=subwrd(arg,1)
input=subwrd(arg,2)
output=subwrd(arg,3)
edge_s=subwrd(arg,4)
edge_e=subwrd(arg,5)
bin_size=subwrd(arg,6)
if(bin_size='')
usage()
return
endif

*
* Ensure x-coordinates are integers and there are no redundant grid points.
*
qdims()
_xs_old=_xs
_xe_old=_xe
if(math_int(_xs)!=_xs | math_int(_xe)!=_xe)
xs_new=math_nint(_xs)
xe_new=math_nint(_xe)
'set x 'xs_new' 'xe_new
qdims()
endif
if(_lone-_lons>=360)
rddnt_points=(_lone-_lons-360)/_dlon+1
'set x '_xs' '_xe-rddnt_points
qdims()
endif

*
* Ensure y-coordinates are integers.
*
qdims()
_ys_old=_ys
_ye_old=_ye
if(math_int(_ys)!=_ys | math_int(_ye)!=_ye)
ys_new=math_nint(_ys)
ye_new=math_nint(_ye)
'set y 'ys_new' 'ye_new
qdims()
endif

'hsttmp=maskout('input','edge_e'-('input'))'

prompt '[hist info] Temporary directory is set to '
'printenv /tmp/bGASL-$USER'
mytmpdir=sublin(result,1)
'!mkdir -p 'mytmpdir

prompt '[hist info] Process ID is '
'printenv $$'
randnum=sublin(result,1)

'set gxout fwrite'
'set fwrite 'mytmpdir'/hist.dat.'randnum

'hstII=hsttmp/hsttmp'
*
* First to next-to-last bin
*
left=edge_s
right=left+bin_size;if(right>edge_e);right=edge_e;endif
nz=1
zdef=left
while(left<edge_e)
if(dimension='t')
'set t '_ts' '_te
endif
if(dimension='xy')
'set x '_xs' '_xe
'set y '_ys' '_ye
endif
'hstIIa=const(maskout(hstII,hsttmp-'left'),0,-u)'
'hstIIb=const(maskout(hstII,'right'-hsttmp),0,-u)'
'hstIIc=const(maskout(hstII,hsttmp-'right'),0,-u)'
'hstIIz=hstIIa*hstIIb*(1-hstIIb*hstIIc)'
if(dimension='t')
'set t '_ts
'hstouttmp=sum(hstIIz,t='_ts',t='_te')'
endif
if(dimension='xy')
'set x '_xs
'set y '_ys
'hstouttmp=sum(sum(hstIIz,x='_xs',x='_xe'),y='_ys',y='_ye')'
endif
'display const(hstouttmp,'dfile_undef()',-u)'
left=left+bin_size;if(left>edge_e);left=edge_e;endif
right=right+bin_size;if(right>edge_e);right=edge_e;endif
nz=nz+1
zdef=zdef' 'left
endwhile
zdef='ZDEF 'nz' LEVELS 'zdef
*
* Last bin (i.e., when input equals to right edge)
*
left=edge_e
right=edge_e
if(dimension='t')
'set t '_ts' '_te
endif
if(dimension='xy')
'set x '_xs' '_xe
'set y '_ys' '_ye
endif
'hstIIa=const(maskout(hstII,hsttmp-'left'),0,-u)'
'hstIIb=const(maskout(hstII,'right'-hsttmp),0,-u)'
'hstIIz=hstIIa*hstIIb'
if(dimension='t')
'set t '_ts
'hstouttmp=sum(hstIIz,t='_ts',t='_te')'
endif
if(dimension='xy')
'set x '_xs
'set y '_ys
'hstouttmp=sum(sum(hstIIz,x='_xs',x='_xe'),y='_ys',y='_ye')'
endif
'display const(hstouttmp,'dfile_undef()',-u)'

if(dimension='t')
writectl4t(mytmpdir,nz,zdef,output,randnum)
endif
if(dimension='xy')
writectl4xy(mytmpdir,nz,zdef,output,randnum)
endif

'disable fwrite'
'undefine hsttmp'
'undefine hstII'
'undefine hstIIa'
'undefine hstIIb'
'undefine hstIIc'
'undefine hstIIz'
'undefine hstouttmp'
'set gxout contour'

dfile_old=dfile()
'open 'mytmpdir'/hist.ctl.'randnum
file_num=file_number()
'set x '_xs_old' '_xe_old
* The above line is needed to ensure that there will not be a gap near the prime meridian in global maps if unintended.
'set y '_ys_old' '_ye_old
'set lev 'edge_s' 'edge_e
'set t '_ts
'set dfile 'file_num
output'='output'.'file_num
'set dfile 'dfile_old

*
* Restore original dimension environment.
*
*'set x '_xs_old' '_xe_old
*'set y '_ys_old' '_ye_old
'set z '_zs' '_ze
'set t '_ts' '_te

return
***************************************************************************************
function dfile()
*
* Get the default file number.
*
'q file'

line1=sublin(result,1)
dfile=subwrd(line1,2)

return dfile
***************************************************************************************
function file_number()
*
* Get the number of files opened.
*
'q files'
line1=sublin(result,1)
if(line1='No files open')
return 0
endif

lines=1
while(sublin(result,lines+1)!='')
lines=lines+1
endwhile

return lines/3
***************************************************************************************
function dfile_undef()
*
* Get undef value from the default .ctl file. (Not 'q undef', which is for output.)
*
'q ctlinfo'
if(result='No Files Open')
return 'unknown'
endif

lines=1
while(1)
lin=sublin(result,lines)
if(subwrd(lin,1)='undef'|subwrd(lin,1)='UNDEF')
return subwrd(lin,2)
endif
lines=lines+1
endwhile
***************************************************************************************
function default_tims()
*
* Get the beginning time step of the default file.
*
'set t 1'
'query dims'
lt=sublin(result,5)
tims=subwrd(lt,6)

return tims
***************************************************************************************
function writectl4t(mytmpdir,nz,zdef,output,randnum)
*
* Write the .ctl file for the temporary .dat file
*
lines=9
line.1='DSET ^hist.dat.'randnum
line.2='UNDEF 'dfile_undef()
if(_cal='')
line.3='*Intentionally left blank.'
else
line.3='OPTIONS '_cal
endif
line.4=_xdef
line.5=_ydef
line.6=zdef
line.7='TDEF 1 LINEAR '_tims' '_dtim
line.8='VARS 1'
line.9='ENDVARS'
cnt=1
while(cnt<=lines-1)
status=write(mytmpdir'/hist.ctl.'randnum,line.cnt)
cnt=cnt+1
endwhile
cnt=1
while(cnt<=1)
varline=output' 'nz' 99 Add description here.'
status=write(mytmpdir'/hist.ctl.'randnum,varline)
cnt=cnt+1
endwhile
status=write(mytmpdir'/hist.ctl.'randnum,line.lines)
status=close(mytmpdir'/hist.ctl.'randnum)

return
***************************************************************************************
function writectl4xy(mytmpdir,nz,zdef,output,randnum)
*
* Write the .ctl file for the temporary .dat file
*
lines=9
line.1='DSET ^hist.dat.'randnum
line.2='UNDEF 'dfile_undef()
if(_cal='')
line.3='*Intentionally left blank.'
else
line.3='OPTIONS '_cal
endif
line.4='XDEF 1 LEVELS '_lons
line.5='YDEF 1 LEVELS '_lats
line.6=zdef
line.7=_tdef
line.8='VARS 1'
line.9='ENDVARS'
cnt=1
while(cnt<=lines-1)
status=write(mytmpdir'/hist.ctl.'randnum,line.cnt)
cnt=cnt+1
endwhile
cnt=1
while(cnt<=1)
varline=output' 'nz' 99 Add description here.'
status=write(mytmpdir'/hist.ctl.'randnum,varline)
cnt=cnt+1
endwhile
status=write(mytmpdir'/hist.ctl.'randnum,line.lines)
status=close(mytmpdir'/hist.ctl.'randnum)

return
***************************************************************************************
function usage()
*
* Print usage information.
*
say 'Histogram.'
say ''
say 'USAGE: hist t|xy <input> <output> <left_edge> <right_edge> <bin_size>'
say '  t|xy: statistics are calculated over the selected dimension(s).'
say '  <input>: input field (can have horizontal dimensions; NO vertical dimension).'
say '  <output>: histogram.'
say '  <left_edge>: left edge.'
say '  <right_edge>: right edge.'
say '  <bin_size>: bin size.'
say ''
say 'EXAMPLE 1: histogram over time.'
say '  set time Jan1901 Dec2000'
say '  hist t precip preciphist -2 2 0.25'
say '  set time Jan1901'
say '  set lev -2 2' 
say '  set xyrev on'
say '  display preciphist'
say ''
say 'EXAMPLE 2: histogram over space.'
say '  set lon 0 360'
say '  set lat -90 90'
say '  hist xy precip preciphist -2 2 0.25'
say '  set lon 0'
say '  set lat 0'
say '  set lev -2 2' 
say '  set xyrev on'
say '  display preciphist'
say ''
say 'DEPENDENCIES: qdims.gsf'
say ''
say 'COPYRIGHT (C) 2008-2013 Bin Guan.'
say 'Distributed under GNU/GPL.'
return
