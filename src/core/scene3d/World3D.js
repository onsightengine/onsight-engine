import { MathUtils } from '../../utils/MathUtils.js';
import { Scene3D } from './Scene3D.js';

/** Holds a collection of scenes */
class World3D {

    constructor(name = 'World 1') {

        // Prototype
        this.isWorld = true;
        this.isWorld3D = true;

        // Properties, Basic
        this.name = name;
        this.type = 'World3D';
        this.uuid = MathUtils.uuid();

        // Properties, More
        this.order = 0;
        this.startScene = null;

        // Collections
        this.scenes = {};

    }

    /******************** SCENE */

    addScene(scene) {
        if (scene && scene.type === 'Scene3D') {
            if (this.scenes[scene.uuid]) {
                console.warn(`World3D.addScene: Scene ('${scene.name}') already added`, scene);
            } else {
                scene.world = this;
                this.scenes[scene.uuid] = scene;
                if (!this.startScene) this.startScene = scene.uuid;
            }
        } else {
            console.error(`'World3D.addScene: Scene not of type 'Scene3D'`, scene);
        }

        return this;
    }

    getFirstScene() {
        const sceneList = Object.keys(this.scenes);
        return (sceneList.length > 0) ? this.scenes[sceneList[0]] : null;
    }

    getScenes() {
        return this.scenes;
    }

    getSceneByName(name) {
        return this.getSceneByProperty('name', name);
    }

    getSceneByUuid(uuid) {
        return this.scenes[uuid];
    }

    getSceneByProperty(property, value) {
        for (const uuid in this.scenes) {
            const scene = this.scenes[uuid];
            if (scene[property] === value) return scene;
        }
    }

    removeScene(scene) {
        if (scene.isScene !== true) return;

        // Clear Entities
        const entities = scene.getEntities();
        for (let i = entities.length - 1; i >= 0; i--) {
            scene.removeEntity(entities[i], true);
            entities[i].dispose();
        }

        // Remove from 'scenes'
        scene.dispose();
        delete this.scenes[scene.uuid];
    }

    traverseScenes(callback) {
        for (let uuid in this.scenes) {
            const scene = this.scenes[uuid];
            scene.traverseEntities(callback);
        }
    }

    /******************** JSON */

    fromJSON(json) {
        const data = json.object;

        this.name = data.name;
        this.uuid = data.uuid;

        this.order = data.order;
        this.startScene = data.startScene;

        // Scenes
        for (let i = 0; i < json.scenes.length; i++) {
            switch (json.scenes[i].object.type) {
                case 'Scene3D': this.addScene(new Scene3D().fromJSON(json.scenes[i])); break;
            }
        }

        return this;
    }

    toJSON() {
        const json = {
            object: {
                name: this.name,
                type: this.type,
                uuid: this.uuid,

                order: this.order,
                startScene: this.startScene,
            }
        };

        // Scenes
        for (const uuid in this.scenes) {
            const scene = this.scenes[uuid];
            json.scenes.push(scene.toJSON());
        }

        return json;
    }

}

export { World3D };
