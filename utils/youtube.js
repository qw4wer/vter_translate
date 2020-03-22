const fs = require('fs');
const ytdl = require('ytdl-core');
// const ffmpeg = require('fluent-ffmpeg');
const stream = require('stream');
const util = require('util');
const finished = util.promisify(stream.finished);
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

const SocksProxyAgent = require('socks-proxy-agent');

const info = {
    host: '192.168.0.1',
    port:1080
};
const agent = new SocksProxyAgent(info);


let i = 0;

// ytdl('https://www.youtube.com/watch?v=DsWoG-xDRmo', {quality:'lowestaudio'}).on('data', (chunk) => {
//   // console.log(JSON.stringify(chunk))
//   // console.log(`Received ${chunk.length} bytes of data.`);
//   var bufferStream = new stream.PassThrough();
// //将Buffer写入
//   bufferStream.end(chunk);
// //进一步使用
//   bufferStream.pipe(fs.createWriteStream(`${__dirname}/${i}.mp3`))
//   finished(bufferStream).then(()=>{
//     i++
//   })
// })
//
//   .pipe(fs.createWriteStream('video.mp3'));

//
ytdl.getInfo('https://www.youtube.com/watch?v=9-FxgGmYMGU', {
    requestOptions: {agent}
}, (err, info) => {
    console.log(JSON.stringify(info))
})
