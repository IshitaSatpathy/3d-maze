import { IdleState } from "../Controls/CharacterControls/States"

export default class FiniteStateMachine {

    constructor()
    {
        // States
        this.states = {}
        this.currentState = new IdleState(this)

    }
    
    AddState(name, type)
    {
        this.states[name] = type
    }

    SetState(name) {
        const prevState = this.currentState
        
        if(prevState)
        { 
          if (prevState.Name == name)
            return

          prevState.exit()
        }
    
        const state = new this.states[name](this)
    
        this.currentState = state
        state.enter(prevState)
    }


    update(input)
    {
        if(this.currentState)
            this.currentState.update(input)
    }
}