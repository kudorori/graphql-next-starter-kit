const dev = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'pre-production';
module.exports = {
  distDir: dev ? ".next" : ".build"
}
