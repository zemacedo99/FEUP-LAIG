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
        this.gui.add(this.scene, 'startgame').name('Start Game!');
        this.gui.add(this.scene, 'quit').name('Quit Game!');
        this.gui.add(this.scene, 'undo').name('Undo move!');
        // this.gui.add(this.scene, 'video').name('Play Video!');

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

    loopAnimations() {
        this.gui.add(this.scene, 'loopAnimations', ["5s", "10s", "15s", "Never"])
            .name('Loop Animations');
    }

    selectTheme(scenes) {
        let options = [];
        for (let item of scenes){
            options.push(item.toString())
        }
        this.gui.add(this.scene, 'selectedTheme', options)
            .name('Theme')
            .onChange(val => (window.location.href = location.protocol + '//' + location.host + location.pathname+"?file="+val ));
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