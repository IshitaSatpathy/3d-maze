import { Vector3 } from "three"
import Maze from "./Maze"

export default class ThirdPersonCamera {

    constructor(target)
    {

        this.maze = new Maze()
        this.time = this.maze.time
        this.camera = this.maze.camera

        this.target = target

        this.currentPosition = new Vector3()
        this.currentLookat = new Vector3()
    }

    CalculateIdealOffset() {
        const idealOffset = new Vector3(-0.5, 1.5, -2)

        idealOffset.applyQuaternion(this.target.model.quaternion)
        idealOffset.add(this.target.model.position)

        return idealOffset
    }

    CalculateIdealLookat() {
        const idealLookat = new Vector3(0, 3, 20)

        idealLookat.applyQuaternion(this.target.model.quaternion)
        idealLookat.add(this.target.model.position)

        return idealLookat
    }

    update()
    {
        const idealOffset = this.CalculateIdealOffset()
        const idealLookat = this.CalculateIdealLookat()

        let t = 1.0 - Math.pow(0.01, this.time.delta * 0.001)

        if(this.target.stateMachine.currentState && this.target.stateMachine.currentState.Name == 'run')
            t *= 2

        this.currentPosition.lerp(idealOffset, t)
        this.currentLookat.lerp(idealLookat, t)

        this.camera.instance.position.copy(this.currentPosition)
        this.camera.instance.lookAt(this.currentLookat)
    }
}