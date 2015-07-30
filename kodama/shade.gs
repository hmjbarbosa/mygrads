**************************************************************
* function:
*   draw shade
* usage:
*   shade var min max [r/211] [g/211] [b/211]
*     var : variable
*     min : minimum value
*     max : maximum value
*     r   : shade color(red)
*     g   : shade color(green)
*     b   : shade color(blue)
* note:
*   If (r,g,b) is not specified, the color of shade is set to grey
*
*   note:[arg-name / **] : no need to type (** is default value)
**************************************************************
function shade (args)

var=subwrd(args,1)

min=subwrd(args,2)
max=subwrd(args,3)

r=subwrd(args,4)
g=subwrd(args,5)
b=subwrd(args,6)

*** 灰色を生成(デフォルト) ***
if(r="" | g="" | b="")
  r=211
  g=211
  b=211
endif

'set rgb 90 'r' 'g' 'b

'set gxout shaded'
'set clevs 'min' 'max
'set ccols 0 90 0'
'd 'var

return
