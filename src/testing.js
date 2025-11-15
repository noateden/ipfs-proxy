(async function () {
  const { create } = await import('kubo-rpc-client');
  const client = create({ url: 'http://127.0.0.1:5001' });

  const { cid } = await client.add('Hello World!');

  console.log(cid);
})();
