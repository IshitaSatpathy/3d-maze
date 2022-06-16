import { PerspectiveCamera } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Game from "../Game";

export default class Camera {
    constructor()
    {
        this.game = new Game()
        this.screen = this.game.screen
        this.scene = this.game.scene
        this.canvas = this.game.canvas
        
        this.setInstance()
        // this.setOrbitControls()
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(
            35,
            this.screen.width /this.screen.height, 
            0.1,
            100
        )

        this.instance.position.set(-3,1.5,4)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.orbitControls = new OrbitControls(this.instance, this.canvas)
        this.orbitControls.enableDamping = true
        this.orbitControls.enabled = true
    }

    resize()
    {
        this.instance.aspect = this.screen.width/ this.screen.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if(this.orbitControls) this.orbitControls.update()
    }
}