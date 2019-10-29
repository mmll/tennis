class error{
	constructor(info) {
		this.isError = true;
		this.info = info
	}

}

class success{
	constructor(info) {
		this.isError = false;
		this.info = info
	}

}

module.exports = {
	success:success,
	error: error
};
