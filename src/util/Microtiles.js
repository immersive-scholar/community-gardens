import {
	IMMERSION,
	ART_WALL,
	COMMONS,
	VISUALIZATION,
	GAMELAB,
} from 'constants/Constants';

class MicroTiles {
	static tileWidth = window.innerWidth / 4;
	static tileHeight = window.innerHeight / 4;

	static setEnvironment(env) {
		let w, columns, h, rows, h1, h2, body, caption;

		switch (env) {
			case IMMERSION:
				w = 6816;
				columns = 16;
				h = 8618;
				rows = 16;
				h1 = 196;
				h2 = 110;
				body = 50;
				caption = 30;
				break;
			case ART_WALL:
				w = 2304;
				columns = 8;
				h = 5760;
				rows = 15;
				h1 = 275;
				h2 = 150;
				body = 0;
				caption = 0;
				break;
			case COMMONS:
				w = 2400;
				columns = 10;
				h = 2880;
				rows = 9;
				h1 = 275;
				h2 = 225;
				body = 90;
				caption = 60;
				break;
			case VISUALIZATION:
				w = 1518;
				columns = 10;
				h = 3840;
				rows = 9;
				h1 = 225;
				h2 = 150;
				body = 90;
				caption = 60;
				break;
			case GAMELAB:
				w = 4800;
				columns = 10;
				h = 1800;
				rows = 16;
				h1 = 100;
				h2 = 50;
				body = 40;
				caption = 25;
				break;
			default:
				break;
		}

		this.tileWidth = w / columns;
		this.tileHeight = h / rows;
		this.h1 = h1;
		this.h2 = h2;
		this.body = body;
		this.caption = caption;
	}

	static getWidth(count) {
		return `${this.tileWidth * count}`;
	}

	static getHeight(count) {
		return `${this.tileWidth * count}`;
	}
}

export default MicroTiles;
