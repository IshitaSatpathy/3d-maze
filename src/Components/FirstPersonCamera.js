import { Quaternion } from "three"
import { MathUtils } from "three"
import { Vector3 } from "three"
import CharacterInput from "./Controllers/CharacterInput"
import Maze from "./Maze"

export default class FirstPersonCamera {

    constructor(camera)
    {
        this.maze = new Maze()
        this.time = this.maze.time
        this.screen = this.maze.screen
        this.camera = camera
        this.instance = this.camera.instance

        this.input = new CharacterInput()

        this.currentRotation = new Quaternion()
        this.currentPosition = new Vector3(0, 2, 0)

        this.phi = 0
        this.phiSpeed = 8

        this.theta = 0
        this.thetaSpeed = 5
        
        this.headBobActive = false
        this.headBobTimer = 0
    }

    updateCamera()
    {
        this.instance.quaternion.copy(this.currentRotation)
        this.instance.position.copy(this.currentPosition)
        this.instance.position.y += Math.sin(this.headBobTimer * 10) * 0.02
    
        // const forward = new Vector3(0, 0, -1)
        // forward.applyQuaternion(this.currentRotation)
    
        // const dir = forward.clone()
    
        // forward.multiplyScalar(100)
        // forward.add(this.currentPosition)
    
        // let closest = forward
        // const result = new Vector3()
        // const ray = new Ray(this.currentPosition, dir)
        // for (let i = 0 i < this.objects.length ++i) {
        //   if (ray.intersectBox(this.objects[i], result)) {
        //     if (result.distanceTo(ray.origin) < closest.distanceTo(ray.origin)) {
        //       closest = result.clone()
        //     }
        //   }
        // }
    
        // this.instance.lookAt(closest)
      }
    
    updateHeadBob()
    {

        if (this.headBobActive)
        {
            const wavelength = Math.PI
            const nextStep = 1 + Math.floor(((this.headBobTimer + 0.000001) * 10) / wavelength)
            const nextStepTime = nextStep * wavelength / 10
            this.headBobTimer = Math.min(this.headBobTimer + this.time.delta * 0.002, nextStepTime)

            if (this.headBobTimer == nextStepTime)
                this.headBobActive = false
        }
    }
    
    updatecurrentPosition()
    {
        const forwardVelocity = (this.input.keys.forward ? 1 : 0) + (this.input.keys.backward ? -1 : 0)
        const strafeVelocity = (this.input.keys.left ? 1 : 0) + (this.input.keys.right ? -1 : 0)

        const qx = new Quaternion()
        qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi)

        const forward = new Vector3(0, 0, -1)
        forward.applyQuaternion(qx)
        forward.multiplyScalar(forwardVelocity * this.time.delta * 0.01)

        const left = new Vector3(-1, 0, 0)
        left.applyQuaternion(qx)
        left.multiplyScalar(strafeVelocity * this.time.delta * 0.01)

        this.currentPosition.add(forward)
        this.currentPosition.add(left)

        if (forwardVelocity != 0 || strafeVelocity != 0)
            this.headBobActive = true
    }
    
    updatecurrentRotation()
    {
        const xh = this.input.keys.mouseX_delta / this.screen.width
        const yh = this.input.keys.mouseY_delta / this.screen.height

        this.phi += -xh * this.phiSpeed
        this.theta = MathUtils.clamp(this.theta + -yh * this.thetaSpeed, -Math.PI / 3, Math.PI / 3)

        const qx = new Quaternion()
        qx.setFromAxisAngle(new Vector3(0, 1, 0), this.phi)

        const qz = new Quaternion()
        qz.setFromAxisAngle(new Vector3(1, 0, 0), this.theta)

        const q = new Quaternion()
        q.multiply(qx)
        q.multiply(qz)

        this.currentRotation.copy(q)
    }


    update()
    {
        if(!this.instance)
            return
        
        

        this.input.update()

        this.updatecurrentRotation()
        this.updateCamera()
        this.updatecurrentPosition()
        this.updateHeadBob()
    }
}