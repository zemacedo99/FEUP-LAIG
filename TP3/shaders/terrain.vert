attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;
varying vec2 vTextureCoord;

#define MAXIMUM_HEIGHT 8.0

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);
    vTextureCoord = aTextureCoord;
    vec4 terrainmap = texture2D(terrainMap, vTextureCoord);
    float total = (terrainmap.b + terrainmap.r + terrainmap.g)/3.0;	// Average

    offset = aVertexNormal * total * 0.1;
    offset.z = offset.z > MAXIMUM_HEIGHT ? MAXIMUM_HEIGHT : offset.z;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

}