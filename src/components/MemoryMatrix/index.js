import {Component} from 'react'

import {FaArrowLeft} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import RulesModal from '../RulesModel'

import './index.css'

class MemoryMatrix extends Component {
  state = {
    highlightedIndices: [],
    clickedIndex: null,
    clickedIndices: [],
    array: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    gridSize: 3,
    level: 1,
    results: true,
  }

  componentDidMount() {
    this.getGridButtons()
  }

  getGridButtons = () => {
    const {array, gridSize} = this.state
    const myArray = array.slice(0, gridSize * gridSize)
    const shuffledArray = myArray.sort(() => Math.random() - 0.5)
    const slicedArray = shuffledArray.splice(0, gridSize)

    console.log(slicedArray)

    setTimeout(() => {
      this.setState({highlightedIndices: []})
    }, 3000)
    this.setState({highlightedIndices: slicedArray})

    console.log('New grid buttons:', slicedArray)
  }

  toggleModel = () => {
    this.setState(prevState => ({
      isModelOpen: !prevState.isModelOpen,
    }))
  }

  onClickCell = index => {
    const {highlightedIndices, gridSize, clickedIndices} = this.state

    const isMatch = highlightedIndices.includes(index + 1)

    if (isMatch) {
      console.log('matched')
      this.setState(prevState => ({
        clickedIndices: [...prevState.clickedIndices, index],
        clickedIndex: index,
      }))
      if (clickedIndices.length + 1 === gridSize) {
        this.nextLevel()
      }
    } else {
      console.log('not matched')
      this.setState({clickedIndex: null, clickedIndices: []}, () => {
        setTimeout(() => {
          this.getGridButtons()
        }, 3000)
      })
    }
  }

  nextLevel = () => {
    this.setState(prevState => ({
      level: prevState.leve + 1,
      gridSize: prevState.gridSize + 1,
      clickedIndices: [],
      results: false,
    }))
  }

  render() {
    const {
      highlightedIndices,
      clickedIndex,
      isModelOpen,
      gridSize,
      level,
      results,
    } = this.state
    console.log(highlightedIndices)

    return (
      <div className="memory-matrix-container">
        {results ? (
          <div>
            <div className="game-rules-container">
              <Link to="/memory/matrix" className="link">
                <button type="button" className="back-button">
                  <FaArrowLeft className="icon" />

                  <p className="back">Back</p>
                </button>
              </Link>

              <RulesModal isOpen={isModelOpen} onClose={this.toggleModel} />

              <button
                type="button"
                className="rules-button"
                onClick={this.toggleModel}
              >
                Rules
              </button>
            </div>

            <h1 className="game-heading">Memory Matrix</h1>

            <div className="level-container">
              <p className="level">Level-{level}</p>

              <p className="level">Max Level-00</p>
            </div>

            <div className="cells-card">
              <div className="game-container">
                {Array.from({length: gridSize * gridSize}, (_, index) => {
                  let classNames = 'button'

                  if (highlightedIndices.includes(index + 1)) {
                    classNames += ' highlight'
                  } else if (clickedIndex === index) {
                    classNames += ' clicked'
                  }

                  return (
                    <button
                      key={index}
                      type="button"
                      className={classNames}
                      onClick={() => this.onClickCell(index)}
                    >
                      {_}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="result-container">
            <div className="result-emojis">
              <div>
                <img
                  src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710758045/Neutral_Face_Emoji_smpepd.png"
                  alt="neutral face"
                  className="emoji-levels"
                />
                <img
                  src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757988/Grinmacing_Face_Emoji_f4mh8w.png"
                  alt="grimacing face"
                  className="emoji-levels"
                />
                <img
                  src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757989/Slightly_Smiling_Face_Emoji_gfj7iq.png"
                  alt="slightly smiling face"
                  className="emoji-levels"
                />
                <img
                  src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757985/Smiling_Emoji_with_Eyes_Opened_zauypv.png"
                  alt="grinning face with big eyes"
                  className="emoji-levels"
                />
                <img
                  src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757969/Smiling_With_Closed_Eyes_Emoji_Free_Download_IOS_Emojis_ex34ob.png"
                  alt="grinning face with smiling eyes"
                  className="emoji-levels"
                />
                <img
                  src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710759132/emoticon-2120024_1280_vhvc3h.png"
                  alt="beaming face with smiling eyes"
                  className="emoji-levels"
                />
                <img
                  src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757878/Smile_Emoji_yawgmz.png"
                  alt="grinning face"
                  className="emoji-levels"
                />
                <img
                  src="https://res.cloudinary.com/dlsuy2qn2/image/upload/v1710757928/Sunglasses_Emoji_ycgfk6.png"
                  alt="smiling face with sunglasses"
                  className="emoji-levels"
                />
              </div>
              <hr className="hr" />
              <div className="level-show">
                <p className="levels-at">Level 1</p>
                <p className="levels-at">Level 5</p>
                <p className="levels-at">Level 10</p>
                <p className="levels-at">Level 15</p>
              </div>
              <h1 className="Congratulations">Congratulations!</h1>
              <h1 className="level-heading">You have reached level {level}</h1>
              <Link to="/matrix/game" className="link">
                <button className="start-button" type="button">
                  Start playing
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default MemoryMatrix
