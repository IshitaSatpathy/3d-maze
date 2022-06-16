import { sRGBEncoding } from "three";
import { MeshStandardMaterial } from "three";
import { Mesh } from "three";
import { RepeatWrapping } from "three";
import { PlaneGeometry } from "three";
import CANNON from "cannon";
import Game from "../Game";

export default class Floor {
    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources
        this.physics = this.game.physics

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
        this.setBody()
    }

    setGeometry()
    {
        this.geometry = new PlaneGeometry(50,50)
    }
    
    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.Plane_albedo
        this.textures.color.encoding = sRGBEncoding
        this.textures.color.repeat.set = (1.5,1.5)
        this.textures.color.wrapS = RepeatWrapping
        this.textures.color.wrapT = RepeatWrapping
        
        this.textures.normal = this.resources.items.Plane_normal
        this.textures.normal.repeat.set = (1.5,1.5)
        this.textures.normal.wrapS = RepeatWrapping
        this.textures.normal.wrapT = RepeatWrapping
    }
    
    setMaterial()
    {
        this.material = new MeshStandardMaterial({
            // map : this.textures.color,
            // normalMap : this.textures.normal,
            color: '#333333',
            roughness: 0.6,
        })
    }
    
    setMesh()
    {
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.rotation.x = -Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    setBody()
    {
        const floorShape = new CANNON.Plane()
        const floorBody = new CANNON.Body()

        floorBody.mass = 0
        floorBody.addShape(floorShape)
        floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5)

        this.physics.addBody(floorBody)

        this.body = floorBody
        this.body.material = this.physics.defaultContactMaterial
    }
}