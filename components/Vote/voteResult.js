import React, { Component, PropTypes } from 'react'
import { Chip, ChipContact, Button  } from 'react-mdl'
import { clone as _clone } from 'lodash'

class VoteResult extends Component {
  constructor(props) {
    super(props)
    this._onVote = this._onVote.bind(this)
    let vote = props.vote,
      sum = 0

    for (var i=0; i<vote.length; i++)
      sum += vote[i].reaction

    this.state = {
      sum: sum,
      vote: props.vote
    }
  }

  _onVote(e) {
    e.preventDefault()
    let { sum, vote } = this.state
    vote.push({
      name: 'Kyle Wang',
      reaction: 1
    })
    this.setState({
      sum: sum+=1,
      vote: vote
    })
  }

  render() {
    let { sum,  vote } = this.state

    return (
      <ul>
        {
          vote.map((v, i) => {
            sum += v.reaction
            return v.reaction ? (
              <li key={`vote-${i}`}>
                <Chip>
                  <ChipContact className={`mdl-color--${v.reaction > 0 ? 'red' : 'teal'} mdl-color-text--white`}>
                    { v.reaction > 0 ? '♥' : 'x' }
                  </ChipContact>
                  {v.name}
                </Chip>
              </li>
            ) : false
          })
        }
        <li>
          SCORE:{sum}
        </li>
        <li>
          <Button raised colored onClick={this._onVote}>Vote for this hotel</Button>
        </li>
      </ul>
    )
  }
}

VoteResult.defaultProps = {
  vote: []
}

VoteResult.propTypes = {
  vote: PropTypes.array
}

export default VoteResult
