import PreloadStore from "preload-store";

export default {
  name: "banner",
  after: "message-bus",

  initialize(container) {
    const banner = Ember.Object.create(PreloadStore.get("banner")),
      site = container.lookup("site:main");

    site.set("banner", banner);

    const messageBus = container.lookup("message-bus:main");
    if (!messageBus) {
      return;
    }

    messageBus.subscribe("/site/banner", function(ban) {
      site.set("banner", Ember.Object.create(ban));
    });
  }
};
