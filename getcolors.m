function [colors,h]=getcolors (filename,nx,ny)

A=imread(filename);
disp(['image size: ' num2str(size(A,1)) ' ' num2str(size(A,2))]);

figure;
ax=axes();
h=imshow(A);

disp('click on top-left corner...')
[x1 y1]=ginput(1);

disp('click on lower-right corner...')
[x2 y2]=ginput(1);

dx=0; dy=0;
if (nx>1)
  dx=(x2-x1)/(nx-1);
end
if (ny>1)
  dy=(y2-y1)/(ny-1);
end

n=1;
for j=1:ny
  for i=1:nx
    x=floor(x1+(i-1)*dx);
    y=floor(y1+(j-1)*dy);
    disp(sprintf('%3i %3i %3i %03i %03i %03i',i,j,n,A(y,x,:)));
    colors(i,j,:)=A(y,x,:);
    n=n+1;
  end
end
%