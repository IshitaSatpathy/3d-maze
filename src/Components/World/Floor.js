import { sRGBEncoding } from "three";
import { MeshStandardMaterial } from "three";
import { Mesh } from "three";
import { RepeatWrapping } from "three";
import { PlaneGeometry } from "three";
import Maze from "../Maze";

export default class Floor {
    constructor()
    {
        this.maze = new Maze()
        this.scene = this.maze.scene
        this.resources = this.maze.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.geometry = new PlaneGeometry(50,50)
    }
    
    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.floorColorTexture
        this.textures.color.encoding = sRGBEncoding
        this.textures.color.repeat.set = (1.5,1.5)
        this.textures.color.wrapS = RepeatWrapping
        this.textures.color.wrapT = RepeatWrapping
        
        this.textures.normal = this.resources.items.floorNormalTexture
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
}