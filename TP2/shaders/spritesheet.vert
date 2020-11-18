#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float sizeM;
uniform float sizeN;
uniform float m;
uniform float n;


varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() 
{
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    //vTextureCoord = aTextureCoord ;
    vTextureCoord = ( aTextureCoord / vec2(sizeM,sizeN) ) + vec2(m,n);
}
