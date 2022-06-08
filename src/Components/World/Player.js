import { AnimationMixer } from "three";
import Maze from "../Maze";

export default class Player {
    constructor()
    {
        this.maze = new Maze()
        this.scene = this.maze.scene
        this.resources = this.maze.resources
        this.time = this.maze.time
        

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resources.items.PlayerModel
        this.model.scale.set(0.005,0.005,0.005)
        
        this.scene.add(this.model)

        console.log(this.model);

        for(let child of this.model.children)
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
        this.animation.mixer = new AnimationMixer(this.model)

        this.animation.actions = {}

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resources.items.IdleAnimation.animations[0])
        this.animation.actions.walk = this.animation.mixer.clipAction(this.resources.items.WalkAnimation.animations[0])
        this.animation.actions.run = this.animation.mixer.clipAction(this.resources.items.RunAnimation.animations[0])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.actions.current.play = (name) => {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)
            
            this.animation.actions.current = newAction
        }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}