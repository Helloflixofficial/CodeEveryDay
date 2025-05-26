#include <graphics.h>
#include <conio.h>

int main() {
    int gd = DETECT, gm;
    initgraph(&gd, &gm, "");

    // Roof of the hut (triangle)
    line(100, 100, 150, 50);
    line(150, 50, 200, 100);

    // Extended Roof
    line(150, 50, 350, 50);
    line(350, 50, 400, 100);

    // Walls
    rectangle(100, 100, 200, 200);
    rectangle(200, 100, 400, 200);

    // Door and window
    rectangle(130, 130, 170, 200); // Door
    rectangle(250, 120, 350, 180); // Window

    getch();
    closegraph();

    return 0;
}
