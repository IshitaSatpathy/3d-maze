import CharacterController from "../Controls/CharacterControls/CharacterController"
import FirstPersonCamera from "../FirstPersonCamera"
import Maze from "../Maze"
import ThirdPersonCamera from "../ThirdPersonCamera"
import Environment from "./Environment"
import Floor from "./Floor"
export default class World {
    
    constructor()
    {
        this.maze = new Maze()
        this.scene = this.maze.scene
        this.resources = this.maze.resources
        this.camera = this.maze.camera


        this.resources.on('ready', () => {
            
            // Setup
            this.floor = new Floor()
            
            this.character = new CharacterController('PlayerModel')
            this.thirdPersonCamera = new ThirdPersonCamera(this.character)
            // this.firstPersonCamera = new FirstPersonCamera(this.camera)

            this.environment = new Environment()
        })
    }

    
    update()
    {
        if(this.character)
        {
            this.character.update()
            this.thirdPersonCamera.update()
        }

        // if(this.firstPersonCamera)
        // {
        //     this.firstPersonCamera.update()
        // }

    }
}