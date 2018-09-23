//The absolute legend being the code for the fragment shader which is the one computing the color for every vertex processed
var fragmentSource = `#version 300 es

precision mediump float;

uniform vec4 color;
out vec4 fragOut;

void main() {
   fragOut = color;
}
`;
