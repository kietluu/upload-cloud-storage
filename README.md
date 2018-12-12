# Upload files to Cloud Storage

### Geting Started
Easy to upload your files to google static

### Installing

```
npm i --save upload-cloud-storage
```
or
```
yarn add upload-cloud-storage
```

### Usage

```
import Storage from 'upload-cloud-storage'
import path from 'path'

const Google = Storage.init({

	type: 'google',
	keyFilename: path.resolve(__dirname, 'gg.json'),
	bucketName: 'your bucket name',
	projectId: 'your project id',',
})

Google.upload('./test.123', {

	deleteSource: true,
	contentType: 'image/jpeg',
	newName: 'test.jpg',
	dest: 'test'

}).then(result => {

	console.log(result) //result contain metadata of file

}).catch(err => console.log(err))

```
### Option fields
| Field | Use | Default | Optional
| --- | --- | --- | ---
| newName | set new file name | same original file name | true
| dest | sub dir in bucket | bucket root | true
| contentType | new content-type for file | same original file type | true
| deleteSource | delete source file on finish uploading | false | true

