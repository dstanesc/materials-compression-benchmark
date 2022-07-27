import Benchmark from 'benchmark'

import {
  simpleMeta,
  simpleMaterialJson,
} from '@dstanesc/fake-material-data'

import { pack } from 'msgpackr';

import * as lz4 from 'lz4js'
import * as pako from 'pako'
import * as brotli from 'brotli'

const rate = (origSize, deflatedSize) => {
  return (((origSize - deflatedSize) / origSize) * 100).toFixed(2);
}

const meta = simpleMeta([4, 500, 100]);

const matData = (args) => {
  const meta = simpleMeta(args);
  const matJson = simpleMaterialJson(meta);
  const buf = pack(matJson);
  const bufSize = buf.byteLength;
  console.log(`Material original size ${bufSize} bytes`);
  return { buf, bufSize }
}

const bench = ({ buf, bufSize }, options) => {
  const serPako = pako.deflate(buf, options.pako);
  const serLz4 = lz4.compress(buf);
  const serBrotli = brotli.compress(buf, options.brotli);

  const serPakoSize = serPako.byteLength;
  const serLz4Size = serLz4.byteLength;
  const serBrotliSize = serBrotli.byteLength;

  const brotliRate = rate(bufSize, serBrotliSize);
  const pakoRate = rate(bufSize, serPakoSize);
  const lz4jsRate = rate(bufSize, serLz4Size);

  console.log(`Material size ${bufSize} bytes, brotli ${JSON.stringify(options.brotli)} compressed size ${serBrotliSize} bytes, compression rate ${brotliRate} %`);
  console.log(`Material size ${bufSize} bytes, pako ${JSON.stringify(options.pako)} compressed size ${serPakoSize} bytes, compression rate ${pakoRate} %`);
  console.log(`Material size ${bufSize} bytes, lz4 (default) compressed size ${serLz4Size} bytes, compression rate ${lz4jsRate} %`);

  const compressSuite = new Benchmark.Suite('Material 300K Compression Suite')

  compressSuite.on('complete', event => {
    const suite = event.currentTarget;
    const fastestOption = suite.filter('fastest').map('name')
    console.log(`The fastest option is ${fastestOption}`)
    console.log()
  })

  let brotliHz;
  let pakoHz;
  let lz4jsHz;

  compressSuite.on('cycle', event => {
    const benchmark = event.target;
    console.log(benchmark.toString());
    switch (benchmark.name) {
      case 'Brotli':
        brotliHz = Math.floor(benchmark.hz);
        break;
      case 'Pako':
        pakoHz = Math.floor(benchmark.hz);
        break;
      case 'Lz4js':
        lz4jsHz = Math.floor(benchmark.hz);
        break;

    }
  });

  compressSuite
    .add('Brotli', async () => {
      brotli.compress(buf, options.brotli);
    })
    .add('Pako', async () => {
      pako.deflate(buf, options.pako);
    })
    .add('Lz4js', async () => {
      lz4.compress(buf);
    })
    .run()

  return { bufSize: bufSize, ops: { brotli: brotliHz, pako: pakoHz, lz4js: lz4jsHz }, rate: { brotli: brotliRate, pako: pakoRate, lz4js: lz4jsRate }, options: { brotli: options.brotli.quality, pako: options.pako.level } }
}

const mat20 = matData([4, 20, 100]); // 20 props ~ 10KB
const mat100 = matData([4, 100, 100]); // 100 props ~ 50KB
const mat500 = matData([4, 500, 100]); // 500 props ~ 250KB
const mat1000 = matData([4, 1000, 100]); // 1000 props ~ 500KB

console.log()

const qualityBench = (matData) => {
  const min = bench(matData, { brotli: { quality: 1 }, pako: { level: 1 } });  // min compression
  const med = bench(matData, { brotli: { quality: 5 }, pako: { level: 5 } });  // medium compression
  const max = bench(matData, { brotli: { quality: 11 }, pako: { level: 9 } }); // max compression
  return { min, med, max }
}

const res20 = qualityBench(mat20);

console.log(res20)

const res100 = qualityBench(mat100);

console.log(res100)

const res500 = qualityBench(mat500);

console.log(res500)

const res1000 = qualityBench(mat1000);

console.log(res1000)
