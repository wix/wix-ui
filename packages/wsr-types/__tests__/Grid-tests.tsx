import * as React from 'react';

import {
  Container,
  RawContainer,
  Columns,
  Columns as Row,
  AutoAdjustedColumns,
  AutoAdjustedColumns as AutoAdjustedRow,
  Col
} from 'wix-style-react/Grid';

function GridWithMandatoryProps() {
  return (
    <RawContainer>
      <Container>
        <Row>
          <Col />
        </Row>
        <AutoAdjustedRow>
          <Col />
        </AutoAdjustedRow>
      </Container>
    </RawContainer>
  );
}

function GridWithAllProps() {
  return (
    <RawContainer className="cls" fluid stretchVertically>
      <Container className="cls" fluid stretchVertically>
        <Row className="cls" rtl stretchViewsVertically dataHook="hook">
          <Col
            className="cls"
            dataHook="hook"
            lg="10"
            md="10"
            rtl
            sm="10"
            span="10"
            xl="10"
            xs="10" />
        </Row>
        <Columns className="cls" rtl stretchViewsVertically dataHook="hook">
          <Col
            className="cls"
            dataHook="hook"
            lg="10"
            md="10"
            rtl
            sm="10"
            span="10"
            xl="10"
            xs="10" />
        </Columns>
        <AutoAdjustedRow>
          <Col />
        </AutoAdjustedRow>
        <AutoAdjustedColumns>
          <Col />
        </AutoAdjustedColumns>
      </Container>
    </RawContainer>
  );
}
