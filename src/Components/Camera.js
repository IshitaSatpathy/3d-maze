import { PerspectiveCamera } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Maze from "./Maze";

export default class Camera {
    constructor()
    {
        this.maze = new Maze()
        this.screen = this.maze.screen
        this.scene = this.maze.scene
        this.canvas = this.maze.canvas
        
        this.setInstance()
        this.setOrbitControls()
    }

    setInstance()
    {
        this.instance = new PerspectiveCamera(
            35,
            this.screen.width /this.screen.height, 
            0.1,
            100
        )

        this.instance.position.set(-1.76,0.71,1.22)
        this.scene.add(this.instance)
    }

    setOrbitControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.screen.width/ this.screen.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}