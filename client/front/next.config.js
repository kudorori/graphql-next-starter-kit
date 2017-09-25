import { root } from "../../config";
module.exports = {
  webpack: (webpack) => {
    console.log(webpack.context);
    webpack.context = webpack.context+"/../"
    return webpack;
  },
  babel: (config) => {
    console.log(config);
    return config;
  }
}
