import { BoxGeometry } from "three"
import { MeshStandardMaterial } from "three"
import { Mesh } from "three"
import CharacterController from "../Controllers/CharacterController"
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
        this.camera = this.maze.camera

        // const testMesh = new Mesh(
        //     new BoxGeometry(1,1,1),
        //     new MeshStandardMaterial()
        // )
        // this.scene.add(testMesh)


        this.resources.on('ready', () => {
            
            // Setup
            this.floor = new Floor()
            
            // this.player = new Player()
            this.character = new CharacterController()

            this.environment = new Environment()
        })
    }

    
    update()
    {
        // if(this.player)
        //     this.player.update()

        if(this.character)
        {
            this.character.update()
            this.camera.instance.lookAt(this.character.model.position)
        }

    }
}