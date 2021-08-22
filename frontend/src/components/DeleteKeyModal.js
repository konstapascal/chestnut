import React from 'react';
import { Button, Header, Icon, List, Modal } from 'semantic-ui-react';

const DeleteKeyModal = ({
	handleDeleteModalOpen,
	handleDeleteModalClose,
	deleteKey,
	KeypairID,
	Name,
	modalOpen
}) => {
	return (
		<Modal
			trigger={
				<List.Icon
					name='trash alternate outline'
					size='large'
					floated='right'
					verticalAlign='middle'
					negative
					onClick={() => handleDeleteModalOpen(KeypairID)}
				/>
			}
			size='tiny'
			open={modalOpen === KeypairID}
			onClose={handleDeleteModalClose}
			closeIcon>
			<Header icon='warning sign' color='red' content='Delete key?' />
			<Modal.Content>
				<p>
					Are you sure you want to delete <b>{Name}</b>?
				</p>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={() => handleDeleteModalClose()}>
					<Icon name='remove' /> Cancel
				</Button>
				<Button color='red' onClick={() => deleteKey(KeypairID, Name)}>
					<Icon name='checkmark' />
					Delete
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default DeleteKeyModal;
