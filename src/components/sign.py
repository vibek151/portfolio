# import turtle 

# t = turtle.Turtle()
# t.hideturtle()

# t.pensize(3)
# t.setheading(105)
# t.circle(-10, 170)
# t.forward(180)
# t.setheading(80)
# t.forward(270)
# t.setheading(180)
# t.forward(15)
# t.setheading(315)
# t.circle(55, 225)
# t.forward(15)
# t.circle(110,165)
# t.forward(15)
# t.circle(-20,145)
# t.forward(190)
# t.setheading(11)
# t.forward(290)

# # t.forward(50)


# turtle.done()

import turtle


# ==========================================
# RECORDING TURTLE
# ==========================================

class RecordingTurtle(turtle.Turtle):

    def __init__(self):
        super().__init__()
        self.svg_points = []

    def _goto(self, end):
        self.svg_points.append((float(end[0]), float(end[1])))
        super()._goto(end)


# ==========================================
# TURTLE
# ==========================================

t = RecordingTurtle()

t.hideturtle()

t.pensize(3)

t.setheading(105)

t.circle(-10, 170)

t.forward(180)

t.setheading(80)

t.forward(270)

t.setheading(180)

t.forward(15)

t.setheading(315)

t.circle(55, 225)

t.forward(15)

t.circle(110,165)

t.forward(15)

t.circle(-20,145)

t.forward(190)

t.setheading(11)

t.forward(290)

# t.forward(50)


# ==========================================
# CREATE SVG
# ==========================================

points = t.svg_points

# Turtle's starting position
start = (0, 0)

points.insert(0, start)


# Find boundaries
xs = [p[0] for p in points]
ys = [p[1] for p in points]

min_x = min(xs)
max_x = max(xs)
min_y = min(ys)
max_y = max(ys)

padding = 10

width = max_x - min_x + padding * 2
height = max_y - min_y + padding * 2


# ==========================================
# BUILD SVG PATH
# ==========================================

path = ""

for i, (x, y) in enumerate(points):

    svg_x = x - min_x + padding

    # Turtle Y is opposite to SVG Y
    svg_y = max_y - y + padding

    if i == 0:
        path += f"M {svg_x:.2f} {svg_y:.2f}"
    else:
        path += f" L {svg_x:.2f} {svg_y:.2f}"


# ==========================================
# WRITE SVG FILE
# ==========================================

svg = f'''<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 {width:.2f} {height:.2f}"
>
    <path
        d="{path}"
        fill="none"
        stroke="#73e4ff"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
'''


with open("signature.svg", "w", encoding="utf-8") as file:
    file.write(svg)


print("================================")
print("SIGNATURE SVG CREATED")
print("================================")
print("signature.svg")
print("================================")


turtle.done()