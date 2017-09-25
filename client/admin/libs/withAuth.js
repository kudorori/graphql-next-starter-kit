/**
 *  HOC components
 *  withAuth Method
 *
 */

import React, {Component} from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import getProfile from "gql/me/profile";
import { apolloClient } from "libs/withData";
import R from "ramda";

export const redirect = (ctx, url) => {
  if (!process.browser && ctx.res) {
    ctx.res.writeHead(303, { Location: url })
    ctx.res.end()
  } else {
    Router.replace(url)
  }
}

export default ({
  query = {},
  error = (err, ctx) => redirect(ctx, "/"),
  profilePath = ["auth", "profile"]
}) => ComposedComponent => class withAuth extends Component{
  static async getInitialProps (ctx) {
    const url = !process.browser ? ctx.req.url : ctx.pathname;
    let props = {};
    let profile = {};
    let isLogged = true;
    if(ComposedComponent.getInitialProps != undefined) {
      props = await ComposedComponent.getInitialProps(ctx);
    }
    try {
      if(!process.browser) {
        const { user } = ctx.req;
        if(!user) {
          throw "Server: Don't Permission"
        }
        profile = user;
      } else {
        const result = await apolloClient.query({
          query,
          fetchPolicy:"network-only"
        });
        profile = R.path(profilePath, result);
      }
    } catch ( err ){
      isLogged = false;
      error(err, ctx);
    }
    return {
      ...props,
      profile,
      isLogged
    }
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <ComposedComponent
        {...this.props}
      ></ComposedComponent>
    )
  }
}
