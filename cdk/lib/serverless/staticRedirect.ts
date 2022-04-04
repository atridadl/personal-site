const path = require('path');

exports.main = (evt:any, ctx:any, cb:any) => {
  const {request} = evt.Records[0].cf

  if (!path.extname(request.uri)) {
      request.uri = '/index.html'
  }

  cb(null, request)
}