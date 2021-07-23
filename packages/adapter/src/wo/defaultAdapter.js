import 'isomorphic-fetch';

export default function FetchAdapter(config) {
  //
  if (!fetch) {
    //
    throw new Error('Global fetch not exist!');
  }
  //
  const { url } = config;

  return fetch(url, config);
}