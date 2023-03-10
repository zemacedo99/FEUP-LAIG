class MySpriteText {
    constructor(scene, text){
        this.scene = scene;
        this.text = text;
        let spritesheetTexture = new CGFtexture(this.scene, "./scenes/images/spriteSheet/Berlinfont.png");
        this.spritesheet = new MySpritesheet(this.scene,spritesheetTexture,16,16);

      
        this.retangle = new MyRectangle(scene,0,0,1,1);

        this.caracterIndex =  
        {
            ' ':32, '!':33,'"':34, '#':35, '$':36, '%':37, '&':38, '\'':39, '(':40, ')':41, '*':42, '+':43, ',':44, '-':45, '.':46, '/':47,
            '0':48, '1':49, '2':50, '3':51, '4':52, '5':53, '6':54, '7':55, '8':56, '9':57, ':':58, ';':59, '<':60, '=':61, '>':62, '?':63,
            '@':64, 'A':65, 'B':66, 'C':67, 'D':68, 'E':69, 'F':70, 'G':71, 'H':72, 'I':73, 'J':74, 'K':75, 'L':76, 'M':77, 'N':78, 'O':79, 
            'P':80, 'Q':81, 'R':82, 'S':83, 'T':84, 'U':85, 'V':86, 'W':87, 'X':88,'Y':89, 'Z':90, '[':91, '\\':92, ']':93, '^':94, '_':95, 
            '`':96, 'a':97, 'b':98, 'c':99, 'd':100, 'e':101, 'f':102, 'g':103, 'h':104, 'i':105, 'j':106, 'k':107, 'l':108, 'm':109, 'n':110, 'o':111,
            'p':112, 'q':113, 'r':114, 's':115, 't':116, 'u':117, 'v':118, 'w':119, 'x':120, 'y':121, 'z':122,'{':123, '|':124, '}':125, '~':126
        };
    }

    display()
    {
        this.scene.gl.enable(this.scene.gl.BLEND); // enables blending
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);// defines the blending function

        this.spritesheet.activateShader();
        this.scene.pushMatrix();
        for(let letter of this.text)
        {
            this.spritesheet.activateCellP(this.caracterIndex[letter]);
            this.retangle.display();
            this.scene.translate(1,0,0);
        }
        this.scene.popMatrix();

        // this.spritesheet.texture.bind();
        this.scene.setActiveShaderSimple(this.scene.defaultShader); 

        
        this.scene.gl.disable(this.scene.gl.BLEND);        // disables blending
    }
}