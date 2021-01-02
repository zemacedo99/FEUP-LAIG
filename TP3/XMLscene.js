/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
        this.lightsValues = [];
        this.selectedTheme = getUrlVars()['file'] || "Beach";
        let filename = getUrlVars()['file'] + ".xml" || "Beach.xml";
        this.graph = new MySceneGraph(filename, this);
        this.graphs = [
            "Beach",
        ];
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.initCameras();
        this.camerasIds;

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.setUpdatePeriod(100);
        this.setPickEnabled(true);
        this.initialTime = 0;

        this.loadingProgressObject = new MyRectangle(this, -1, -.1, 1, .1);
        this.loadingProgress = 0;

        this.defaultAppearance = new CGFappearance(this);
        this.gameOrchestrator = null;
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    updateCamera(id) {
        this.camera = this.graph.views[id]
        this.interface.setActiveCamera(this.camera);
    }

    // called periodically (as per setUpdatePeriod(50-50000ms) in init())
    update(t) {
        let time = t / 1000; // time in seconds

        if (this.initialTime === 0) {
            this.initialTime = time;
        }

        let deltaTime = time - this.initialTime; // deltaTime is the time since the start
        if (this.loopAnimations !== "Never") {
            if (deltaTime >= parseInt(this.loopAnimations)) { // each cicle
                deltaTime = 0;
                this.initialTime = time;
            }
        }
        if (this.gameOrchestrator !== null)
            this.gameOrchestrator.update(t);

        // updates animations
        if (this.sceneInited) {
            if (!this.graph.animations) return;
            //update keyframeanimations
            for (let animation in this.graph.animations) {
                this.graph.animations[animation].update(deltaTime);
            }


            if (!this.graph.spriteanimations) return;
            //update spritesheets
            for (let spriteanimation in this.graph.spriteanimations) {
                this.graph.spriteanimations[spriteanimation].update(deltaTime);
            }
        }

    }


    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebCGF on default shaders.

            if (this.graph.lights.hasOwnProperty(key)) {
                var graphLight = this.graph.lights[key];

                this.lights[i].setPosition(...graphLight[1]);
                this.lights[i].setAmbient(...graphLight[2]);
                this.lights[i].setDiffuse(...graphLight[3]);
                this.lights[i].setSpecular(...graphLight[4]);

                this.lights[i].setVisible(true);
                if (graphLight[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();

                i++;
            }
        }
        //console.log(this.lights)
    }

    /** Handler called when the graph is finally loaded.
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(...this.graph.background);

        this.camerasIds = this.graph.defaultView;
        this.camera = this.graph.views[this.graph.defaultView];
        this.interface.setActiveCamera(this.camera);
        this.interface.createSelectView(this.graph.views)
        this.loopAnimations = "Never";

        this.interface.loopAnimations();
        this.interface.selectTheme(this.graphs);


        this.setGlobalAmbientLight(...this.graph.ambient);

        this.initLights();
        this.interface.lightsGroup(this.graph.lights)

        this.gameOrchestrator = this.graph.instanceGameOrchestrator;
        this.gameOrchestrator.setTheme(this.graph.gameorchestrator)

        this.sceneInited = true;

    }

    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup
        if (this.gameOrchestrator !== null)
            this.gameOrchestrator.managePickRequest(this.pickMode, this.pickResults);
        this.clearPickRegistration(); //Clears the currently registered id and associated object

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();

        for (var i = 0; i < this.lights.length; i++) {
            this.lights[i].setVisible(true);
            this.lights[i].enable();
            this.lights[i].update();
        }
        var cont = 0;
        for (const [key, value] of Object.entries(this.lightsValues)) {
            if (value === false) {
                this.lights[cont].disable();
                this.lights[cont].update();
            }
            cont++;
        }


        if (this.sceneInited) {
            // Draw axis
            this.axis.display();

            this.defaultAppearance.apply();

            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
            //this.gameOrchestrator.display();

        } else {
            // Show some "loading" visuals
            this.defaultAppearance.apply();

            this.rotate(-this.loadingProgress / 10.0, 0, 0, 1);

            this.loadingProgressObject.display();
            this.loadingProgress++;
        }

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }
}