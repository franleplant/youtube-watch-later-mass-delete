import OptionsSync from "webext-options-sync";

// Docs https://github.com/fregante/webext-options-sync
export default new OptionsSync({
  defaults: {
    defaultVideosToDelete: 100,
  },
  migrations: [OptionsSync.migrations.removeUnused],
  logging: true,
});
