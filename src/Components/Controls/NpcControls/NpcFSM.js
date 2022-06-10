import FiniteStateMachine from '../../Utils/FiniteStateMachine'
import { IdleState } from './States'

export default class NpcFSM extends FiniteStateMachine {
    constructor(animation)
    {
        super()

        this.animation = animation
        
        this.AddStates()        
    }

    AddStates()
    {
        this.AddState('idle', IdleState )
    }
}