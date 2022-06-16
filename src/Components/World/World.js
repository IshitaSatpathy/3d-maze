import CharacterController from "../Controls/CharacterControls/CharacterController"
import FPController from "../Controls/FPControls/FPController"
import NpcController from "../Controls/NpcControls/NpcController"
import FirstPersonCamera from "../Camera/FirstPersonCamera"
import Game from "../Game"
import ThirdPersonCamera from "../Camera/ThirdPersonCamera"
import Environment from "./Environment"
import Floor from "./Floor"
export default class World {
    
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.camera = this.game.camera


        this.resources.on('ready', () => {
            
            // Setup
            this.floor = new Floor()
            
            // this.player = new CharacterController('Player_model')
            // this.enemy = new NpcController('NPC_model')
            
            // this.thirdPersonCamera = new ThirdPersonCamera(this.player)
            // this.firstPersonCamera = new FirstPersonCamera(this.camera)

            this.fp = new FPController()

            this.environment = new Environment()
        })
    }

    
    update()
    {
        if(this.player) this.player.update()
        if(this.firstPersonCamera) this.firstPersonCamera.update()
        if(this.thirdPersonCamera) this.thirdPersonCamera.update()
        if(this.fp) this.fp.update()

        if(this.enemy)
        {
            this.enemy.mesh.lookAt(this.character.mesh.position)

            if(this.enemy.mesh.position.distanceTo(this.character.mesh.position) <= 1)
                this.enemy.setMovement(false)
            else
                this.enemy.setMovement(true)
            

            this.enemy.update()
        }
    }
}