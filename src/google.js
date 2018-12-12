
import { Storage } from '@google-cloud/storage'
import mime from 'mime-types'
import fs from 'fs'
import 'babel-polyfill'

class GoogleStorage {

	config = null
	storage = null
	bucket = null

	constructor(config) {

		this.config = config
		this.init()
	}

	init () {

		const { projectId, keyFilename, bucketName } = this.config

		this.storage = new Storage({
			projectId,
			keyFilename
		})

		this.bucket = this.storage.bucket(bucketName)
	}

	exist = (filepath) => {

		return fs.existsSync(filepath)
	}

	upload = (filepath, opt) => {

		return new Promise((resolve, reject) => {

			if (!this.exist(filepath)) return reject(`"${filepath}" does not exist`);

			let { dest, newName, deleteSource, contentType, gzip = true } = opt || {}

			if (!dest)
				dest = ''

			if (!newName)
				newName = this.getName(filepath)

			if (!contentType)
				contentType = mime.lookup(filepath)

			const destFileName = `${dest}/${newName}`.replace(/\/+/g, '/')

			const writeStreamOpts = {
				gzip,
				metadata: {
					contentType
				}
			}

			const writeStream = this.createWriteStream(destFileName, writeStreamOpts)

			const readStream = this.createReadStream(filepath)

			readStream.pipe(writeStream)
			writeStream.on('finish', async () => {

				if (deleteSource) {
					fs.unlink(filepath, err => {
						if (err) console.log(err)
					});
				}

				const [metadata] = await this.file.getMetadata()
				resolve(metadata)
			})
			.on('error', (err) => {

				reject(err)
			})
		})
	}

	createReadStream = filepath => fs.createReadStream(filepath)

	createWriteStream (dest, opt) {

		this.file = this.bucket.file(dest)

		return this.file.createWriteStream(opt)
	}

	getName = (filepath) => {

		return filepath.split('/').pop()
	}

}

export default GoogleStorage

