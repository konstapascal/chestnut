import React, { useState, useEffect } from 'react';
import { Form } from 'semantic-ui-react';

const Rot13 = () => {
	const [userInput, setUserInput] = useState('');
	const [rotData, setRotData] = useState('');

	// useEffect runs every time userInput changes
	useEffect(() => {
		const newRotData = userInput.replace(/[a-zA-Z]/g, function (char) {
			return String.fromCharCode(
				(char <= 'Z' ? 90 : 122) >= (char = char.charCodeAt(0) + 13)
					? char
					: char - 26
			);
		});
		setRotData(newRotData);
	}, [userInput]);

	return (
		<div style={{ margin: '2.5rem' }}>
			<h3>ROT13</h3>
			<p>Simple conversion of plain text to ROT13 text.</p>
			<Form>
				<Form.TextArea
					placeholder='Write your text here...'
					style={{ minHeight: 100 }}
					onChange={(e) => setUserInput(e.target.value)}
				/>
				<Form.TextArea
					disabled
					placeholder='Cipher appears here...'
					value={rotData}
					style={{ minHeight: 100 }}
				/>
			</Form>
		</div>
	);
};

export default Rot13;
