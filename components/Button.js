import React from 'react';
import Radium from 'radium';
import color from 'color';

class Button extends React.Component {

	render() {

		var styles = {

			base: {
				color: '#000',
				padding: '.3em .7em',
				border: '0px',
				borderRadius: '4px; color: rgb(255, 255, 255)',
				cursor: 'pointer',
				fontSize: '16px',
				fontWeight: '500',
				background: 'rgb(0, 116, 217)',

				':hover': {
					background: color('#0074d9').lighten(0.2).hexString()
				}
			},

			primary: {
				background: '#0074D9'
			},

			warning: {
				background: '#FF4136'
			}

		}

		return (<button style={[styles.base, styles[this.props.kind]]}>{this.props.children}</button>)
	}

}

Button.propTypes = {
	kind: React.PropTypes.oneOf(['primary', 'warning']).isRequired
};




export default Radium(Button);