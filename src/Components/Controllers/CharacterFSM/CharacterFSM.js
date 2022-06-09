import { FiniteStateMachine } from '../../Utils/FiniteStateMachine'
import { IdleState, JumpState, RunState, WalkState } from './States'

export default class CharacterFSM extends FiniteStateMachine {
    constructor(animation)
    {
        super()

        this.animation = animation
        
        this.AddStates()        
    }

    AddStates()
    {
        this.AddState('idle', IdleState )
        this.AddState('walk', WalkState )
        this.AddState('run', RunState )
        this.AddState('jump', JumpState )
    }
}