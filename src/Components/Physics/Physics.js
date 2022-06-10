import CANNON from "cannon";

export default class Physics {
    constructor()
    {
        this.world = new CANNON.World()
        
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)
        this.world.allowSleep = true
        this.world.gravity.set(0, - 9.82, 0)

        this.world.defaultContactMaterial = new CANNON.ContactMaterial(
            new CANNON.Material('default'),
            new CANNON.Material('default'),
            {
                friction: 0.1,
                restitution: 0.7
            }
        )
    }
}