import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export default  {
  resolve: () => {
    return "123123";
  },
  subscribe: () => {
    return pubsub.asyncIterator("listenUser")
  }
}
