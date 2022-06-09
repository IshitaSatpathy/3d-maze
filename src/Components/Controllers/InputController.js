export default class InputController {
    constructor()
    {
        // Setup
        this.keys = {
            forward: false,
            backward: false,
            left: false,
            right: false,
            space: false,
            shift: false,
        }

        document.addEventListener('keydown', (e) => this.onKeyDown(e) )
        document.addEventListener('keyup', (e) => this.onKeyUp(e) )
    }

        onKeyDown(event) {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    this.keys.forward = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.keys.backward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.keys.left = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.keys.right = true;
                    break;
                    
                case 'Space':
                    this.keys.space = true;
                    break;
                    
                case 'ShiftLeft':
                    this.keys.shift = true;
                    break;
            }

        }
        
        onKeyUp(event) {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    this.keys.forward = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.keys.backward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.keys.left = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.keys.right = false;
                    break;
                    
                case 'Space':
                    this.keys.space = false;
                    break;
                    
                case 'ShiftLeft':
                    this.keys.shift = false;
                    break;
            }

        }

    // update()
    // {
    //     if(this.forward)
    //     {
    //         this.object.animation.actions.current.play('walk')
    //         this.object.model.position.z += 0.02
    //     }
    //     if(this.backward)
    //         this.object.model.position.z -= 0.02
    // }
}