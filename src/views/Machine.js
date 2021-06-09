import { Component } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import { addMoney, chooseProduct } from '../functions/actions.js'

class Machine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			code: '',
			cart: []
		};
	}
	componentDidMount() {
		console.log('componentDidMount');
	}
	onClickAddCode(digit) {
		console.log('onClickAddCode');
		const { code } = this.state
		digit = digit.toString();
		if (code.length < 4) {
			this.setState({
				code: code.concat(digit)
			});
			if (code.concat(digit).length == 4) {
				this.onClickChooseProductCode(code.concat(digit));
			}
		}
	}
	onClickRemoveCode() {
		console.log('onClickRemoveCode');
		this.setState({
			code: ''
		});
	}
	onClickAddMoney(deposit) {
		console.log('onClickAddMoney');
		const { dispatch } = this.props;
		this.setState({
			message: ''
		});
		dispatch(addMoney(deposit));
	}
	onClickChooseProduct(product) {
		console.log('onClickChooseProduct');
		const { dispatch } = this.props;
		const { cart } = this.state
		this.setState({
			message: ''
		});
		let item = dispatch(chooseProduct(product));
		if (item.product.stock >= 0) {
			let addCart = cart;
			addCart.push({ 'code': item.product.code, 'name': item.product.name, 'image': item.product.image })
			this.setState({
				cart: addCart
			});
		}
	}
	onClickChooseProductCode = function (code) {
		console.log('chooseProductCode');
		const { products, balance } = this.props
		let index = products.findIndex(function (e) {
			return e.code == code;
		});
		if (typeof products[index] !== 'undefined') {
			if (balance < products[index].price) {
				this.setState({
					message: 'Please add more balance'
				});
			} else if (products[index].stock <= 0) {
				this.setState({
					message: 'Item not available'
				});
			} else {
				this.onClickChooseProduct(products[index])
			}
		} else {
			this.setState({
				message: 'Item not available'
			});
		}
		// this.onClickRemoveCode();
	}
	render() {
		const { products, balance } = this.props
		const { message, code, cart } = this.state
		const listItems = products.map((product, key) =>
			<Col key={key} xs="3">
				<div className="machine-item">
					<div class="machine-item-name"><img src={product.image} /></div>
					<div class="machine-item-name">{product.name}</div>
					<div class="machine-item-stock">Stock: {product.stock}</div>
					<div class="machine-item-stock">Code: {product.code}</div>
				</div>
				<Button className={`${balance >= product.price && product.stock > 0 ? "active" : ""}`} disabled={(balance >= product.price && product.stock > 0) ? false : true} onClick={() => this.onClickChooseProduct(product)} >{product.price} ฿</Button>
			</Col>
		)
		const listCartItems = cart.map((item, key) =>
			<Col key={key} xs="3">
				<div className="machine-item">
					<div class="machine-item-name"><img src={item.image} /></div>
					<div class="machine-item-name">{item.name}</div>
				</div>
			</Col>
		)
		return (
			<div>
				<Row className="justify-content-md-center">
					<Col xs md="8">
						<div className="machine-box">
							<div className="machine-top">
								<div className="machine-product">
									<Row>
										{listItems}
									</Row>
								</div>
								<div className="machine-pay">
									<div className="machine-money">{balance} ฿</div>
									<div className="machine-money-add">
										<Row>
											<Col onClick={() => this.onClickAddMoney(5)}>5 ฿</Col>
											<Col onClick={() => this.onClickAddMoney(10)}>10 ฿</Col>
										</Row>
										<Row>
											<Col onClick={() => this.onClickAddMoney(20)}>20 ฿</Col>
											<Col onClick={() => this.onClickAddMoney(100)}>100 ฿</Col>
										</Row>
									</div>
									<div className="machine-money-code">{code}</div>
									<div className="machine-money-code-error">{message}</div>
									<div className="machine-money-digit">
										<Row>
											<Col onClick={() => this.onClickAddCode(1)}>1</Col>
											<Col onClick={() => this.onClickAddCode(2)}>2</Col>
											<Col onClick={() => this.onClickAddCode(3)}>3</Col>
										</Row>
										<Row>
											<Col onClick={() => this.onClickAddCode(4)}>4</Col>
											<Col onClick={() => this.onClickAddCode(5)}>5</Col>
											<Col onClick={() => this.onClickAddCode(6)}>6</Col>
										</Row>
										<Row>
											<Col onClick={() => this.onClickAddCode(7)}>7</Col>
											<Col onClick={() => this.onClickAddCode(8)}>8</Col>
											<Col onClick={() => this.onClickAddCode(9)}>9</Col>
										</Row>
										<Row>
											<Col onClick={() => this.onClickRemoveCode()}>c</Col>
											<Col onClick={() => this.onClickAddCode(0)}>0</Col>
											<Col onClick={() => this.onClickChooseProductCode(code)}>#</Col>
										</Row>
									</div>
								</div>
							</div>
							<div className="machine-center"></div>
							<div className="machine-bottom">
								<div className="machine-cart">
									<Row>
										{listCartItems}
									</Row>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = function (state) {
	return {
		balance: state.balance || 0,
		products: state.stock,
	}
}

const MachineWithConnect = connect(mapStateToProps)(Machine)
export default MachineWithConnect
