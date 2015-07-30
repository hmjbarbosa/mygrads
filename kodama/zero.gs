**************************************************************
* function:
*   draw zero-line
* usage:
*   zero var
*     var : variable
*
**************************************************************
function ckzero (args)

var=subwrd(args,1)

'set gxout contour'
'set clevs 0'
'd 'var

return
