import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from '../hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators';
import Input from './FormElements/Input';

import { Form, Message, Segment, Icon } from 'semantic-ui-react';

const Signup = ({ componentSwap }) => {
	const [errorMessage, setError] = useState('');
	const [statusMessage, setStatus] = useState('');

	const [formState, inputHandler] = useForm(
		{
			username: {
				value: '',
				isValid: false
			},
			email: {
				value: '',
				isValid: false
			},
			password: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const authSubmitHandler = event => {
		event.preventDefault();
		axios
			.post('http://localhost:8080/signup', {
				username: formState.inputs.username.value,
				email: formState.inputs.email.value,
				password: formState.inputs.password.value
			})
			.then(response => {
				setStatus(response.data.message);
				setError('');
			})
			.catch(err => {
				setError(err.response.data.message);
				setStatus('');
			});
	};

	return (
		<div
			style={{
				textAlign: 'center',
				maxWidth: '400px',
				minWidth: '400px',
				margin: 'auto'
			}}>
			<Segment>
				<h3 style={{ textAlign: 'center' }}>Create an account</h3>
				<hr />
				<Form onSubmit={authSubmitHandler}>
					<Form.Field>
						<Input
							iconPosition='left'
							element='input'
							id='username'
							type='text'
							label='Username'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a username.'
							onInput={inputHandler}
							placeholder='Username'
						/>
					</Form.Field>
					<Form.Field>
						<Input
							element='input'
							id='email'
							type='email'
							label='E-mail'
							validators={[VALIDATOR_EMAIL()]}
							errorText='Please enter a valid email address.'
							onInput={inputHandler}
							placeholder='E-mail'
						/>
					</Form.Field>
					<Form.Field>
						<Input
							element='input'
							id='password'
							type='password'
							label='Password'
							validators={[VALIDATOR_MINLENGTH(5)]}
							errorText='Please enter a valid password, at least 5 characters.'
							onInput={inputHandler}
							placeholder='Password'
						/>
					</Form.Field>
					<Form.Button
						type='submit'
						disabled={!formState.isValid}
						style={{ backgroundColor: '#14872f' }}>
						<p style={{ color: '#FFF' }}>Sign up</p>
					</Form.Button>
					{errorMessage && (
						<Message error visible>
							<Icon color='red' name='times' size='large' />
							{errorMessage}
						</Message>
					)}
					{statusMessage && (
						<Message positive visible>
							<Icon color='green' name='checkmark' size='large' />
							{statusMessage}
						</Message>
					)}
					<Message>
						Already have an account?
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href='#' onClick={componentSwap}>
							{' '}
							Login
						</a>
					</Message>
				</Form>
			</Segment>
		</div>
	);
};

export default Signup;
