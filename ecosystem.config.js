module.exports = {
  apps: [{
    name: "apidb",
    script: "index.js",
    watch: true,
    // Delay between restart
    watch_delay: 1000,
    ignore_watch : ["node_modules", "logs", "temp", "tmp"],
    watch_options: {
      "followSymlinks": false
    }
  }]
}