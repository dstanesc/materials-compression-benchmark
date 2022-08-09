import * as fs from 'fs'

export function color(lib) {
    let color = 'red';
    switch (lib) {
        case 'Brotli':
            color = 'rgb(49,130,189)';
            break;
        case 'Pako':
            color = 'rgb(204,204,204)';
            break;
        case 'Lz4':
            color = 'rgb(142,124,195)';
            break;
    }
    return color;
}

export function traceCode({ lib, values }) {
    const trace = {
        x: ['Final Size (bytes)', 'Rate (%)', 'Ops/sec (Hz)'],
        y: values,
        type: 'bar',
        text: values.map(String),
        textposition: 'auto',
        hoverinfo: 'none',
        name: lib,
        marker: {
            color: color(lib),
            opacity: 0.5,
        }
    };
    return JSON.stringify(trace, null, 2);
}

export function layoutCode(title) {
    const layout = {
        title: title,
        xaxis: {
            tickangle: -45
        },
        yaxis: {
            type: 'log',
            autorange: true
        },
        barmode: 'group'
    };
    return JSON.stringify(layout, null, 2);
}

export function pageCode(title, traces) {
    let html = `<head><script src='https://cdn.plot.ly/plotly-2.12.1.min.js'></script></head>`;
    html += '\n';
    html += '<body>';
    html += '\n';
    html += `<div id='plotDiv'></div>`
    html += '\n';
    html += '<script>';
    html += '\n';
    for (let index = 0; index < traces.length; index++) {
        const trace = traces[index];
        html += `trace_${index} = ${traceCode(trace)}`;
        html += `\n`;
    }
    html += '\n';
    html += `const data = [`;
    for (let index = 0; index < traces.length; index++) {
        html += `trace_${index}`;
        if (index < traces.length - 1)
            html += ', '
    }
    html += ']';
    html += '\n';
    html += `const layout = ${layoutCode(title)}`;
    html += '\n';
    html += `Plotly.newPlot('plotDiv', data, layout);`;
    html += '\n';
    html += '</script>';
    html += '</body>';
    return html;
}

export function transpose(partialResult) {
    const transposed = [
        {
            lib: 'Brotli', values: [
                //partialResult.initial,
                partialResult.compressed.brotli,
                partialResult.rate.brotli,
                partialResult.ops.brotli
            ]
        },
        {
            lib: 'Pako', values: [
                //partialResult.initial,
                partialResult.compressed.pako,
                partialResult.rate.pako,
                partialResult.ops.pako
            ]
        },
        {
            lib: 'Lz4', values: [
                //partialResult.initial,
                partialResult.compressed.lz4js,
                partialResult.rate.lz4js,
                partialResult.ops.lz4js
            ]
        }
    ];

    return transposed;
}

function plotSection(prefix, suffix, partialResult) {
    const html = pageCode(`${prefix} Compression${suffix} ${partialResult.initial} bytes`, transpose(partialResult));
    toFile(`build/${prefix}-Compression${suffix}-${partialResult.initial}.html`, html);
    return html;
}


export function plot(suffix, benchResult) {
    plotSection(`Minimum`, suffix, benchResult.min);
    plotSection(`Medium`, suffix, benchResult.med);
    plotSection(`Maximum`, suffix, benchResult.max);
}

export function toFile(fileName, content) {
    try {
        if (!fs.existsSync(`build`)) {
            fs.mkdirSync(`build`);
        }
        fs.writeFileSync(fileName, content);
    } catch (err) {
        console.error(err);
    }
}

