import CharacterController from "../Controls/CharacterControls/CharacterController"
import NpcController from "../Controls/NpcControls/NpcController"
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
            
            this.character = new CharacterController('Player_model')
            this.thirdPersonCamera = new ThirdPersonCamera(this.character)
            // this.firstPersonCamera = new FirstPersonCamera(this.camera)

            this.enemy = new NpcController('NPC_model')

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

        if(this.enemy)
        {
            this.enemy.model.lookAt(this.character.model.position)

            if(this.enemy.model.position.distanceTo(this.character.model.position) <= 1)
            {
                this.enemy.setMovement(false)
            }
            else
            {
                this.enemy.setMovement(true)
            }

            this.enemy.update()
        }

        // if(this.firstPersonCamera)
        // {
        //     this.firstPersonCamera.update()
        // }

    }
}