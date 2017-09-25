import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export default  {
  subscribe: () => pubsub.asyncIterator("listenUser")
}
