class Plane {
	facingDirection = 0;
	originOffset = 0;
	rotationZ = 0;

	constructor() {
		return this;
	}

	setFacingDirection(direction) {
		this.facingDirection = direction;
		return this;
	}

	setOriginOffset(offset) {
		this.originOffset = offset;
		return this;
	}

	setRotationZ(angle) {
		this.rotationZ = angle;
		return this;
	}
}

class WallSystem {
	name;
	plane;
	exterior = {color: {}, surfaces: {}};
	interior = {color: {}, surfaces: {}};
	windows = {};

	constructor(name) {
		this.name = name;
		return this;
	}

	setPlane(plane) {
		this.plane = plane;
		return this;
	}

	setExteriorColor(color) {
		this.exterior.color = color;
		return this;
	}

	setInteriorColor(color) {
		this.interior.color = color;
		return this;
	}

	addExteriorSurface(wall) {
		if (!wall.hasOwnProperty("color")) {wall.color = this.exterior.color;}
		if (!wall.hasOwnProperty("windows")) {wall.windows = [];}
		if (!wall.hasOwnProperty("rotation")) {wall.rotation = {x: 0, y: 0, z: 0};}
		this.exterior.surfaces[wall.name] = wall;
		return this;
	}

	addInteriorSurface(wall) {
		if (!wall.hasOwnProperty("color")) {wall.color = this.interior.color;}
		if (!wall.hasOwnProperty("windows")) {wall.windows = [];}
		if (!wall.hasOwnProperty("rotation")) {wall.rotation = {x: 0, y: 0, z: 0};}
		wall.flip();
		this.interior.surfaces[wall.name] = wall;
		return this;
	}

	addWindow(window) {
		this.windows[window.name] = window;
		return this;
	}
}

class Surface {
	name = "";
	mirror = false;
	constructor(name) {
		this.name = name;
		return this;
	};
	setProperties(properties) {
		Object.assign(this, properties);
		return this;
	};
	flip() {
		this.mirror = !this.mirror;
		return this;
	}
};

class Window {
	name = "";
	size = {};
	offset = {};
	constructor(name) {
		this.name = name;
		return this;
	};
	setSize(size) {
		this.size = size;
		return this;
	};
	//This is the offset from the origin of the plane, not any of the walls.
	setOffset(offset) {//rename to PlaneOriginOffset
		this.offset = offset;
		return this;
	};
};

export { Plane, WallSystem, Surface, Window };
