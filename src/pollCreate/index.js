/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { request } from 'superagent';
import classNames from 'classnames';
import * as moment from 'moment';
import { Grid, Cell, Button } from 'react-mdl';
import Layout from '../../components/Layout';
import Step1 from '../../components/Step1';
import Step2 from '../../components/Step2';
import s from './styles.css';


// import Step2 from '../../components/Form/Step2';

const MAX_STEPS = 3;

class PollCreatePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      steps: 1,
      stepDetail: [],
      resultUrl: '',
      startDate: '',
      endDate: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleDate = this.handleDate.bind(this);
  }

  handleDate(event) {
    const { name, value } = event.target;
    if (name === 'start_date') {
      this.setState({ startDate: value });
    } else {
      this.setState({ endDate: value });
    }
  }

  handleSubmit(event) {
    //const { title, name, email, startDate, endDate } = this.refs.step1.refs;
    console.log('fire', event.target);
    /*
    request
      .post('/poll')
      .send({
        title: title.value,
        name: name.value,
        email: email.value,
        startDate: startDate.value,
        endDate: endDate.value,
      });
    */
    this.handleNext();
    event.preventDefault();
  }

  handleFinish() {
    window.location = this.resultUrl;
  }

  handleNext(event) {
    const steps = this.state.steps;
    const nextSteps = (steps === MAX_STEPS) ? steps : steps + 1;
    this.setState({ steps: nextSteps });
    if (event) event.preventDefault();
  }

  handlePrev(event) {
    const steps = this.state.steps;
    const prevSteps = (steps === 1) ? steps : steps - 1;
    this.setState({ steps: prevSteps });
    event.preventDefault();
  }

  render() {
    const stepClass = (step) => {
      if (this.state.steps === step) {
        return classNames(s.highlight);
      }
      return null;
    };

    return (
      <Layout>
        <h2>Create A Poll</h2>
        <section id="state">
          <span className={stepClass(1)}>1. General > </span>
          <span className={stepClass(2)}>2. Time Proposals > </span>
          <span className={stepClass(3)}>3. Invite </span>
        </section>
        <form onSubmit={this.handleSubmit}>
          <section id="step-1" ref="step1" style={{ display: this.state.steps === 1 ? 'block' : 'none' }}>
            <Step1 handleDate={this.handleDate} />
          </section>
          <section id="step-2" style={{ display: this.state.steps === 2 ? 'block' : 'none' }}>
            <Step2 startDate={moment(this.state.startDate)} endDate={moment(this.state.endDate)} />
          </section>
          <section id="step-3" style={{ display: this.state.steps === 3 ? 'block' : 'none' }}>
          </section>
          <Grid>
            <Cell col={3}>
              <Button primary onClick={this.handlePrev}>Prev</Button>
            </Cell>
            <Cell col={3}>
              <Button primary onClick={this.handleNext} style={{ display: this.state.steps !== 2 ? 'block' : 'none' }}>Next</Button>
              <Button type="submit" style={{ display: this.state.steps === 2 ? 'block' : 'none' }}>Next</Button>
            </Cell>
            <Cell col={6}></Cell>
          </Grid>
        </form>
      </Layout>
    );
  }

}

export default PollCreatePage;
