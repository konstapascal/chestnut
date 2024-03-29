import React, { useState, useEffect, useContext, useCallback } from 'react';
import Axios from 'axios';
import { Menu, List, Tab, Icon, Message } from 'semantic-ui-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import KeysWarningTooltip from './Tooltips/KeysWarningTooltip';

import { AuthContext } from '../context/auth-context';
import { SelectedKeyContext } from '../context/selected-key-context';
import DeleteKeyModal from './DeleteKeyModal';

const MyKeysList = ({ refreshKeys }) => {
	const auth = useContext(AuthContext);
	const { selectedKey, setSelectedKey } = useContext(SelectedKeyContext);

	const [loadedKeys, setLoadedKeys] = useState([]);
	const [loadedPublicKeys, setLoadedPublicKeys] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	// eslint-disable-next-line no-unused-vars
	const [activeKey, setActiveKey] = useState(selectedKey.Name);

	const getUrl = 'http://localhost:8080/keys/users/me';
	const location = useLocation();

	const handleDeleteModalOpen = modalID => setModalOpen(modalID);
	const handleDeleteModalClose = () => setModalOpen(false);
	const handleActiveKey = (ID, Name, publicKey, privateKey = '') => {
		setActiveKey(ID);
		setSelectedKey({
			ID: ID,
			Name: Name,
			PublicKey: publicKey,
			PrivateKey: privateKey
		});
	};

	const fetchMyKeys = useCallback(() => {
		Axios.get(getUrl, {
			headers: {
				Authorization: auth.token
			}
		})
			.then(response => {
				setLoadedKeys(response.data.keypairs);
			})
			.catch(err => {
				setLoadedKeys([]);
				console.log(err.response.data);
			});
	}, [auth.token]);

	useEffect(() => {
		// GET all my keys request
		fetchMyKeys();
	}, [fetchMyKeys, refreshKeys]);

	// Get saved public keys from localstorage
	useEffect(() => {
		const storageKeys = JSON.parse(localStorage.getItem('addedPublicKeys'));

		if (storageKeys === null) {
			// Make new local storage field if there isn't one
			return localStorage.setItem('addedPublicKeys', JSON.stringify([]));
		} else {
			// If there is local storage data, add it to state
			setLoadedPublicKeys(storageKeys);
		}
	}, []);

	// DELETE a key request
	const deleteKey = (KeypairID, KeypairName) => {
		const deleteUrl = 'http://localhost:8080/keys/' + KeypairID;

		// If the key being deleted is already selected by the user, unselect it.
		if (KeypairName === selectedKey.Name) {
			setSelectedKey({
				PublicKey: '',
				PrivateKey: '',
				Name: ''
			});
		}

		Axios.delete(deleteUrl, {
			headers: {
				Authorization: auth.token
			}
		})
			.then(() => fetchMyKeys())
			.catch(err => {
				console.log(err.response.data);
			});
	};

	// Remove public key from list and local storage
	const removePublicKey = (KeypairID, KeypairName) => {
		// If the public key being removed is already selected, unselect it.
		if (KeypairName === selectedKey.Name) {
			setSelectedKey({
				PublicKey: '',
				PrivateKey: '',
				Name: ''
			});
		}

		const newLoadedPublicKeys = loadedPublicKeys.filter(key => key.ID !== KeypairID);

		setLoadedPublicKeys(newLoadedPublicKeys);
		localStorage.setItem('addedPublicKeys', JSON.stringify(newLoadedPublicKeys));
	};

	const listPanes = [
		{
			menuItem: <Menu.Item>My Keypairs</Menu.Item>,
			render: () => (
				<Tab.Pane>
					<List divided relaxed>
						{loadedKeys.length === 0 && (
							<Message style={{ textAlign: 'center' }}>
								<Icon name='key' size='large' verticalalign='middle' />
								No keypairs.
								{location.pathname === '/' && (
									<span>
										{' '}
										Click{' '}
										<Link onClick={() => setSelectedKey('')} to='/keys'>
											here
										</Link>{' '}
										to make one.
									</span>
								)}
							</Message>
						)}
						{loadedKeys.map(item => (
							<List.Item
								key={item.KeypairID}
								style={
									selectedKey.ID === item.KeypairID
										? {
												background: '#c4edcd',
												padding: '.5rem',
												cursor: 'pointer',
												borderRadius: '.5rem'
										  }
										: {
												padding: '.5rem',
												cursor: 'pointer'
										  }
								}>
								<List.Icon name='key' size='large' verticalalign='middle' />
								<List.Content
									onClick={() =>
										handleActiveKey(
											item.KeypairID,
											item.Name,
											item.PublicKey,
											item.PrivateKey
										)
									}>
									<List.Header>{item.Name}</List.Header>
									<List.Description>Length: {item.Length}</List.Description>
									<List.Description>
										Created: {moment(item.createdAt).local().format('DD MMM YYYY, HH:mm')}
									</List.Description>
								</List.Content>
								{location.pathname === '/keys' && (
									<DeleteKeyModal
										handleDeleteModalOpen={handleDeleteModalOpen}
										handleDeleteModalClose={handleDeleteModalClose}
										deleteKey={deleteKey}
										KeypairID={item.KeypairID}
										Name={item.Name}
										modalOpen={modalOpen}
									/>
								)}
							</List.Item>
						))}
						{loadedKeys.length !== 0 && location.pathname === '/' && (
							<Message style={{ textAlign: 'center' }}>
								Click{' '}
								<Link onClick={() => setSelectedKey('')} to='/keys'>
									here
								</Link>{' '}
								to create more keys.
							</Message>
						)}
					</List>
				</Tab.Pane>
			)
		},
		{
			menuItem: (
				<Menu.Item>
					<span>Imported Keys</span>
					<KeysWarningTooltip />
				</Menu.Item>
			),
			render: () => (
				<Tab.Pane>
					<List divided relaxed>
						{loadedPublicKeys.length === 0 && (
							<Message style={{ textAlign: 'center' }}>
								<Icon name='key' size='large' verticalAlign='middle' />
								Click <Link to='/users'>here</Link> to add public keys.
							</Message>
						)}
						{loadedPublicKeys.map(key => (
							<List.Item
								key={key.ID}
								style={
									selectedKey.ID === key.ID
										? {
												background: '#c4edcd',
												padding: '.5rem',
												cursor: 'pointer',
												borderRadius: '.5rem'
										  }
										: {
												padding: '.5rem',
												cursor: 'pointer'
										  }
								}>
								<List.Icon name='key' size='large' verticalAlign='middle' />
								<List.Content
									onClick={() => handleActiveKey(key.ID, key.keyName, key.publicKey)}>
									<List.Header>{key.keyName}</List.Header>
									<List.Description>
										Owner: <b>{key.keyOwner}</b>
									</List.Description>
									<List.Description>Length: {key.keyLength}</List.Description>
								</List.Content>
								{location.pathname === '/keys' && (
									<List.Icon
										name='trash alternate outline'
										size='large'
										floated='right'
										verticalAlign='middle'
										negative
										onClick={() => removePublicKey(key.ID, key.keyName)}
									/>
								)}
							</List.Item>
						))}
						{loadedPublicKeys.length !== 0 && (
							<Message style={{ textAlign: 'center' }}>
								Click <Link to='/users'>here</Link> to add more public keys.
							</Message>
						)}
					</List>
				</Tab.Pane>
			)
		}
	];

	return (
		<Tab
			panes={listPanes}
			defaultActiveIndex={selectedKey.PublicKey && !selectedKey.PrivateKey ? 1 : 0}
		/>
	);
};

export default MyKeysList;
