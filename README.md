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

        Create a rainbow color sequence interpolating between two RGB
        colors. User can choose number of colors and color id.

pickcolors.gs

        Draws a palette on the screen to allow the user to create a
        rainbow sequence by looking how colors looks like.

getcolors.m
getcolors.png

	MATLAB script to open an image file and read the RGB
	values. The user defines a regular grid at which the colors
	will be read. Useful for copying the RGB values of some nice
	colorbar in an image so that you can use the same colors in
	grads (try with getcolors.png).

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

drawpoly.gs

        Draw a polygon on the screen using world coordinates.

drawrec.gs

        Draw a rectangle on the screen using world coordinates.

handpoly.gs

        Draw a polygon by hand, i.e., by clicking on the screen.

hist.gs

	Bin Guan's histogram function

textbox.gs

        Draws a box in the figure with a text inside with shortcuts
        for positioning at the corners.

___________________________________________________________________________
CLIMATE/METEOROLOGY

ensave.gs

	Create a new variable as the average of the same variable
	existing in multiple opened files.

ensstdev.gs

	Create a new variable as the standard deviation of the same
	variable existing in multiple opened files.

latinterp.gs
loninterp.gs

	Interpolates a field to an exact latitute or longitute

windrose.gs

	Draws a wind-rose from wind speed and direction

___________________________________________________________________________
OPEN MANY FILE

openall.gs
sdfopenall.gs
xdfopenall.gs

        These will reinit grads and open all ctl files in a give
        directory using either 'open', 'sdfopen' or 'xdfopen'.

___________________________________________________________________________
FUNCTIONS

mapval.gsf

        Selects all different values of a field in a given area. The
        returning value of the function is the number of values and a
        global variable _mapval stores is defined to keep the values.

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


