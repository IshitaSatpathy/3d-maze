import FiniteStateMachine from '../../Utils/FiniteStateMachine'
import { IdleState, WalkState, AttackState, DeathState } from './States'

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
        this.AddState('walk', WalkState )
        this.AddState('attack', AttackState )
        this.AddState('death', DeathState )
    }
}