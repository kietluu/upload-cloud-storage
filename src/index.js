

import Google from './google'
import S3 from './s3'

const init = (config) => {

	const { type, ...rest } = config

	switch (type) {

		case 'google': return new Google(rest);

		case 's3': return new S3(rest);

		default:
			return {
				upload: () => {
					return Promise.reject(`Please make sure type is "google" or "s3"`)
				}
			}
	}
}


export default { init }