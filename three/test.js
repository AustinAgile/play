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
	interiorHorizontal = {color: {}, surfaces: {}};
	windows = {};

	constructor(name) {
		this.name = name;
		return this;
	}

	setPlane(plane) {
		this.plane = plane;
		return this;
	}

	setExteriorMaterial(material) {
		this.exterior.color = material;
		return this;
	}

	setInteriorMaterial(material) {
		this.interior.color = material;
		return this;
	}
	setInteriorHorizontalMaterial(material) {
		this.interiorHorizontal.color = material;
		return this;
	}

	addExteriorSurface(wall) {
		if (!wall.hasOwnProperty("color")) {wall.color = this.exterior.color;}
		// if (!wall.hasOwnProperty("windows")) {wall.windows = new Windows();}
		if (!wall.hasOwnProperty("rotation")) {wall.rotation = {x: 0, y: 0, z: 0};}
		this.exterior.surfaces[wall.name] = wall;
		return this;
	}

	addInteriorSurface(wall) {
		if (!wall.hasOwnProperty("color")) {wall.color = this.interior.color;}
		// if (!wall.hasOwnProperty("windows")) {wall.windows = new Windows();}
		if (!wall.hasOwnProperty("rotation")) {wall.rotation = {x: 0, y: 0, z: 0};}
		wall.flip();
		this.interior.surfaces[wall.name] = wall;
		return this;
	}

	addInteriorHorizontalSurface(floor) {
		// if (!floor.hasOwnProperty("color")) {floor.color = this.interiorHorizontal.color;}
		// if (!floor.hasOwnProperty("windows")) {floor.windows = new Windows();}
		if (!floor.hasOwnProperty("rotation")) {floor.rotation = {x: 0, y: 0, z: 0};}
		this.interior.surfaces[floor.name] = floor;
		return this;
	}
	addHorizontalSurface(floor) {
		if (!floor.hasOwnProperty("rotation")) {floor.rotation = {x: -90, y: 0, z: 0};}
		this.interior.surfaces[floor.name] = floor;
		return this;
	}

	addWindow(window) {
		this.windows[window.name] = window;
		return this;
	}
}

class Surface {
	name = "";
	size = {w:0, h:0, dw:0};
	offset = {x:0, y:0, z:0, dx:0, dy:0, dz:0};
	mirror = false;
	constructor(name) {
		this.name = name;
		return this;
	};
	setProperties(properties) {
		_.merge(this, properties);
		return this;
	};
	setSize(size) {
		this.size = _.merge({w:0, h:0, dw:0}, size);
		return this;
	}
	setOffset(offset) {
		this.offset = _.merge({x:0, y:0, z:0, dx:0, dy:0, dz:0}, offset);
		return this;
	}
	setRotation(rotation) {
		this.rotation = rotation;
		return this;
	}
	setWindows(windows) {
		this.windows = windows;
		return this;
	}
	setOn(on) {
		this.on = on;
		return this;
	}
	setOn(on) {
		this.on = on;
		return this;
	}
	setBevel(bevel) {
		this.bevel = bevel;
		return this;
	}
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

class Windows {
	wallSystem;
	names = [];
	jambs = [];
	constructor(names) {
		this.wallSystem = false;
		if (!names) {names = [];}
		return this.setNames(names);
	};
	setNames(names) {
		this.names = names;
		return this;
	};
	setWallSystem(wallSystem) {
		this.wallSystem = wallSystem;
		return this;
	};
	setJambsAll() {
		this.jambs = this.names;
		return this;
	};
};

export { Plane, WallSystem, Surface, Window, Windows };
