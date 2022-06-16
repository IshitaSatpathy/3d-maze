import Game from "../../Game"

export default class FPInput{
    constructor()
    {
        this.game = new Game()
        this.screen = this.game.screen

        // Setup
        this.keys = {

            forward: false,
            backward: false,

            left: false,
            right: false,

            space: false,
            shift: false,

            leftMouse: false,
            rightMouse: false,

            mouseX: 0,
            mouseY: 0,

            mouseX_delta: 0,
            mouseY_delta: 0,

            previous: null,
        }

        document.addEventListener('mouseup', (e) => this.onMouseUp(e))
        document.addEventListener('mousedown', (e) => this.onMouseDown(e))
        document.addEventListener('mousemove', (e) => this.onMouseMove(e))
        document.addEventListener('keydown', (e) => this.onKeyDown(e) )
        document.addEventListener('keyup', (e) => this.onKeyUp(e) )
    }

    onMouseDown(event) {

        switch ( event.button ) {

            case 0:
                this.keys.leftMouse = true
                break
            case 2:
                this.keys.rightMouse = true
                break
        }


    }
        
    onMouseUp(event) {

        switch ( event.button ) {

            case 0:
                this.keys.leftMouse = false
                break
            case 2:
                this.keys.rightMouse = false
                break
        }

    }
        
    onMouseMove(event) {
        this.keys.mouseX = event.clientX - this.screen.width/2
        this.keys.mouseY = event.clientY - this.screen.height/2

        if (this.keys.previous === null) {
            this.keys.previous = {
                mouseX : this.keys.mouseX,
                mouseY : this.keys.mouseY,
            }
          }
      
        this.keys.mouseX_delta = this.keys.mouseX - this.keys.previous.mouseX
        this.keys.mouseY_delta = this.keys.mouseY - this.keys.previous.mouseY

    }
    
    onKeyDown(event) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                this.keys.forward = true
                break

            case 'ArrowDown':
            case 'KeyS':
                this.keys.backward = true
                break

            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = true
                break

            case 'ArrowRight':
            case 'KeyD':
                this.keys.right = true
                break
                
            case 'Space':
                this.keys.space = true
                break
                
            case 'ShiftLeft':
                this.keys.shift = true
                break
        }

    }
    
    onKeyUp(event) {

        switch ( event.code ) {

            case 'ArrowUp':
            case 'KeyW':
                this.keys.forward = false
                break

            case 'ArrowDown':
            case 'KeyS':
                this.keys.backward = false
                break

            case 'ArrowLeft':
            case 'KeyA':
                this.keys.left = false
                break

            case 'ArrowRight':
            case 'KeyD':
                this.keys.right = false
                break
                
            case 'Space':
                this.keys.space = false
                break
                
            case 'ShiftLeft':
                this.keys.shift = false
                break
        }

    }
    
    update()
    {
        if (this.keys.previous !== null) {
          this.keys.mouseX_delta = this.keys.mouseX - this.keys.previous.mouseX
          this.keys.mouseY_delta = this.keys.mouseY - this.keys.previous.mouseY
    
          this.keys.previous = {
              mouseX : this.keys.mouseX,
              mouseY : this.keys.mouseY,
          }
        }
    }
}