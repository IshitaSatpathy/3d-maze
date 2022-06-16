import { Vector3 } from "three"
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls"
import Game from "../../Game"
import FPInput from "./FPInput"

export default class FPController {
    constructor()
    {
        this.game = new Game()
        this.canvas = this.game.canvas
        this.time = this.game.time

        this.camera = this.game.camera
        this.instance = this.camera.instance

        this.fpControls = new PointerLockControls(this.instance,this.canvas)
        this.fpControls.maxPolarAngle = Math.PI * 0.65
        this.fpControls.minPolarAngle = Math.PI * 0.25
        this.input = new FPInput()

        this.acc = new Vector3(0,-9.81,0)
        this.velocity = new Vector3(1, 0, 1)
    }

    setMovement()
    {
        const v = this.velocity

        const frame_delta = this.time.delta * 0.005
        this.fpControls.pointerSpeed = 5 * frame_delta

        {this.input.keys.forward && this.fpControls.moveForward(v.z * frame_delta)}
        {this.input.keys.backward && this.fpControls.moveForward(-v.z * frame_delta)}
        {this.input.keys.right && this.fpControls.moveRight(v.x * frame_delta)}
        {this.input.keys.left && this.fpControls.moveRight(-v.x * frame_delta)}
    }

    update()
    {
        if(this.input.keys.leftMouse) this.fpControls.lock()
        if(this.fpControls.isLocked) this.setMovement()
    }
}