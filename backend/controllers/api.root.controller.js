// HATEOAS API root
exports.root = (req, res) => {
	const url = req.protocol + '://' + req.headers.host;

	// Return available API endpoints to the public
	res.status(200).json({ status: '200 - OK' }, [
		{
			method: 'POST',
			description: 'Login',
			href: url + '/login'
		},
		{
			method: 'POST',
			description: 'Signup',
			href: url + '/register'
		},
		{
			method: 'POST',
			description: 'Encrypt',
			href: url + '/encrypt'
		},
		{
			method: 'POST',
			description: 'Decrypt',
			href: url + '/decrypt'
		}
	]);
};
