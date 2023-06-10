const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data'); // npm install --save form-data

(async function() {
	const endpoint = 'http://localhost:9000/upload/file';
	const file = './samples/cat.png';


	const form = new FormData();
	form.append('file', fs.createReadStream(file));

	const response = await axios.post(endpoint, form, {
		headers: {
			...form.getHeaders(),
		}
	})

	console.log(response.data);
})()
