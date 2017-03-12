import React, { Component, PropTypes } from 'react';
import { Button, Card, CardText, CardActions, CardTitle, CardMenu, IconButton } from 'react-mdl';
import { classNames } from 'classnames';

class PreviewCard extends Component {
  constructor(props) {
    super(props);
    this.intervalId = 0;
    this.state = {
      captionNum: 0,
      imageUrls: this.props.imageUrls,
    };
    this.changeImageUrl = this.changeImageUrl.bind(this);
    this.goToUrl = this.goToUrl.bind(this);
  }

  componentDidMount() {
    const intervalId = setInterval(this.changeImageUrl, 3500);

    this.intervalId = intervalId;
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.intervalId);
  }

  changeImageUrl() {
    const imageUrls = this.props.imageUrls;
    const captionNum = this.state.captionNum;

    this.setState({ captionNum: (captionNum >= imageUrls.length - 1) ? 0 : captionNum + 1 });
  }

  goToUrl(event) {
    console.log(this.props);
    window.open(this.props.info.url, '_blank');
    event.preventDefault();
  }

  render() {
    const captionNum = this.state.captionNum;
    const imageUrls = this.props.imageUrls;
    const styles = {
      color: '#fff',
      height: '176px',
      background: `url(${imageUrls[captionNum]}) center / cover`,
      transition: 'background .8s',
    };

    const { name, address } = this.props.info;

    return (
      <div style={this.props.style}>
        <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
          <CardTitle style={styles}>{name}</CardTitle>
          <CardText>
            <p>address: {address}</p>
          </CardText>
          <CardMenu style={{ color: '#fff' }}>
            <IconButton type="button" name="share" onClick={this.goToUrl} />
          </CardMenu>
        </Card>
      </div>
    );
  }
}

PreviewCard.propTypes = {
  imageUrls: React.PropTypes.array,
  info: React.PropTypes.object,
  style: React.PropTypes.object
};

export default PreviewCard;
