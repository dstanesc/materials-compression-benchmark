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

Eg. Generated material w/ 100 properties
```
Material size 302731 bytes, brotli {"quality":1} compressed size 24219 bytes, compression rate 92.00 %
Material size 302731 bytes, pako {"level":1} compressed size 28606 bytes, compression rate 90.55 %
Material size 302731 bytes, lz4 (default) compressed size 33300 bytes, compression rate 89.00 %
Brotli x 330 ops/sec ±0.31% (92 runs sampled)
Pako x 231 ops/sec ±0.82% (84 runs sampled)
Lz4js x 740 ops/sec ±0.56% (90 runs sampled)
The fastest option is Lz4js

Material size 302731 bytes, brotli {"quality":5} compressed size 21571 bytes, compression rate 92.87 %
Material size 302731 bytes, pako {"level":5} compressed size 25201 bytes, compression rate 91.68 %
Material size 302731 bytes, lz4 (default) compressed size 33300 bytes, compression rate 89.00 %
Brotli x 140 ops/sec ±0.30% (80 runs sampled)
Pako x 138 ops/sec ±0.43% (78 runs sampled)
Lz4js x 746 ops/sec ±0.41% (93 runs sampled)
The fastest option is Lz4js

Material size 302731 bytes, brotli {"quality":11} compressed size 18925 bytes, compression rate 93.75 %
Material size 302731 bytes, pako {"level":9} compressed size 24399 bytes, compression rate 91.94 %
Material size 302731 bytes, lz4 (default) compressed size 33300 bytes, compression rate 89.00 %
Brotli x 1.93 ops/sec ±2.98% (9 runs sampled)
Pako x 116 ops/sec ±1.06% (73 runs sampled)
Lz4js x 734 ops/sec ±0.97% (91 runs sampled)
The fastest option is Lz4js
```

```js
{
  min: {
    bufSize: 302731,
    ops: { brotli: 330, pako: 231, lz4js: 740 },
    rate: { brotli: '92.00', pako: '90.55', lz4js: '89.00' },
    options: { brotli: 1, pako: 1 }
  },
  med: {
    bufSize: 302731,
    ops: { brotli: 140, pako: 138, lz4js: 746 },
    rate: { brotli: '92.87', pako: '91.68', lz4js: '89.00' },
    options: { brotli: 5, pako: 5 }
  },
  max: {
    bufSize: 302731,
    ops: { brotli: 1, pako: 115, lz4js: 734 },
    rate: { brotli: '93.75', pako: '91.94', lz4js: '89.00' },
    options: { brotli: 11, pako: 9 }
  }
}
```