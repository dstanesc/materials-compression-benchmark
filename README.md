# Material Data Compression Benchmark

Suite of material data compression benchmarks based on the [fake material data](https://github.com/dstanesc/fake-material-data) library.

Currently tested libraries: `brotli`, `pako` and `lz4js`.

## Dependencies

```sh
$ node --version
v16.13.1

$ npm --version
8.1.2
```

## Execute Benchmark

```sh
npm run clean
npm install
npm start
```

## Example Results

Eg. Material w/ 100 properties
```
Material original size 53398 bytes
Material brotli compressed size 6675 bytes, compression rate 87.50 %
Material pako compressed size 6893 bytes, compression rate 87.09 %
Material lz4 compressed size 8288 bytes, compression rate 84.48 %
Brotli x 1,293 ops/sec ±0.46% (94 runs sampled)
Pako x 1,304 ops/sec ±0.52% (91 runs sampled)
Lz4js x 3,311 ops/sec ±0.59% (89 runs sampled)
The fastest option is Lz4js
Material brotli compressed size 5811 bytes, compression rate 89.12 %
Material pako compressed size 6471 bytes, compression rate 87.88 %
Material lz4 compressed size 8288 bytes, compression rate 84.48 %
Brotli x 601 ops/sec ±0.86% (91 runs sampled)
Pako x 730 ops/sec ±0.86% (88 runs sampled)
Lz4js x 3,334 ops/sec ±0.54% (90 runs sampled)
The fastest option is Lz4js
Material brotli compressed size 5192 bytes, compression rate 90.28 %
Material pako compressed size 6339 bytes, compression rate 88.13 %
Material lz4 compressed size 8288 bytes, compression rate 84.48 %
Brotli x 7.05 ops/sec ±1.21% (22 runs sampled)
Pako x 632 ops/sec ±1.49% (87 runs sampled)
Lz4js x 3,253 ops/sec ±2.06% (89 runs sampled)
The fastest option is Lz4js
```

```js
{
  min: {
    bufSize: 53398,
    ops: { brotli: 1293, pako: 1303, lz4js: 3310 },
    rate: { brotli: '87.50', pako: '87.09', lz4js: '84.48' },
    options: { brotli: 1, pako: 1 }
  },
  med: {
    bufSize: 53398,
    ops: { brotli: 601, pako: 729, lz4js: 3334 },
    rate: { brotli: '89.12', pako: '87.88', lz4js: '84.48' },
    options: { brotli: 5, pako: 5 }
  },
  max: {
    bufSize: 53398,
    ops: { brotli: 7, pako: 631, lz4js: 3253 },
    rate: { brotli: '90.28', pako: '88.13', lz4js: '84.48' },
    options: { brotli: 11, pako: 9 }
  }
}
```