import React, { Component, PropTypes } from 'react';
import { Grid, Cell, Textfield, Button } from 'react-mdl';

class Step1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <Grid>
          <Cell col={12}>
            <Textfield
              onChange={this.handleChange}
              label="Title"
              name="title"
              ref="title"
              floatingLabel
            />
          </Cell>
          <Cell col={12}>
            <Textfield
              onChange={this.handleChange}
              label="Your Name"
              name="name"
              ref="name"
              floatingLabel
            />
          </Cell>
          <Cell col={12}>
            <Textfield
              onChange={this.handleChange}
              label="E-mail"
              name="email"
              ref="email"
              floatingLabel
            />
          </Cell>
          <Cell col={6}>
            <Textfield
              onChange={this.props.handleDate}
              label="Start Date (2055-12-1)"
              name="start_date"
              ref="startDate"
              floatingLabel
            />
          </Cell>
          <Cell col={6}>
            <Textfield
              onChange={this.props.handleDate}
              label="End Date (2055-12-10)"
              name="end_date"
              ref="endDate"
              floatingLabel
            />
          </Cell>
        </Grid>
      </div>
    );
  }
}

Step1.propTypes = {
  handleDate: React.PropTypes.func,
};

export default Step1;
