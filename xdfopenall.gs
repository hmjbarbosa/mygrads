function xdfopenall(dir)

reinit

* check if anydir was informed
if (dir=''); dir='.'; endif

* create file list
'!/bin/ls 'dir'/*.ctl 'dir'/*.CTL 'dir'/*.Ctl > openall.list 2> /dev/null'

* read first line
rc=read('openall.list')
ok=sublin(rc,1)
lin=sublin(rc,2)

* process all lines
while (ok=0)
  arq=subwrd(lin,1)
  'xdfopen 'arq

* read next line
  rc=read('openall.list')
  ok=sublin(rc,1)
  lin=sublin(rc,2)
endwhile

'q files'
say result

rc=close('openall.list')
'!rm openall.list'

*fim