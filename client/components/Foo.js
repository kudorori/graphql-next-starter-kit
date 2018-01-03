import styled from "styled-components";
import R from "ramda";
import Router, { withRouter } from "next/router";
import { graphql, gql } from "react-apollo"

const component = ({
  className,
  children,
  ...props
}) => (
  <div className={className}>

  </div>
)

const styledComponent = styled(component)`

`
export default styledComponent
