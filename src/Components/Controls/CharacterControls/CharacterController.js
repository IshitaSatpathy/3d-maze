import Game from "../../Game"
import CharacterFSM from "./CharacterFSM"
import { AnimationMixer, Quaternion, Vector3 } from "three"
import { SkeletonHelper } from "three"
import CharacterInput from "./CharacterInput"
import CANNON from "cannon"

export default class CharacterController {

    constructor(file)
    {
        this.file = file
        
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.time = this.game.time
        this.physics = this.game.physics

        // Setup
        this.acceleration = new Vector3(1.0, 0.25, 1.0)
        this.deceleration = new Vector3(-0.0005, -0.0001, -5.0)
        this.velocity = new Vector3(0,0,0)     
        
        this.input = new CharacterInput()

        this.setMesh()
        this.setAnimation()
        this.setBody()

        this.helper = new SkeletonHelper(this.mesh)
        this.scene.add(this.helper)

        this.stateMachine = new CharacterFSM(this.animation)
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
        this.animation.actions.run = this.animation.mixer.clipAction(this.resources.items.Player_Run.animations[0])
        this.animation.actions.jump = this.animation.mixer.clipAction(this.resources.items.Player_Jump.animations[0])

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

    setBody()
    {
        const width = 1
        const height = 1
        const depth = 1
        const position = {x:0, y:0, z:0}

        const shape = new CANNON.Box(new CANNON.Vec3(width * 0.5, height * 0.5, depth * 0.5))

        const body = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, 3, 0),
            shape: shape,
            material: this.physics.defaultContactMaterial
        })
        body.position.copy(position)
        // body.addEventListener('collide', playHitSound)

        this.physics.addBody(body)

        this.body = body
    }

    setMovement()
    { 
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

        const acc = this.acceleration.clone()
        
        // Update Keys
        if (this.input.keys.shift) {
            acc.multiplyScalar(3.5)
            acc.y = 0.3
          }
      
        if (this.stateMachine.currentState && this.stateMachine.currentState.Name == 'jump') {
            acc.multiplyScalar(0.0)
            acc.y = 0
        }
        
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
            /*
            .vmult() for CANNON
            .multiply() for THREE
            */
        }

        if (this.input.keys.right) {
            A.set(0, 1, 0)
            Q.setFromAxisAngle(A, 4.0 * -Math.PI * this.time.delta * acc.y * 0.001)
            R.multiply(Q)
            /*
            .vmult() for CANNON
            .multiply() for THREE
            */
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
        /*
        .vadd() for CANNON
        .add() for THREE
        */

        oldPosition.copy(controlObject.position)

        // this.mesh.position.copy(this.body.position)
        // this.mesh.quaternion.copy(this.body.quaternion)
    }

    update()
    {
        if(!this.mesh && !this.body)
            return

        this.stateMachine.update(this.input)
        
        this.setMovement()

        if(this.animation.mixer)
            this.animation.mixer.update(this.time.delta * 0.001)

    }

}