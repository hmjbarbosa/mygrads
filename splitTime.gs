'query time'

temp=subwrd(result,3)
if substr(temp,3,1)='Z'
  hh=substr(temp,1,2)
  hm='00'
  dd=substr(temp,4,2)
  mm=substr(temp,6,3)
  yy=substr(temp,9,4)
else
  hh=substr(temp,1,2)
  hm=substr(temp,4,2)
  dd=substr(temp,7,2)
  mm=substr(temp,9,3)
  yy=substr(temp,12,4)
endif

if (mm='JAN'); mes='01'; endif
if (mm='FEB'); mes='02'; endif
if (mm='MAR'); mes='03'; endif
if (mm='APR'); mes='04'; endif
if (mm='MAY'); mes='05'; endif
if (mm='JUN'); mes='06'; endif
if (mm='JUL'); mes='07'; endif
if (mm='AUG'); mes='08'; endif
if (mm='SEP'); mes='09'; endif
if (mm='OCT'); mes='10'; endif
if (mm='NOV'); mes='11'; endif
if (mm='DEC'); mes='12'; endif

*return hh' 'dd' 'mes' 'yy''
return yy' 'mes' 'dd' 'hh' 'hm

*