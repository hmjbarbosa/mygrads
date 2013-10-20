mygrads
=======

___________________________________________________________________________
COLOR BARS

cbar_line2w.gs 

        Based on grads cbar_line2.gs but with extra option -w for the
        linewidths. In this improved version, lines are only drawn if
        linestyle is not equal to zero. It turns off the string size
        definition, so the user can modify this outside.

cbar_line2wh.gs

        Based on cbar_line2w.gs but This version will draw the legend
        on a line.

cbarnv.gs 

        Modified version of grads cbarn that turn vpage off thus
        allowing a single bar under multiple panels. Written by diane
        stokes following discussions I started on grads mailing
        list. This is not available in grads webpage.

cbarnvskip.gs 

        Modified version of diane's cbarnv. Now she included a skip
        option, so the user can choose how many labels will be shown
        under the bar.

cbarnvbox.gs 

        Modified version of diane's cbarnv. I changed it to show the
        values in the middle of the each bar. The first and last
        colors are shown without the triangle. 

___________________________________________________________________________
COLOR DEFINITIONS

colors.gs

        Changes the default rainbow color sequence interpolating
        between two RGB colors.

pickcolors.gs

        Draws a palette on the screen to allow the user to create a
        rainbow sequence by looking how colors looks like.

___________________________________________________________________________
DISPLAING VARIABLES

dc.gs

        Clear screen, display var with limits and add cbarn.
        Usage: dc var [cint [cmin [cmax]]]

dd.gs

        Clear screen, display var at specific leves and add cbarn.
        Usage: dd var clevs

___________________________________________________________________________
DRAWING SHAPES IN WORLD COORDINATES

drawarrow.gs

        Draws a big arrow on the screen using world coordinates.

drawline.gs

        Draws a line on the screen using world coordinates.

drawmark.gs

        Draws a marker on the screen using world coordinates.

drawrec.gs

        Draw a rectangle on the screen using world coordinates.

textbox.gs

        Draws a box in the figure with a text inside with shortcuts
        for positioning at the corners.

___________________________________________________________________________
OPEN MANY FILE

openall.gs
sdfopenall.gs
xdfopenall.gs

        These will reinit grads and open all ctl files in a give
        directory using either 'open', 'sdfopen' or 'xdfopen'.

___________________________________________________________________________
FUNCTIONS

grepfile.gsf
 
        Function grepfile can be used to grep only those lines from a
        file that match a given pattern. The result is the number of
        matching lines. The actual lines are stored in a global vector
        named _grepfile

greptext.gsf 

        Function greptext can be used to grep only those lines from a
        text that match a given pattern. The result is the number of
        matching lines. The actual lines are stored in a global vector
        named _greptext

isnumber.gsf 

        Check each character in a string, returning true (1) or false
        (0) if the string as a whole can be considered a number.


