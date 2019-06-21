/**
 * Used to add fallback scripts to final HTML-file
 */
class ModernBuildPlugin {

    apply(compiler) {
        const pluginName = 'modern-build-plugin';
        const fallbackManifest = require('../../dist/fallback/manifest.json');

        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.htmlWebpackPluginBeforeHtmlGeneration.tapAsync(
                pluginName,
                (data, cb) => {
                    data.plugin.options.fallbackBundle = fallbackManifest['bundle.js'];

                    cb();
                },
            );
        });
    }
}

module.exports = ModernBuildPlugin;
