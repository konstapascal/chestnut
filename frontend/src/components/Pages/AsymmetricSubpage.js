import React, { useContext } from 'react';
import { Tab, Message } from 'semantic-ui-react';
import RsaEncryption from '../RsaEncryption';
import RsaDecryption from '../RsaDecryption';
import RsaSigning from '../RsaSigning';
import RsaVerifying from '../RsaVerifying';

import { SelectedKeyContext } from '../../context/selected-key-context';

const AsymmetricSubpage = () => {
	const { selectedKey } = useContext(SelectedKeyContext);

	const AsymmetricOptions = [
		{
			menuItem: 'RSA Encryption',
			render: () => (
				<Tab.Pane>
					{!selectedKey.PublicKey ? (
						<Message
							warning
							style={{
								margin: '1.5rem',
								padding: '1.5rem',
								textAlign: 'center',
							}}
						>
							<h3>No valid key!</h3>
							<p>
								Select a valid <b>public key</b> from the list on the left to
								encrypt using RSA.
							</p>
						</Message>
					) : (
						<RsaEncryption />
					)}
				</Tab.Pane>
			),
		},
		{
			menuItem: 'RSA Decryption',
			render: () => (
				<Tab.Pane>
					{!selectedKey.PrivateKey ? (
						<Message
							warning
							style={{
								margin: '1.5rem',
								padding: '1.5rem',
								textAlign: 'center',
							}}
						>
							<h3>No valid key!</h3>
							<p>
								Select a valid <b>private key</b> from the list on the left to
								decrypt using RSA.
							</p>
						</Message>
					) : (
						<RsaDecryption />
					)}
				</Tab.Pane>
			),
		},
		{
			menuItem: 'RSA Signing',
			render: () => (
				<Tab.Pane>
					{!selectedKey.PrivateKey ? (
						<Message
							warning
							style={{
								margin: '1.5rem',
								padding: '1.5rem',
								textAlign: 'center',
							}}
						>
							<h3>No valid key!</h3>
							<p>
								Select a valid <b>private key</b> from the list on the left to
								sign using RSA.
							</p>
						</Message>
					) : (
						<RsaSigning />
					)}
				</Tab.Pane>
			),
		},
		{
			menuItem: 'RSA Verifying',
			render: () => (
				<Tab.Pane>
					{!selectedKey.PublicKey ? (
						<Message
							warning
							style={{
								margin: '1.5rem',
								padding: '1.5rem',
								textAlign: 'center',
							}}
						>
							<h3>No valid key!</h3>
							<p>
								Select a valid <b>public key</b> from the list on the left to
								verify using RSA.
							</p>
						</Message>
					) : (
						<RsaVerifying />
					)}
				</Tab.Pane>
			),
		},
	];

	return <Tab panes={AsymmetricOptions} />;
};

export default AsymmetricSubpage;