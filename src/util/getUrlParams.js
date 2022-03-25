// 获取url中'?'符后的参数
export function getUrlParams() {
  const url = window.location.search;
  const query= {};
  if (url.indexOf('?') !== -1) {
    const str = url.substr(1);
    const strs = str.split('&');
    for (let i = 0; i < strs.length; i++) {
      query[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1]);
    }
  }

  const hash = window.location.hash;
  if (hash.indexOf('?') !== -1) {
    const hashStr = hash.substr(hash.indexOf('?') + 1, hash.length);
    const hashArr = hashStr.split('&');
    for (let i = 0; i < hashArr.length; i++) {
      query[hashArr[i].split('=')[0]] = decodeURI(hashArr[i].split('=')[1]);
    }
  }
  return query;
}
