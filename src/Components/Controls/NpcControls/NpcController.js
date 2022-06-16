import NpcFSM from "./NpcFSM"
import { AnimationMixer, Quaternion, Vector3 } from "three"
import { SkeletonHelper } from "three"
import NpcInput from "./NpcInput"
import Game from "../../Game"

export default class NpcController {

    constructor(file)
    {
        this.file = file
        
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.time = this.game.time

        // Setup
        this.acceleration = new Vector3(1.0, 0.25, 1.0)
        this.deceleration = new Vector3(-0.0005, -0.0001, -5.0)
        this.velocity = new Vector3(0,0,0)     
        
        this.input = new NpcInput()

        this.setMesh()
        this.setAnimation()

        this.helper = new SkeletonHelper(this.mesh)
        this.scene.add(this.helper)

        this.stateMachine = new NpcFSM(this.animation)
    }

    setMesh()
    {
        this.mesh = this.resources.items[this.file]
        this.mesh.scale.set(0.01,0.01,0.01)
        
        this.scene.add(this.mesh)

        for(let child of this.mesh.children)
        {
            if(child.material)
            {
                child.castShadow = true
                child.receiveShadow = true
            }
        }
        
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new AnimationMixer(this.mesh)

        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resources.items.Player_Idle.animations[0])
        this.animation.actions.walk = this.animation.mixer.clipAction(this.resources.items.Player_Walk.animations[0])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // this.animation.actions.current.play = (name) => {
        //     const newAction = this.animation.actions[name]
        //     const oldAction = this.animation.actions.current

        //     newAction.reset()
        //     newAction.play()
        //     newAction.crossFadeFrom(oldAction, 0.5)
            
        //     this.animation.actions.current = newAction
        // }
    }

    setMovement(move)
    { 
        // const dirToPlayer = this.FindPlayer()

        const v = this.velocity

        const FrameDeceleration = new Vector3(
            v.x * this.deceleration.x,
            v.y * this.deceleration.y,
            v.z * this.deceleration.z,
        )
        FrameDeceleration.multiplyScalar(this.time.delta)
        FrameDeceleration.z = Math.sign(FrameDeceleration.z) * Math.min( Math.abs(FrameDeceleration.z), Math.abs(v.z) )

        v.add(FrameDeceleration)

        const controlObject = this.mesh

        const Q = new Quaternion()
        const A = new Vector3()
        const R = controlObject.quaternion.clone()

        // this.input.keys.forward = false

        const acc = this.acceleration.clone()
        
        // Update Movement
        // if (this.input.keys.shift) {
        //     acc.multiplyScalar(3.5)
        //     acc.y = 0.3
        //   }
      
        // if (this.stateMachine.currentState && this.stateMachine.currentState.Name == 'jump') {
        //     acc.multiplyScalar(0.0)
        //     acc.y = 0
        // }
        
        this.input.keys.forward = move
        // Forward and Backward
        if (this.input.keys.forward) {
            v.z += acc.z * this.time.delta * 0.0001
        }

        if (this.input.keys.backward) {
            v.z -= acc.z * this.time.delta * 0.0001
        }

        // Rotation
        if (this.input.keys.left) {
            A.set(0, 1, 0)
            Q.setFromAxisAngle(A, 4.0 * Math.PI * this.time.delta * acc.y * 0.001)
            R.multiply(Q)
        }

        if (this.input.keys.right) {
            A.set(0, 1, 0)
            Q.setFromAxisAngle(A, 4.0 * -Math.PI * this.time.delta * acc.y * 0.001)
            R.multiply(Q)
        }
          
        controlObject.quaternion.copy(R)

        // Update Position
        const oldPosition = new Vector3()

        oldPosition.copy(controlObject.position)

        const forward = new Vector3(0, 0, 1)
        forward.applyQuaternion(controlObject.quaternion)
        forward.normalize()

        const sideways = new Vector3(1, 0, 0)
        sideways.applyQuaternion(controlObject.quaternion)
        sideways.normalize()

        sideways.multiplyScalar(v.x * this.time.delta)
        forward.multiplyScalar(v.z * this.time.delta)

        controlObject.position.add(forward)
        controlObject.position.add(sideways)

        oldPosition.copy(controlObject.position)
    }

    update(prop)
    {
        if(!this.mesh)
            return

        this.stateMachine.update(this.input)
        
        this.setMovement(prop)

        if(this.animation.mixer)
            this.animation.mixer.update(this.time.delta * 0.001)
    }

}