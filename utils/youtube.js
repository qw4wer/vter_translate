const fs = require('fs');
const ytdl = require('ytdl-core');
// const ffmpeg = require('fluent-ffmpeg');
const stream = require('stream');
const util = require('util');
const finished = util.promisify(stream.finished);
// TypeScript: import ytdl from 'ytdl-core'; with --esModuleInterop
// TypeScript: import * as ytdl from 'ytdl-core'; with --allowSyntheticDefaultImports
// TypeScript: import ytdl = require('ytdl-core'); with neither of the above

const jsonpath = require('jsonpath');

let m3u8stream = require('m3u8stream');


const SocksProxyAgent = require('socks-proxy-agent');

const info = {
    host: '192.168.0.1',
    port: 1080
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
ytdl.getInfo('https://www.youtube.com/watch?v=9aGg62rdMtc', {
    requestOptions: {agent}
}).then(info => {

    const json = JSON.parse(JSON.stringify(info));

    const m3u8Url = jsonpath.value(json, "$..formats[?(@.qualityLabel=='144p' && @.container=='ts')].url");

    return Promise.resolve(m3u8Url);
}).then(url => {
    const u8stream = m3u8stream(url, {liveBuffer:1000,requestOptions: {agent}});
    // u8stream.on('data', (chunk) => {
    //     const bufferStream = new stream.PassThrough();
    //     bufferStream.end(chunk);
    //     bufferStream.pipe(fs.createWriteStream(`D:\\tmp\\${i}.ts`))
    //     finished(bufferStream).then(() => {
    //         i++
    //     })
    // });

    u8stream.pipe(fs.createWriteStream('D:\\tmp\\videofile.mp4'));

    setTimeout(()=>{
        u8stream.end()
        console.log(100)
    },5000)

})
