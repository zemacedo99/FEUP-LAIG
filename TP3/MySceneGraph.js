const DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var INITIALS_INDEX = 0;
var VIEWS_INDEX = 1;
var ILLUMINATION_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var SPRITESHEETS_INDEX = 5;
var MATERIALS_INDEX = 6;
var ANIMATIONS_INDEX = 7;
var NODES_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * Constructor for MySceneGraph class.
     * Initializes necessary variables and starts the XML file reading process.
     * @param {string} filename - File that defines the 3D scene
     * @param {XMLScene} scene
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        
        this.idRoot = null; // The id of the root element.
        
        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];
        
        // Save Elements
        this.views = [];
        this.defaultView = null;
        this.nodes = [];
        this.spriteanimations = [];

        this.mainBoard = new MyMainBoard(this.scene);
        this.auxBoard = new MyAuxBoard(this.scene);
        

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    missingAttributeMessage(node_name, attr = "some") {
        return (node_name + " - " + attr + " attribute is not defined");
    }

    missingNodeMessage(node_name) {
        return (node_name + " node is not defined");
    }

    getStringAttr(node, attr) {
        if (!this.reader.hasAttribute(node, attr)) {
            this.onXMLMinorError(this.missingAttributeMessage(node.nodeName, attr));
        }
        return this.reader.getString(node, attr);
    }

    getFloatAttr(node, attr) {
        if (!this.reader.hasAttribute(node, attr)) {
            this.onXMLMinorError(this.missingAttributeMessage(node.nodeName, attr));
            return null;
        }
        return this.reader.getFloat(node, attr);
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lsf")
            return "root tag <lsf> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <initials>
        var index;
        if ((index = nodeNames.indexOf("initials")) == -1)
            return "tag <initials> missing";
        else {
            if (index != INITIALS_INDEX)
                this.onXMLMinorError("tag <initials> out of order " + index);

            //Parse initials block
            if ((error = this.parseInitials(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }

        // <illumination>
        if ((index = nodeNames.indexOf("illumination")) == -1)
            return "tag <illumination> missing";
        else {
            if (index != ILLUMINATION_INDEX)
                this.onXMLMinorError("tag <illumination> out of order");

            //Parse illumination block
            if ((error = this.parseIllumination(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }

        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <spritesheets>
        if ((index = nodeNames.indexOf("spritesheets")) == -1)
            return "tag <spritesheets> missing";
        else {
            if (index != SPRITESHEETS_INDEX)
                this.onXMLMinorError("tag <spritesheets> out of order");

            //Parse spritesheets block
            if ((error = this.parseSpriteSheets(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <animations>
        if ((index = nodeNames.indexOf("animations")) == -1)
            return "tag <animations> missing";
        else {
            if (index != ANIMATIONS_INDEX)
                this.onXMLMinorError("tag <animations> out of order");

            //Parse animations block
            if ((error = this.parseAnimations(nodes[index])) != null)
                return error;
        }

        // <nodes>
        if ((index = nodeNames.indexOf("nodes")) == -1)
            return "tag <nodes> missing";
        else {
            if (index != NODES_INDEX)
                this.onXMLMinorError("tag <nodes> out of order");

            //Parse nodes block
            if ((error = this.parseNodes(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <initials> block.
     * @param {initials block element} initialsNode
     */
    parseInitials(initialsNode) {
        var children = initialsNode.children;
        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var rootIndex = nodeNames.indexOf("root");
        var referenceIndex = nodeNames.indexOf("reference");

        // Get root of the scene.
        if (rootIndex == -1)
            return "No root id defined for scene.";

        var rootNode = children[rootIndex];
        var id = this.reader.getString(rootNode, 'id');
        if (id == null)
            return "No root id defined for scene.";

        this.idRoot = id;

        // Get axis length
        if (referenceIndex == -1)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        var refNode = children[referenceIndex];
        var axis_length = this.getFloatAttr(refNode, 'length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed initials");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseViews(viewsNode) {
        var defaultView = this.getStringAttr(viewsNode, 'default')
      
        if (defaultView == null)
            return "Erro on parse view element: no default defined.";

        var children = viewsNode.children;
        var nodeNames = [];

        for (var i = 0; i < children.length; i++){
            switch (children[i].nodeName){
                case 'perspective':
                    this.parsePerspectiveView(children[i]);
                    break;
                case 'ortho':
                    this.parseOrthoView(children[i]);
                    break;
                default:
                    this.log("View must be in 'perspective' or 'ortho' tags")
                    break;
            }
        }

        if (!this.existIndex(defaultView, this.views)) {
            this.onXMLMinorError("Default Id of Views do not exist");
            return "Do not exist default view. ";
        }

        if (this.views[defaultView] == null)
            return "Can't find default view";


        this.defaultView = defaultView;
        this.log("Parsed Views");
        return null;
    }

    parsePerspectiveView(perspectiveNode) {
        var perspectiveData = [];
        perspectiveData['type'] = "perspective";
        perspectiveData['id'] = this.reader.getString(perspectiveNode, 'id');
        perspectiveData['near'] = this.getFloatAttr(perspectiveNode, 'near');
        perspectiveData['far'] = this.getFloatAttr(perspectiveNode, 'far');
        perspectiveData['angle'] = this.getFloatAttr(perspectiveNode, 'angle');

        let viewCoords = perspectiveNode.children;

        if (viewCoords.length !== 2) {
            this.onXMLMinorError("Perspective View (id = " + perspectiveNode['id'] + ") invalid number of view coordinates");
        } else if (viewCoords[0].nodeName !== "from") {
            this.onXMLMinorError(this.missingNodeMessage(perspectiveNode.nodeName, "from"));
        } else if (viewCoords[1].nodeName !== "to") {
            this.onXMLMinorError(this.missingNodeMessage(perspectiveNode.nodeName, "to"));
        }

        perspectiveData['from'] = this.parseCoordinates3D(viewCoords[0]);
        perspectiveData['to'] = this.parseCoordinates3D(viewCoords[1]);

        if (perspectiveData['from'][0] === perspectiveData['to'][0] && perspectiveData['from'][1] === perspectiveData['to'][1] && perspectiveData['from'][2] === perspectiveData['to'][2]) {
            this.onXMLMinorError("Perspective View (id = " + perspectiveData['id'] + ") 'from' and 'to' attributes cannot be the same.");
        }
        if (perspectiveData['near'] >= perspectiveData['far']) {
            this.onXMLMinorError("Perspective View (id = " + perspectiveData['id'] + ") has near attr higher than far");
        }
        if (perspectiveData['angle'] <= 0) {
            this.onXMLMinorError('Perspective View (id = ' + perspectiveData['id'] + '): view angle should be bigger than 0, setting angle to 0.1');
            perspectiveData['angle'] = 0.1;
        } else if (perspectiveData['angle'] > 180) {
            this.onXMLMinorError('Perspective View (id = ' + perspectiveData['id'] + '): view angle should be smaller or equal to 180, setting angle to 180');
            perspectiveData['angle'] = 180;
        }

        if (!this.existIndex(perspectiveData['id'], this.views)) {
            this.views[perspectiveData['id']] = new CGFcamera(
                perspectiveData['angle'],
                perspectiveData['near'],
                perspectiveData['far'],
                perspectiveData['from'],
                perspectiveData['to'],
            );
        }
    }

    parseOrthoView(orthoNode) {
        var orthoData = [];
        orthoData['type'] = "ortho";
        orthoData['id'] = this.reader.getString(orthoNode, 'id');
        orthoData['near'] = this.getFloatAttr(orthoNode, 'near');
        orthoData['far'] = this.getFloatAttr(orthoNode, 'far');
        orthoData['left'] = this.getFloatAttr(orthoNode, 'left');
        orthoData['right'] = this.getFloatAttr(orthoNode, 'right');
        orthoData['top'] = this.getFloatAttr(orthoNode, 'top');
        orthoData['bottom'] = this.getFloatAttr(orthoNode, 'bottom');

        let viewCoords = orthoNode.children;

        if (viewCoords.length !== 2 && viewCoords.length !== 3) {
            this.onXMLMinorError("Ortho View (id = " + orthoData['id'] + ") invalid number of view coordinates");
        } else if (viewCoords[0].nodeName !== "from") {
            this.onXMLMinorError(this.missingNodeMessage(orthoNode.nodeName, "from"));
        } else if (viewCoords[1].nodeName !== "to") {
            this.onXMLMinorError(this.missingNodeMessage(orthoNode.nodeName, "to"));
        }

        orthoData['from'] = this.parseCoordinates3D(viewCoords[0]);
        orthoData['to'] = this.parseCoordinates3D(viewCoords[1]);
        orthoData['up'] = this.parseCoordinates3D(viewCoords[2]);

        if (orthoData['from'][0] === orthoData['to'][0] && orthoData['from'][1] === orthoData['to'][1] && orthoData['from'][2] === orthoData['to'][2]) {
            this.onXMLMinorError("Ortho View (id = " + orthoData['id'] + ") 'from' and 'to' attributes cannot be the same.");
        }
        if (orthoData['near'] >= orthoData['far']) {
            this.onXMLMinorError("Ortho View (id = " + orthoData['id'] + ") has near attr higher than far");
        }
        if (orthoData['left'] >= orthoData['right']) {
            this.onXMLMinorError("Ortho View (id = " + orthoData['id'] + ") has left attr higher than right");
        }
        if (orthoData['bottom'] >= orthoData['top']) {
            this.onXMLMinorError("Ortho View (id = " + orthoData['id'] + ") has bottom attr higher than top");
        }

        if (!this.existIndex(orthoData['id'], this.views)) {
            this.views[orthoData['id']] = new CGFcameraOrtho(
                orthoData['left'],
                orthoData['right'],
                orthoData['bottom'],
                orthoData['top'],
                orthoData['near'],
                orthoData['far'],
                orthoData['from'],
                orthoData['to'],
                orthoData['up'],
            );
        }

    }

    /**
     * Parses the <illumination> node.
     * @param {illumination block element} illuminationsNode
     */
    parseIllumination(illuminationsNode) {

        var children = illuminationsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed Illumination");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "light") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            } else {
                attributeNames.push(...["enable", "position", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["boolean", "position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "boolean")
                        var aux = this.parseBoolean(grandChildren[attributeIndex], "value", "enabled attribute for light of ID" + lightId);
                    else if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (typeof aux === 'string')
                        return aux;

                    global.push(aux);
                } else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }
            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block.
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {

        //For each texture in textures block, check ID and file URL
        var children = texturesNode.children;

        this.textures = [];

        // Any number of textures.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current texture
            var textureID = this.reader.getString(children[i], 'id');
            if (textureID == null)
                return "no ID defined for texture";

            // Checks for repeated IDs.
            if (this.textures[textureID] != null)
                return "ID must be unique for each texture (conflict: ID = " + textureID + ")";

            var textureURL = this.reader.getString(children[i], 'path');
            if (textureURL == null)
                return "No path for texture with ID = " + textureID + ")";

            var texture = new CGFtexture(this.scene, textureURL);
            this.textures[textureID] = texture;
        }


        this.log("Parsed textures");
        return null;
    }


    /**
     * Parses the <spritesheets> block.
     * @param {spritesheets block element} spritesheetsNode
     */
    parseSpriteSheets(spritesheetsNode) {

            //For each spritesheet in spritesheets block, check ID, file URL, size of the columns  and lines
            var children = spritesheetsNode.children;

            this.spritesheets = [];

            // Any number of spritesheets.
            for (var i = 0; i < children.length; i++) 
            {

                if (children[i].nodeName != "spritesheet") {
                    this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                    continue;
                }

                // Get id of the current spritesheet
                var spritesheetID = this.reader.getString(children[i], 'id');
                if (spritesheetID == null)
                    return "no ID defined for spritesheet";

                // Checks for repeated IDs.
                if (this.spritesheets[spritesheetID] != null)
                    return "ID must be unique for each spritesheet (conflict: ID = " + spritesheetID + ")";

                let spritesheetURL = this.reader.getString(children[i], 'path');
                if (spritesheetURL == null)
                    return "No path for spritesheet with ID = " + spritesheetID + ")";

                let sizeM = this.reader.getInteger(children[i], 'sizeM');
                if (sizeM == null)
                    return "No columns size for spritesheet with ID = " + spritesheetID + ")";
    
                let sizeN = this.reader.getInteger(children[i], 'sizeN');
                if (sizeN == null)
                    return "No lines size for spritesheet with ID = " + spritesheetID + ")";
    

                let spritesheetTexture = new CGFtexture(this.scene, spritesheetURL);
                let spritesheet = new MySpritesheet(this.scene,spritesheetTexture,sizeM,sizeN);

                this.spritesheets[spritesheetID] = spritesheet;
            }
        this.log("Parsed spritesheets");
        return null;
    }


    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];

        var grandChildren = [];
        var nodeNames = [];

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each material (conflict: ID = " + materialID + ")";

            //Continue here

            grandChildren = children[i].children;

            for (var d = 0; d < grandChildren.length; d++) {
                switch (grandChildren[d].nodeName) {
                    case "shininess":

                        var shininess = this.getFloatAttr(grandChildren[d], 'value');
                        //nodeNames.push(grandChildren[d].nodeName);
                        break;


                    case "ambient":
                        var ambient = this.parseColor(grandChildren[d], "ambient");
                        //nodeNames.push(grandChildren[d].nodeName);
                        break;

                    case "diffuse":
                        var diffuse = this.parseColor(grandChildren[d], "diffuse");
                        //nodeNames.push(grandChildren[d].nodeName);
                        break;

                    case "specular":
                        var specular = this.parseColor(grandChildren[d], "specular");
                        //nodeNames.push(grandChildren[d].nodeName);
                        break;

                    case "emissive":
                        var emissive = this.parseColor(grandChildren[d], "emissive");
                        //nodeNames.push(grandChildren[d].nodeName);
                        break;

                    default:
                        this.onXMLMinorError("Warning, something wrong w/ materials");

                }
            }

            var material = new CGFappearance(this.scene);
            material.setShininess(shininess);
            material.setAmbient(...ambient);
            material.setDiffuse(...diffuse);
            material.setSpecular(...specular);
            material.setEmission(...emissive);


            this.materials[materialID] = material;
        }
        this.log("Parsed materials");
        return null;
    }

    /**
     * Parses the <animations> block.
     * @param {animations block element} animationsNode
     */
    parseAnimations(animationsNode) {

        //For each animation in animations block, check ID and file URL
        let children = animationsNode.children;
        let grandChildren = [];
        let grandgrandChildren = [];

        this.animations = [];

        // Any number of animations.
        for (let i = 0; i < children.length; i++) {
            if (children[i].nodeName != "animation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current animation
            let animationID = this.reader.getString(children[i], 'id');
            if (animationID == null)
                return "no ID defined for animation";

            // Checks for repeated IDs.
            if (this.animations[animationID] != null)
                return "ID must be unique for each animation (conflict: ID = " + animationID + ")";


            let animation = new KeyframeAnimation(this.scene,animationID);
            this.animations[animationID] = animation;

            grandChildren = children[i].children;
            
            for (let d = 0; d < grandChildren.length; d++) {

                grandgrandChildren = grandChildren[d].children;
                let keyframeInstant = this.reader.getFloat(grandChildren[d], 'instant');
                
                let translation;
                let rotX;
                let rotY;
                let rotZ;
                let scale = [1,1,1];

                for(let j = 0; j < grandgrandChildren.length; j++)
                {
                    switch (grandgrandChildren[j].nodeName) {
                        case "translation":
                            translation = this.parseCoordinates3D(grandgrandChildren[j], grandgrandChildren[j].nodeName);
                            break;

                        case "rotation":
                            let rad = this.reader.getFloat(grandgrandChildren[j], 'angle') * Math.PI / 180;
                            let axis = this.reader.getString(grandgrandChildren[j], 'axis');


                            switch (axis) {
                                case "x":
                                    rotX = rad;
                                    break;
                                case "y":
                                    rotY = rad;
                                    break;
                                case "z":
                                    rotZ = rad; 
                                    break;
                                default:
                                    break;

                            }
                            break;

                            
                        case "scale":
                            scale = this.parseScale(grandgrandChildren[j], grandgrandChildren[j].nodeName);
                            break;

                        default:
                            this.onXMLMinorError("transformations not recognized " + grandgrandChildren[j].nodeName);
                    }

                }


                let keyframe = new Keyframe(keyframeInstant,translation,rotX,rotY,rotZ,scale);
                this.animations[animationID].addKeyframe(keyframe);
            }

        }


        this.log("Parsed animations");
        return null;
    }



    /**
     * Parses the <nodes> block.
     * @param {nodes block element} nodesNode
     */
    parseNodes(nodesNode) {
        var children = nodesNode.children;

        this.nodes = [];

        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        // Any number of nodes.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "node") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current node.
            var nodeID = this.reader.getString(children[i], 'id');
            if (nodeID == null)
                return "no ID defined for nodeID";

            // Checks for repeated IDs.
            if (this.nodes[nodeID] != null)
                return "ID must be unique for each node (conflict: ID = " + nodeID + ")";

            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationsIndex = nodeNames.indexOf("transformations");
            var materialIndex = nodeNames.indexOf("material");
            var textureIndex = nodeNames.indexOf("texture");
            var descendantsIndex = nodeNames.indexOf("descendants");
            var animationIndex = nodeNames.indexOf("animationref");

            // Transformations
            var matrix = mat4.create();

            if (transformationsIndex != -1) {
                grandgrandChildren = grandChildren[transformationsIndex].children;

                for (var t = 0; t < grandgrandChildren.length; t++) {
                    switch (grandgrandChildren[t].nodeName) {
                        case "translation":
                            let vec = this.parseCoordinates3D(grandgrandChildren[t], nodeID);
                            matrix = mat4.translate(matrix, matrix, vec);
                            break;

                        case "scale":
                            matrix = mat4.scale(matrix, matrix, this.parseScale(grandgrandChildren[t], nodeID));

                            break;


                        case "rotation":
                            var axis = this.reader.getString(grandgrandChildren[t], 'axis');
                            var axis_vec;
                            switch (axis) {
                                case "x":
                                    axis_vec = [1, 0, 0];
                                    break;
                                case "y":
                                    axis_vec = [0, 1, 0];
                                    break;
                                case "z":
                                    axis_vec = [0, 0, 1];
                                    break;
                                default:
                                    axis_vec = [1, 0, 0];
                                    break;

                            }
                            var rad = this.reader.getString(grandgrandChildren[t], 'angle') * Math.PI / 180;
                            matrix = mat4.rotate(matrix, matrix, rad, axis_vec);
                            break;

                        default:
                            this.onXMLMinorError("transformations not recognized " + grandgrandChildren[t].nodeName);
                    }
                }
            } else {
                this.onXMLMinorError("No transformations");
            }


            // Material

            let materialID;
            if (materialIndex != -1) {
                materialID = this.reader.getString(grandChildren[materialIndex], 'id');
                if (materialID != "null" && this.materials[materialID] == null) {
                    this.onXMLError("No material found on node: "+ nodeID);
                }
            } else {
                this.onXMLMinorError("No materials");
            }


            // Texture

            let texture;

            if (textureIndex != -1) {


                texture = this.reader.getString(grandChildren[textureIndex], 'id');
                grandgrandChildren = grandChildren[textureIndex].children;

                /*
                for (var t = 0; t < grandgrandChildren.length; t++)
                {
                    grandgrandChildren[t].nodeName == "amplification"
                }
                */

            } else {
                this.onXMLMinorError("No textures");
            }


            // Animation
            let animationID;
      
            if (animationIndex != -1) {
                animationID = this.reader.getString(grandChildren[animationIndex], 'id');
                if (animationID != "null" && this.animations[animationID] == null) {
                    this.onXMLError("No animation found on node "+ nodeID);
                }
                else 
                {
                    // animationID = "none";
                }
            } 
            


            // Descendants

            let primitives = [];
            let descendants = [];
            let primitive;
            if (descendantsIndex != -1) {

                grandgrandChildren = grandChildren[descendantsIndex].children;

                for (var d = 0; d < grandgrandChildren.length; d++) {

                    switch (grandgrandChildren[d].nodeName) {
                        case "noderef":


                            // Get id of the current descendent.
                            var descendant_nodeID = this.reader.getString(grandgrandChildren[d], 'id');
                            if (descendant_nodeID == null)
                                this.onXMLMinorError("no descendant id");

                            descendants.push(descendant_nodeID);
                            break;

                        case "leaf":
                            let primitiveType = this.reader.getString(grandgrandChildren[d], 'type');
                            switch (primitiveType) {
                                case "rectangle":
                                    var x1 = this.reader.getFloat(grandgrandChildren[d], 'x1');
                                    var y1 = this.reader.getFloat(grandgrandChildren[d], 'y1');
                                    var x2 = this.reader.getFloat(grandgrandChildren[d], 'x2');
                                    var y2 = this.reader.getFloat(grandgrandChildren[d], 'y2');
                                    primitive = new MyRectangle(this.scene, x1, y1, x2, y2);
                                    break;

                                case "triangle":
                                    var x1 = this.reader.getFloat(grandgrandChildren[d], 'x1');
                                    var y1 = this.reader.getFloat(grandgrandChildren[d], 'y1');
                                    var x2 = this.reader.getFloat(grandgrandChildren[d], 'x2');
                                    var y2 = this.reader.getFloat(grandgrandChildren[d], 'y2');
                                    var x3 = this.reader.getFloat(grandgrandChildren[d], 'x3');
                                    var y3 = this.reader.getFloat(grandgrandChildren[d], 'y3');

                                    primitive = new MyTriangle(this.scene, x1, y1, x2, y2, x3, y3);
                                    break;

                                case "torus":
                                    var inner = this.reader.getFloat(grandgrandChildren[d], 'inner');
                                    var outer = this.reader.getFloat(grandgrandChildren[d], 'outer');
                                    var slices = this.reader.getFloat(grandgrandChildren[d], 'slices');
                                    var loops = this.reader.getFloat(grandgrandChildren[d], 'loops');

                                    primitive = new MyTorus(this.scene, inner, outer, slices, loops);
                                    break;

                                case "sphere":
                                    var radius = this.reader.getFloat(grandgrandChildren[d], 'radius');
                                    var slices = this.reader.getFloat(grandgrandChildren[d], 'slices');
                                    var stacks = this.reader.getFloat(grandgrandChildren[d], 'stacks');

                                    primitive = new MySphere(this.scene, radius, slices, stacks);
                                    break;

                                case "cylinder":
                                    var height = this.reader.getFloat(grandgrandChildren[d], 'height');
                                    var topRadius = this.reader.getFloat(grandgrandChildren[d], 'topRadius');
                                    var bottomRadius = this.reader.getFloat(grandgrandChildren[d], 'bottomRadius');
                                    var stacks = this.reader.getFloat(grandgrandChildren[d], 'stacks');
                                    var slices = this.reader.getFloat(grandgrandChildren[d], 'slices');

                                    primitive = new MyCylinder(this.scene, height, topRadius, bottomRadius, stacks, slices);
                                    break;

                                case "spritetext":
                                    var text = this.reader.getString(grandgrandChildren[d],'text');

                                    primitive = new MySpriteText(this.scene,text);
                                    break;

                                case "spriteanim":
                                    var ssid = this.reader.getString(grandgrandChildren[d],'ssid');
                                    var startCell = this.reader.getFloat(grandgrandChildren[d],'startCell');
                                    var endCell = this.reader.getFloat(grandgrandChildren[d],'endCell');
                                    var duration = this.reader.getFloat(grandgrandChildren[d],'duration');

                                    primitive = new MySpriteAnimation(this.scene,ssid,startCell,endCell,duration);
                                    this.spriteanimations.push(primitive);
                                    break;

                                case "plane":
                                    var npartsU = this.reader.getFloat(grandgrandChildren[d],'npartsU');
                                    var npartsV = this.reader.getFloat(grandgrandChildren[d],'npartsV');

                                    primitive = new MyPlane(this.scene,npartsU,npartsV);
                                    break;
                                
                                case "patch":
                                    var npointsU = this.reader.getFloat(grandgrandChildren[d],'npointsU');
                                    var npointsV = this.reader.getFloat(grandgrandChildren[d],'npointsV');
                                    var npartsU = this.reader.getFloat(grandgrandChildren[d],'npartsU');
                                    var npartsV = this.reader.getFloat(grandgrandChildren[d],'npartsV');

                                    let controlpoints = [];
                                    let grandgrandgrandChildren = grandgrandChildren[d].children;

                                    for(var z = 0; z < grandgrandgrandChildren.length; z++)
                                    {
                                        let point = this.parseCoordinates3D(grandgrandgrandChildren[z], grandgrandChildren[d].nodeName);
                                        point.push(1);
                                        controlpoints.push(point);
                                    }

                                    let controlvertexes = this.processControlPoints(controlpoints,npointsU,npointsV);

                                    primitive = new MyPatch(this.scene,npointsU,npointsV,npartsU,npartsV,controlvertexes);
                                    break;
                                
                                
                                case "defbarrel":
                                    let defbase = this.reader.getFloat(grandgrandChildren[d],'base');
                                    let defmiddle = this.reader.getFloat(grandgrandChildren[d],'middle');
                                    let defheight = this.reader.getFloat(grandgrandChildren[d],'height');
                                    let defslices = this.reader.getFloat(grandgrandChildren[d],'slices');
                                    let defstacks = this.reader.getFloat(grandgrandChildren[d],'stacks');

                                    
                                    primitive = new MyDefbarrel(this.scene,defbase,defmiddle,defheight,defslices,defstacks);
                                    break;
    

                                default:
                                    this.onXMLMinorError("Warning, invalid primitive");

                            }


                            primitives.push(primitive);
                            break;

                        default:
                            this.onXMLMinorError("Warning, something wrong w/ descendants");

                    }
                }
            } else {
                this.onXMLMinorError("No descendants");
            }


            this.nodes[nodeID] = new MyNode(nodeID, materialID, texture, matrix, descendants, primitives,animationID);
        }
    }

    processControlPoints(controlpoints,npointsU,npointsV)
    {
        let ncontrolvertexes = npointsU * npointsV;
        let count  = 0;
        let controlvertexes = [];
        let U = [];

        for(let u = 0; u < npointsU; u++)
        {
            let V = []
            for(let v = 0; v<npointsV; v++)
            {
                V.push(controlpoints[count]);
                count++;
                if( count == ncontrolvertexes)
                {
                    break;
                }    
            }
            
            controlvertexes.push(V);

            
        }


        return controlvertexes;
    }

    parseBoolean(node, name, messageError) {
        var boolVal = true;
        boolVal = this.reader.getBoolean(node, name);
        if (!(boolVal != null && !isNaN(boolVal) && (boolVal == true || boolVal == false)))
            this.onXMLMinorError("unable to parse value component " + messageError + "; assuming 'value = 0'");
        return boolVal || false;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinatesXXYYZZ(node, messageError = "Error on parse Coords xx,yy,zz") {
        var position = [];

        // xx
        var x = this.getFloatAttr(node, 'xx');
        if (!(x != null && !isNaN(x)))
            return "unable to parse xx-coordinate of the " + messageError;

        // yy
        var y = this.getFloatAttr(node, 'yy');
        if (!(y != null && !isNaN(y)))
            return "unable to parse yy-coordinate of the " + messageError;

        // zz
        var z = this.getFloatAttr(node, 'zz');
        if (!(z != null && !isNaN(z)))
            return "unable to parse zz-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates of the scale factor from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseScale(node, messageError = "Error on parse scale") {
        var position = [];

        // x
        var x = this.getFloatAttr(node, 'sx');
        if (!(x != null && !isNaN(x)))
            return "unable to parse sx-coordinate of the " + messageError;
        var y = this.getFloatAttr(node, 'sy');
        if (!(y != null && !isNaN(y)))
            return "unable to parse sy-coordinate of the " + messageError;

        // z
        var z = this.getFloatAttr(node, 'sz');
        if (!(z != null && !isNaN(z)))
            return "unable to parse sz-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }


    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError = "Error on parse Coords 3D") {
        var position = [];

        // x
        var x = this.getFloatAttr(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.getFloatAttr(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.getFloatAttr(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.getFloatAttr(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.getFloatAttr(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.getFloatAttr(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.getFloatAttr(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.getFloatAttr(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    existIndex(id, array) {
        return typeof array[id] !== 'undefined'
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        //this.mainBoard.display();
        this.auxBoard.display();
        //this.processNode(this.idRoot, this.nodes[this.idRoot].material, this.nodes[this.idRoot].texture);
    }

    processNode(id, matParent, texParent) {
        
        // Apply materials and textures

        this.scene.pushMatrix();

        this.scene.multMatrix(this.nodes[id].matrix);

        if(this.nodes[id].animation)
        {
            this.animations[this.nodes[id].animation].apply();
        }

        let materialAux = this.nodes[id].material === 'null' ? matParent : this.nodes[id].material;
        let textureAux  = this.nodes[id].texture  === 'null' ? texParent : this.nodes[id].texture;
        if (id !== this.idRoot) {

            if (this.materials[materialAux] != undefined)
            {
                if (textureAux == 'clear') {
                    textureAux = null;
                }

                this.materials[materialAux].setTexture(this.textures[textureAux]);
                this.materials[materialAux].setTextureWrap("REPEAT", "REPEAT");
                this.materials[materialAux].apply();
            }
        }

        for (var x = 0; x < this.nodes[id].primitives.length; x++) {
            this.nodes[id].primitives[x].display();
        }

        for (var x = 0; x < this.nodes[id].descendants.length; x++) {
            this.processNode(this.nodes[id].descendants[x], materialAux, textureAux);
        }

        this.scene.popMatrix();

    }
}