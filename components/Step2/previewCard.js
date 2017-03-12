import React, { Component, PropTypes } from 'react';
import { Button, Card, CardText, CardActions, CardTitle, CardMenu, IconButton } from 'react-mdl';
import { classNames } from 'classnames';

class PreviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captionNum: 0,
    };
  }

  render() {
    
    const captionNum = this.state.captionNum;
    const imageUrls = this.props.imageUrls;
    const styles = {
        color: '#fff',
        height: '176px',
        background: `url(${imageUrls[captionNum]}) center / cover`,
      };

    setInterval(() => {
      this.setState({ captionNum: (captionNum >= imageUrls.length - 1) ? 0 : captionNum + 1 });
    }, 2500);


    return (
      <div>
        <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
          <CardTitle style={styles}>Welcome</CardTitle>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Mauris sagittis pellentesque lacus eleifend lacinia...
    </CardText>
          <CardActions border>
            <Button colored>Get Started</Button>
          </CardActions>
          <CardMenu style={{ color: '#fff' }}>
            <IconButton name="share" />
          </CardMenu>
        </Card>
      </div>
    );
  }
}

PreviewCard.propTypes = {
  imageUrls: React.PropTypes.Array,
};

export default PreviewCard;
