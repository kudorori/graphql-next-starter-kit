import React, {Component} from "react";
import Link from "next/link";
import Head from "next/head";
import Router, { withRouter } from "next/router";
import styled from "styled-components";
import R from "ramda";

class Index extends Component{
  static async getInitialProps (ctx) {
    return {}
  }
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentWillMount() {

  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  componentWillUpdate(nextProps, nextState) {

  }
  componentDidUpdate() {

  }
  render() {
    const {
      className,
      ...props
    } = this.props;

    const {
      ...state
    } = this.state;

    return (
      <div className={className}>
        Index
        
      </div>
    )
  }
}

export default styled(Index)`

`
