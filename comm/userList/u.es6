let $ = require('jquery');

require('./u.less');

let userList={
	show(){
		$("body").append('<div class="userList">userList</div>');
	}
}

  export default userList;