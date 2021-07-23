import 'isomorphic-fetch';

const consume = (res,config)=>{
  let size = 0;
  const {onProgress} = config;
  const clone = res.clone();
  const reader = res.body.getReader();
  //
  return new Promise((resolve,reject)=>{

    const pump = () => {
      //
      reader.read()
        .then((result)=>{
          //
          const {done,value} = result;
          const byteLength = value && value.byteLength || 0;
          //
          onProgress && onProgress({
            done,
            value,
            byteLength,
            size,
            res:result,
            req:config
          });
          //
          if(done){
            //
            return resolve(clone);
          }

          size += byteLength;

          pump();
        })
        .catch(reject);
    };

    pump();
  });
};


export default function FetchUploadAdapter(config) {
  //
  if (!fetch) {
    //
    throw new Error('Global fetch not exist!');
  }
  //
  const { url,onProgress } = config;

  return fetch(url, config).then((res)=>{
    //
    if(!onProgress){

      return res;
    }
    //
    return consume(res,config);
  });
}