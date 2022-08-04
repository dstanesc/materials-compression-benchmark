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

## Typical Material Results

Eg. Generated material w/ 500 properties
```
Compression and decompression combined size 276303 bytes, brotli {"quality":1} compressed size 24062 bytes, compression rate 91.29 %
Compression and decompression combined size 276303 bytes, pako {"level":1} compressed size 27351 bytes, compression rate 90.10 %
Compression and decompression combined size 276303 bytes, lz4 (default) compressed size 32912 bytes, compression rate 88.09 %
Brotli x 126 ops/sec ±3.95% (67 runs sampled)
Pako x 169 ops/sec ±1.04% (85 runs sampled)
Lz4js x 372 ops/sec ±2.19% (76 runs sampled)
The fastest option is Lz4js

Compression and decompression combined size 276303 bytes, brotli {"quality":5} compressed size 21242 bytes, compression rate 92.31 %
Compression and decompression combined size 276303 bytes, pako {"level":5} compressed size 24807 bytes, compression rate 91.02 %
Compression and decompression combined size 276303 bytes, lz4 (default) compressed size 32912 bytes, compression rate 88.09 %
Brotli x 89.98 ops/sec ±2.09% (66 runs sampled)
Pako x 115 ops/sec ±0.39% (83 runs sampled)
Lz4js x 366 ops/sec ±2.39% (84 runs sampled)
The fastest option is Lz4js

Compression and decompression combined size 276303 bytes, brotli {"quality":11} compressed size 18809 bytes, compression rate 93.19 %
Compression and decompression combined size 276303 bytes, pako {"level":9} compressed size 24145 bytes, compression rate 91.26 %
Compression and decompression combined size 276303 bytes, lz4 (default) compressed size 32912 bytes, compression rate 88.09 %
Brotli x 1.40 ops/sec ±1.67% (8 runs sampled)
Pako x 99.24 ops/sec ±0.47% (73 runs sampled)
Lz4js x 368 ops/sec ±2.26% (75 runs sampled)
The fastest option is Lz4js
```

```js
{
  min: {
    bufSize: 276303,
    ops: { brotli: 126, pako: 168, lz4js: 372 },
    rate: { brotli: '91.29', pako: '90.10', lz4js: '88.09' },
    options: { brotli: 1, pako: 1 }
  },
  med: {
    bufSize: 276303,
    ops: { brotli: 89, pako: 114, lz4js: 365 },
    rate: { brotli: '92.31', pako: '91.02', lz4js: '88.09' },
    options: { brotli: 5, pako: 5 }
  },
  max: {
    bufSize: 276303,
    ops: { brotli: 1, pako: 99, lz4js: 368 },
    rate: { brotli: '93.19', pako: '91.26', lz4js: '88.09' },
    options: { brotli: 11, pako: 9 }
  }
}

```