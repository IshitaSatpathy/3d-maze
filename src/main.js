import { BoxBufferGeometry } from 'three'
import { MeshStandardMaterial } from 'three'
import { Mesh } from 'three'
import './assets/style.css'
import Maze from './Components/Maze'

const maze = new Maze(document.querySelector('canvas.webgl'))


const CreateWall = (length , rotate , position) => {

    const mesh = new Mesh(
        new BoxBufferGeometry(length, 5, 0.2 , 3,3,3),
        new MeshStandardMaterial({
            metalness : 0.3,
            roughness : 0.4,
        })
    )
    mesh.receiveShadow = true
    mesh.position.copy(position)
    maze.scene.add(mesh)

    
    // const shape = new CANNON.Box(new CANNON.Vec3(length*0.5, 2*0.5, 0.2*0.5))
    // const body = new CANNON.Body({
    //     mass : 0,
    //     shape : shape,
    //     material : defaultMaterial
    // })
    // body.position.copy(position)
    // world.addBody(body)

    
    if(rotate)
    {
        // body.quaternion.setFromAxisAngle(new CANNON.Vec3(0,1,0) , Math.PI * 0.5) 
        // mesh.quaternion.copy(body.quaternion)

        mesh.rotation.y = Math.PI * 0.5
    }


}

// Border Walls
CreateWall( 20 , false , { x : 0, y : 1, z : 10})
CreateWall( 20 , true , { x : -10, y : 1, z : 0})
CreateWall( 24 , true , { x : 10, y : 1, z : -2})

//---------------Custom Maze---------------//
CreateWall( 8 , false , { x : 6, y : 1, z : -6})
CreateWall( 8 , true , { x : 2, y : 1, z : -2})
CreateWall( 8 , false , { x : -2, y : 1, z : 2})

CreateWall( 4 , false , { x : 8, y : 1, z : -2})
CreateWall( 8 , true , { x : 6, y : 1, z : 2})


CreateWall( 8 , false , { x : -6, y : 1, z : -6})
CreateWall( 4 , true , { x : -2, y : 1, z : -4})
CreateWall( 4 , false , { x : -4, y : 1, z : -2})

CreateWall( 4 , false , { x : 0, y : 1, z : 6})
CreateWall( 4 , true , { x : -2, y : 1, z : 8})

CreateWall( 4 , false , { x : -8, y : 1, z : 6})
CreateWall( 4 , false , { x : -8, y : 1, z : -10})
CreateWall( 4 , false , { x : -1, y : 1, z : -10})
CreateWall( 4 , false , { x : 3, y : 1, z : -10})
CreateWall( 4 , false , { x : 5, y : 1, z : -10})
CreateWall( 4 , true , { x : -6, y : 1, z : -12})
CreateWall( 8 , false , { x : -10, y : 1, z : -14})
CreateWall( 4 , true , { x : -14, y : 1, z : -12})
CreateWall( 10 , true , { x : -14, y : 1, z : -9})
CreateWall( 10 , true , { x : -14, y : 1, z : 1})
CreateWall( 4 , false , { x : -16, y : 1, z : 6})
CreateWall( 4 , false , { x : -16, y : 1, z : 10})
CreateWall( 6 , true , { x : -14, y : 1, z : 13})
CreateWall( 28 , false , { x : 0, y : 1, z : 16})
CreateWall( 34 , true , { x : 14, y : 1, z : -1})
CreateWall( 36 , false , { x : -4, y : 1, z : -18})
CreateWall( 20 , true , { x : -18, y : 1, z : -4})
CreateWall( 24 , true , { x : -22, y : 1, z : -6})
CreateWall( 4 , true , { x : -3, y : 1, z : -11.9})
CreateWall( 12.5 , false , { x : 3.2, y : 1, z : -14})


CreateWall( 44 , false , { x : -4, y : 1, z : 20})
CreateWall( 48 , true , { x : 18, y : 1, z : -4})
CreateWall( 44 , false , { x : -4, y : 1, z : -28})
CreateWall( 30 , false , { x : -4, y : 1, z : -23})
CreateWall( 5 , true , { x : 11, y : 1, z : -20.5})
CreateWall( 40 , true , { x : -25, y : 1, z : -4})

