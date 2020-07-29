import React, { useContext } from 'react';
import { appContext } from '../App';
import './css/Error.css';

const ErrorBlock = () => (
	<div className="error-block error-hidden">
		<span className="error"></span>
	</div>
);


export default ErrorBlock;
