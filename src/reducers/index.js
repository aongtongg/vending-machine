import { bindActionCreators, combineReducers } from 'redux'
import balance from './balance'
import stock from './stock'

export default combineReducers({
	balance,
	stock
})