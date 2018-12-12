

const Storage = require('./dist').default
const path = require('path')

const Google = Storage.init({

	type: 'google',
	keyFilename: path.resolve(__dirname, 'gg.json'),
	bucketName: 'your bucket name',
	projectId: 'your project id',',
})


Google.upload('./test.123', {

	deleteSource: true,
	contentType: 'image/jpeg',
	newName: 'hieu.jpg',
	dest: 'test'

}).then(result => {

	console.log(result)

}).catch(err => console.log(err))