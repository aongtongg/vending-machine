export default (state = 0, action) => {
	switch (action.type) {
		case 'ADDMONEY':
			return state + action.balance
		case 'CHOOSEPRODUCT':
			return state - action.product.price
		default:
			return state
	}
}