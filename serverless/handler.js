const S3 = require("aws-sdk/clients/s3") 
const config = require("./config.json")
const s3 = new S3();

// 작성자가 게시글 작성 도중 나가거나 브라우저를 닫는 경우 임시 폴더 삭제
module.exports.deleteObjects = async (event) => {
  let body = JSON.parse(event.body);
  let userId = body.userId;

  let prefix = `temp/${userId}/`;
  let params = {
    Bucket: config.BUCKET_NAME,
    Prefix: prefix
  };

  try{
    const listObjResponse = await s3.listObjectsV2(params).promise();

    const response = await Promise.all(
      listObjResponse.Contents.map(async (obj) => {
            await s3.deleteObject({
              Bucket: config.BUCKET_NAME,
              Key: obj.Key,
            }).promise();
      })
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(response)
    }

  }catch(err){
    console.log(err);
    return{
      statusCode:500
    }
  }
}

module.exports.moveObjects = async (event) => {
  let body = JSON.parse(event.body);
  let userId = body.userId;
  let postId = body.postId;

  let oldPrefix = `temp/${userId}/`;
  let newPrefix = `posts/${postId}/`;

  let params = {
    Bucket: config.BUCKET_NAME,
    Prefix: oldPrefix
  };

  try {
    const listObjResponse = await s3.listObjectsV2(params).promise();

    const response = await Promise.all(
      listObjResponse.Contents.map(async (obj) => {
            let newKey = obj.Key.replace(oldPrefix, newPrefix);

            await s3.copyObject({
              Bucket: config.BUCKET_NAME,
              CopySource: `/${config.BUCKET_NAME}/${obj.Key}`,
              Key: newKey
            }).promise();

            await s3.deleteObject({
              Bucket: config.BUCKET_NAME,
              Key: obj.Key,
            }).promise();
      })
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(response)
    }

  } catch (error) {
    console.log(error);

    return{
      statueCode:500
    }
  }
  
}


module.exports.generatePresignedUrl = async (event) => {

  try {
    console.log({"event log":event}); 
    
    let body = JSON.parse(event.body); 
    let objectKey = body.objectKey;
    let s3Action = body.s3Action;
    let contentType = body.contentType;
    let expirationTime = 60;

    let params = {
      Bucket: config.BUCKET_NAME,
      Key: objectKey,
      Expires: expirationTime
    }

    if(s3Action === 'putObject'){ 
      params.ContentType = contentType;
      params.Expires = 300;
    }

    const signedUrl = s3.getSignedUrl(s3Action, params);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(signedUrl)
    }

  } catch (error) {
    console.log(error);

    return{
      statueCode:500
    }
  }
};