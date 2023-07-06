import { Script } from '../Script.js';

class KeyControls extends Script {

    constructor() {
		super();

		this.name = 'Key Controls';
		this.category = 'controls';

        this.source =
`
let speed = 0.05;

let keys = {};
let target = {};

function init() {
	keys = { left: false, right: false, up: false, down: false };
	target = new THREE.Vector3();
	target.copy(this.position);
}

function update(delta, total) {
	if (keys.left) target.x -= speed;
	if (keys.right) target.x += speed;
    if (keys.up) target.y += speed;
	if (keys.down) target.y -= speed;

	this.position.lerp(target, delta * 10);
}

function keydown(event) {
	if (event.key === 'ArrowLeft') keys.left = true;
	if (event.key === 'ArrowRight') keys.right = true;
    if (event.key === 'ArrowUp') keys.up = true;
	if (event.key === 'ArrowDown') keys.down = true;
}

function keyup(event) {
	if (event.key === 'ArrowLeft') keys.left = false;
	if (event.key === 'ArrowRight') keys.right = false;
    if (event.key === 'ArrowUp') keys.up = false;
	if (event.key === 'ArrowDown') keys.down = false;
}
`;

    }

}

export { KeyControls };
