export default (state = 0, action) => {
	if (!state) {
		state = [
			{ 'code': 1001, 'name': 'Jam', 'price': 20, 'stock': 12, 'image': './images/png/001-jam.png' },
			{ 'code': 1002, 'name': 'Pizza', 'price': 30, 'stock': 8, 'image': './images/png/002-pizza.png' },
			{ 'code': 1003, 'name': 'Egg', 'price': 5, 'stock': 20, 'image': './images/png/003-eggs.png' },
			{ 'code': 1004, 'name': 'Lemon', 'price': 10, 'stock': 19, 'image': './images/png/010-lemon.png' },
			{ 'code': 1005, 'name': 'Cheese', 'price': 15, 'stock': 30, 'image': './images/png/046-cheese.png' },
		];
	}
	switch (action.type) {
		case 'ADDMONEY':
			return state
		case 'CHOOSEPRODUCT':
			let index = state.findIndex(function (e) {
				return e.code == action.product.code;
			});
			if (typeof state[index] !== 'undefined') {
				state[index].stock--;
			}
			return state
		default:
			return state
	}
}