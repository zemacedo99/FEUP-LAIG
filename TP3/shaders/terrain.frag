#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;

void main() {

    vec4 color = texture2D(terrainTex, vTextureCoord);   //move the color
    vec4 map   = texture2D(terrainMap, vec2(0.0,0.1) + vTextureCoord);

    map *= 0.2; // mais suave

    vec4 frag = vec4(color.r - map.r, color.g - map.g, color.b - map.b, 1.0);

    gl_FragColor = frag;
}