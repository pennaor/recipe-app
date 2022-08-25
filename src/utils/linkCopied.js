import copy from 'clipboard-copy';

const linkCopied = async (url, setState) => {
  await copy(`http://localhost:3000${url}`);
  setState(true);
  if (typeof url === 'string') {
    const copyTime = 1000;
    setTimeout(() => {
      setState(false);
    }, copyTime);
  }
};

export default linkCopied;
