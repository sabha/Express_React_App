import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
const TableExampleSimple = ({users}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>ID</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Email</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
      {
        users.map((user) => {
          return (
            <TableRow>
              <TableRowColumn>{user._id}</TableRowColumn>
              <TableRowColumn>{user.name}</TableRowColumn>
              <TableRowColumn>{(user.email) ? user.email : "" }</TableRowColumn>
            </TableRow>
          )
        })
      }
    </TableBody>
  </Table>
);

export default TableExampleSimple;
