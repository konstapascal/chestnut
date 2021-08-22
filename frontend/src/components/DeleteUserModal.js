import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const DeleteUserModal = ({
	handleModalOpen,
	handleModalClose,
	ModalOpen,
	deleteUser,
	ID,
	Username
}) => {
	return (
		<Modal
			trigger={
				<Button
					compact
					negative
					content='Delete user'
					floated='right'
					onClick={() => handleModalOpen(ID)}
				/>
			}
			open={ModalOpen === ID}>
			<Header icon='warning sign' color='red' content='Delete user?' />
			<Modal.Content>
				<p>
					This is a <b>permanent</b> action and will delete both the user and his keys.
				</p>
				<p>
					Are you sure you want to delete <b>{Username}</b>?
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={() => handleModalClose()}>
					<Icon name='remove' />
					Cancel
				</Button>
				<Button color='red' onClick={() => deleteUser(ID)}>
					<Icon name='checkmark' />
					Delete
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteUserModal;
