import { sRGBEncoding } from "three"
import { MeshStandardMaterial } from "three"
import { DirectionalLightHelper } from "three"
import { AmbientLight } from "three"
import { Mesh } from "three"
import { DirectionalLight } from "three"
import Game from "../Game"


export default class Environment {

    constructor()
    {
        this.game = new Game()
        this.scene = this.game.scene
        this.resources = this.game.resources

        this.setAmbientLight()
        this.setSunLight()
        this.setEnvironmentMap()
    }

    setAmbientLight()
    {
        this.ambientLight = new AmbientLight(0xFFFFFF)
        this.scene.add(this.ambientLight)
    }

    setSunLight()
    {
        this.sunlight = new DirectionalLight(0xFFFFFF,3)
        this.sunlight.position.set(-5,10,10)
        this.sunlight.target.position.set(0,0,0)
        this.sunlight.castShadow = true
        this.sunlight.shadow.mapSize.set = (2048,2048)
        this.sunlight.shadow.camera.near = 1.0
        this.sunlight.shadow.camera.far = 500
        // this.sunlight.shadow.bias = 0.2

        this.scene.add(this.sunlight)

        this.helper = new DirectionalLightHelper(this.sunlight)
        this.scene.add(this.helper)
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.resources.items.envMap_texture
        this.environmentMap.texture.encoding = sRGBEncoding

        this.scene.environment = this.environmentMap.texture
        this.scene.background = this.environmentMap.texture

        this.setEnvironmentMap.updateMaterial = () => {
            this.scene.traverse((child) => {
                if(child instanceof Mesh && child.material instanceof MeshStandardMaterial )
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }

        this.setEnvironmentMap.updateMaterial()
    }
}