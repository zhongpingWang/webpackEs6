let $ = require('jquery');

require('./at.less');

let At={
	show(){
		$("body").append('<div class="at">at</div>');
	}
}

export default At;