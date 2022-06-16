import { Scene } from "three"
import sources from "../sources"
import Camera from "./Camera/Camera"
import Physics from "./Physics/Physics"
import Renderer from "./Renderer"
import Resources from "./Utils/Resources"
import Screen from "./Utils/Screen"
import Time from "./Utils/Time"
import World from "./World/World"

let instance = null

export default class Game {

    constructor(canvas)
    {
        if(instance)
            return instance

        instance = this

        // Options
        this.canvas = canvas

        // Setup
        this.screen = new Screen()
        this.time = new Time()
        this.scene = new Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        
        this.renderer = new Renderer()
        this.world = new World()
        this.physics = new Physics().world
        this.timeStep = 1/60
        
        // Resize event
        this.screen.on('resize', () => {
            this.resize()
        })

        // Update event
        this.time.on('tick', () => {
            this.update()
        })
    }

    
    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.physics.step(this.timeStep)
        this.renderer.update()
    }
}