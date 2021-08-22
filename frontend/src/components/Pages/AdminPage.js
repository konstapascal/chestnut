import React, { useState, useEffect, useContext, useCallback } from 'react';
import Axios from 'axios';
import { List, Item, Grid, Input, Icon, Message } from 'semantic-ui-react';
import { AuthContext } from '../../context/auth-context';
import DeleteUserModal from '../DeleteUserModal';

const AdminPage = () => {
	const auth = useContext(AuthContext);

	const [loadedUsers, setLoadedUsers] = useState([]);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [search, setSearch] = useState('');
	const [ModalOpen, setModalOpen] = useState(false);

	// Functions for opening/closing modal
	const handleModalOpen = modalID => setModalOpen(modalID);
	const handleModalClose = () => setModalOpen(false);

	const fetchUsers = useCallback(() => {
		Axios.get('http://localhost:8080/users', {
			headers: {
				Authorization: auth.token
			}
		})
			.then(response => {
				setLoadedUsers(response.data.users);
				setFilteredUsers(response.data.users);
			})
			.catch(err => {
				console.log(err.response.data);
			});
	}, [auth.token]);

	// GET all users on render
	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	useEffect(() => {
		loadedUsers &&
			setFilteredUsers(
				loadedUsers.filter(user => user.Username.toLowerCase().includes(search.toLowerCase()))
			);
	}, [search, loadedUsers]);

	// DELETE an user
	const deleteUser = UserID => {
		const deleteUrl = 'http://localhost:8080/users/' + UserID;

		Axios.delete(deleteUrl, {
			headers: {
				Authorization: auth.token
			}
		})
			.then(() => fetchUsers())
			.then(() => handleModalClose())
			.catch(err => {
				console.log(err.response.data);
			});
	};

	return (
		<div style={{ margin: '3rem' }}>
			<h1>Administrator settings</h1>
			<p>Overview of all registered users and possibility to manually delete select users.</p>
			<Grid stackable columns={1}>
				<Grid.Column style={{ width: '40vw', minWidth: '400px' }}>
					<Input
						placeholder='Filter users'
						icon='search'
						onChange={e => setSearch(e.target.value)}
					/>
					<Grid.Row style={{ marginTop: '1.5rem' }}>
						<List
							divided
							relaxed
							style={{
								border: '1px solid #e3e3e3',
								borderRadius: '0.5rem',
								padding: '1rem'
							}}>
							{filteredUsers.length === 0 && (
								<Message>
									<Icon name='user' size='large' />
									{!search
										? 'There are no other registered users.'
										: `No search results for ${search}.`}
								</Message>
							)}
							{filteredUsers.map(item => (
								<List.Item key={item.ID}>
									<List.Icon name='user' size='large' verticalAlign='middle' />
									<Item.Content>
										<List.Header>{item.Username}</List.Header>
										<DeleteUserModal
											handleModalOpen={handleModalOpen}
											handleModalClose={handleModalClose}
											ModalOpen={ModalOpen}
											deleteUser={deleteUser}
											ID={item.ID}
											Username={item.Username}
										/>
										<List.Description>id: {item.ID}</List.Description>
										<List.Description>{item.Email}</List.Description>
									</Item.Content>
								</List.Item>
							))}
						</List>
					</Grid.Row>
				</Grid.Column>
			</Grid>
		</div>
	);
};

export default AdminPage;
