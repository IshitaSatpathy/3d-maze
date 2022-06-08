import { BoxGeometry } from "three"
import { MeshStandardMaterial } from "three"
import { Mesh } from "three"
import Maze from "../Maze"
import Environment from "./Environment"
import Floor from "./Floor"
import Player from "./Player"

export default class World {
    
    constructor()
    {
        this.maze = new Maze()
        this.scene = this.maze.scene
        this.resources = this.maze.resources

        // const testMesh = new Mesh(
        //     new BoxGeometry(1,1,1),
        //     new MeshStandardMaterial()
        // )
        // this.scene.add(testMesh)

        this.resources.on('ready', () => {
            
            // Setup
            this.floor = new Floor()
            this.player = new Player()
            this.environment = new Environment()
        })
    }

    
    update()
    {
        if(this.player)
            this.player.update()
    }
}