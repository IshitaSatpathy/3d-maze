export default class InputController {
    constructor()
    {
        this.inputs = {

            forward : false,
            backward : false,
            left : false,
            right : false,
            space : false,
            shift : false,
        }
        
        document.addEventListener( 'keydown', this.onKeyDown )
        document.addEventListener( 'keyup', this.onKeyUp )

        onKeyUp = ( event ) => {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    this.inputs.forward = true;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.inputs.backward = true;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.inputs.left = true;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.inputs.right = true;
                    break;
                    
                case 'Space':
                    this.inputs.space = true;
                    break;
                    
                case 'ShiftLeft':
                this.inputs.shift = true;
                break;
            }

        }
        
        onKeyUp = ( event ) => {

            switch ( event.code ) {

                case 'ArrowUp':
                case 'KeyW':
                    this.inputs.forward = false;
                    break;

                case 'ArrowDown':
                case 'KeyS':
                    this.inputs.backward = false;
                    break;

                case 'ArrowLeft':
                case 'KeyA':
                    this.inputs.left = false;
                    break;

                case 'ArrowRight':
                case 'KeyD':
                    this.inputs.right = false;
                    break;
                    
                case 'Space':
                    this.inputs.space = false;
                    break;
                    
                case 'ShiftLeft':
                this.inputs.shift = false;
                break;
            }

        }

    }
}