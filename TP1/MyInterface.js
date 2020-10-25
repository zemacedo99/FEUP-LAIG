/**
 * MyInterface class, creating a GUI interface.
 */
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () {
        };
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    createSelectView(views) {
        var viewValues = [];

        for (var x in views) {
            if (views.hasOwnProperty(x)) {
                viewValues.push(x);
            }
        }
        this.gui.add(this.scene, 'camerasIds', viewValues)
            .name('Choose View')
            .onChange(val => this.scene.updateCamera(val));
    }


    viewsGroup(views) {
        var viewValues = [];

        for (var x in views) {
            if (views.hasOwnProperty(x)) {
                viewValues.push(x);
            }
        }

        this.gui.add(this.scene, "View", viewValues);
    }

    lightsGroup(lights) {
        var group = this.gui.addFolder("Lights");
        group.open();
        for (var x in lights) {
            if (lights.hasOwnProperty(x)) {
                this.scene.lightsValues[x] = lights[x][0];
                group.add(this.scene.lightsValues, x);
            }
        }
    }
}