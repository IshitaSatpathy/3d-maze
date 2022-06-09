class FiniteStateMachine {

    constructor()
    {
        // States
        this.states = {}
        this.currentState = null

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



class State {
    constructor(parent)
    {
        this.parent = parent
    }

    enter() {}
    exit() {}
    update() {}
}

export {
    FiniteStateMachine,
    State,
}