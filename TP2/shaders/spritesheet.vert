#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform int sizeM;
uniform int sizeN;
uniform int m;
uniform int n;


varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() 
{
    vTextureCoord = aTextureCoord ;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

}