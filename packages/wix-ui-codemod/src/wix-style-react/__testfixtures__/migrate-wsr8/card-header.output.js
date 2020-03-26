import React from 'react';
import { Card } from 'wix-style-react';

const component = () => (
  <Card>
    <Card.Header title="insert divider here" />
    <Card.Divider />
    <Card.Content>touch me</Card.Content>
    <Card.Header title="insert divider here" />
    <Card.Content>Dont touch me</Card.Content>
  </Card>
);
