const isModern = process.env.BROWSERS === 'modern';

const presets = [
    [
        '@babel/preset-env',
        {
            targets: {esmodules: isModern},
        },
    ],
];

const plugins = [
    "@babel/plugin-transform-runtime",
];

module.exports = { presets, plugins };