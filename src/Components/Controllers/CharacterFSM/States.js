import { LoopOnce } from "three"
import { State } from "../../Utils/FiniteStateMachine"


class IdleState extends State
{
    constructor(parent)
    {
        super(parent)
    }

    get Name(){
        return 'idle'
    }

    enter(prevState) {
        const idleAction = this.parent.animation.actions.idle
        
        if (prevState)
        {
            const prevAction = this.parent.animation.actions[prevState.Name];
            idleAction.time = 0.0;
            idleAction.enabled = true;
            idleAction.setEffectiveTimeScale(1.0);
            idleAction.setEffectiveWeight(1.0);
            idleAction.crossFadeFrom(prevAction, 0.5, true);
            idleAction.play();
        }
        else
            idleAction.play();
    }

    exit() {}

    update(input)
    {
        if (input.keys.forward || input.keys.backward)
            this.parent.SetState('jump')
        
        else if (input.keys.space)
            this.parent.SetState('walk')
    }
}



class WalkState extends State
{
    constructor(parent)
    {
        super(parent)
    }

    get Name(){
        return 'walk'
    }

    enter(prevState) {
        const curAction = this.parent.animation.actions.walk

        if (prevState)
        {
            const prevAction = this.parent.animation.actions[prevState.Name]

            curAction.enabled = true

            if (prevState.Name == 'run')
            {
                const ratio = curAction.getClip().duration / prevAction.getClip().duration
                curAction.time = prevAction.time * ratio
            }

            else
            {
                curAction.time = 0.0
                curAction.setEffectiveTimeScale(1.0)
                curAction.setEffectiveWeight(1.0)
            }

            curAction.crossFadeFrom(prevAction, 0.5, true)
            curAction.play()
        }
            
        else
            curAction.play()
    }

    exit() {}

    update(input)
    {
        if (input.keys.forward || input.keys.backward)
        {
            if (input.keys.shift)
                this.parent.SetState('run')

            return
        }
    
        this.parent.SetState('idle')
    }
}



class RunState extends State
{
    constructor(parent)
    {
        super(parent)
    }

    get Name(){
        return 'run'
    }

    enter(prevState) {
        const curAction = this.parent.animation.actions.run
        if (prevState)
        {
            const prevAction = this.parent.animation.actions[prevState.Name]

            curAction.enabled = true;

            if (prevState.Name == 'walk')
            {
                const ratio = curAction.getClip().duration / prevAction.getClip().duration;
                curAction.time = prevAction.time * ratio;
            }
            else
            {
                curAction.time = 0.0;
                curAction.setEffectiveTimeScale(1.0);
                curAction.setEffectiveWeight(1.0);
            }

            curAction.crossFadeFrom(prevAction, 0.5, true);
            curAction.play();
        } 
        else
            curAction.play()
    }

    exit() {}

    update(input)
    {
        if (input.keys.forward || input.keys.backward)
        {
            if (!input.keys.shift)
                this.parent.SetState('walk')
                
            return
        }

        this.parent.SetState('idle')
    }
}

class JumpState extends State
{
    constructor(parent)
    {
        super(parent)
    
        this.FinishedCallback = () => {
            this.Finished()
        }
    }
    
    get Name() {
        return 'jump'
    }
    
    enter(prevState) {

        this.parent.animation.mixer.addEventListener('finished', this.FinishedCallback)
        const curAction = this.parent.animation.actions.jump
    
        if (prevState)
        {
            const prevAction = this.parent.animation.actions[prevState.Name]

            curAction.reset()
            curAction.setLoop(LoopOnce, 1)
            curAction.clampWhenFinished = true
            curAction.crossFadeFrom(prevAction, 0.5, true)
            curAction.play()
        }
        else
            curAction.play()
    }
    
    Finished() {
        this.Cleanup()
        this.parent.SetState('idle')
    }
    
    Cleanup() {        
        this.parent.animation.mixer.removeEventListener('finished', this.CleanupCallback)
    }
    
    exit() {
        this.Cleanup()
    }
    
    update(input) {
    }
}

export {
    IdleState,
    WalkState,
    RunState,
    JumpState,
}