import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import "./snake.css";

let directions = ["up", "down", "left", "right"];

class Snake extends Component {
  //     static defaultProps = {
  //          renderLines: [25, 20]
  //     }
  constructor(props) {
    super(props);
    this.state = {
      activeGrid: [],
      direction: directions[(Math.random() * 4) | 0],
      initNum: 3,
      foodAxis: [],
      hasEaten: 0,
      showTip: false,
      gameOver: false,
      initialLoop: 1000
    };
    this.timer = null;
  }

  componentWillMount() {
    this.getInitActiveGrid();
    this.generateFoodAxis();
  }

  componentDidMount() {
    this.movingSnake();
    // this.renderFood();
  }

  generateFoodAxis = () => {
    const [vertical, horizon] = this.props.renderLines;
    const { activeGrid } = this.state;
    const hasOccupied = activeGrid.map(item => item[0] * horizon + item[1]);
    const allIndexs = Array.from({ length: vertical }).map((i, item) => {
      return Array.from({ length: horizon }).map(
        (ele, index) => item * horizon + index
      );
    });

    const allNum = allIndexs.reduce((a, b) => a.concat(b), []);
    console.log(allNum, "dddd");
    const canBeFood = allNum.filter(item => !hasOccupied.includes(item));
    const choosedIndex = canBeFood[(canBeFood.length * Math.random()) | 0];
    const verticalIndex = (choosedIndex / horizon) | 0;
    const horizonIndex = choosedIndex % horizon;
    this.setState({ foodAxis: [verticalIndex, horizonIndex] });
  };

  renderFood = () => {
    if (!this.state.foodAxis) return null;
    const [verticalIndex, horizonIndex] = this.state.foodAxis;
    const width = (1 / this.props.renderLines[1]) * document.body.clientWidth;
    const style = {
      position: "absolute",
      width,
      height: width,
      left: horizonIndex * width,
      top: verticalIndex * width,
      zIndex: 10,
      background: "chocolate",
      border: "1px solid yellow"
    };
    return <div style={style} />;
  };

  replayGame = () => {
    this.getInitActiveGrid();
    this.generateFoodAxis();
    this.movingSnake();
    this.setState({ initialLoop: 1000 });
  };

  getInitActiveGrid = () => {
    const { direction, initNum } = this.state;
    console.log(direction, "directiondirectiondirectiondirectiondirection");
    const [vertical, horizon] = this.props.renderLines;
    let activeGrid = [],
      horizonIndex,
      verticalIndex;
    switch (direction) {
      case "up":
        horizonIndex = (Math.random() * horizon) | 0;
        for (let i = 0; i < initNum; i++) {
          activeGrid.push([vertical + i, horizonIndex]);
        }
        break;
      case "down":
        horizonIndex = (Math.random() * horizon) | 0;
        for (let i = 1; i <= initNum; i++) {
          activeGrid.push([-i, horizonIndex]);
        }
        break;
      case "left":
        verticalIndex = (Math.random() * vertical) | 0;
        for (let i = 0; i < initNum; i++) {
          activeGrid.push([verticalIndex, horizon + i]);
        }
        break;
      case "right":
        verticalIndex = (Math.random() * vertical) | 0;
        for (let i = 1; i <= initNum; i++) {
          activeGrid.push([verticalIndex, -i]);
        }
        break;
      default:
        break;
    }
    console.log(activeGrid, "activeGridactiveGridactiveGridactiveGrid");
    this.setState({ activeGrid, gameOver: false });
  };

  movingSnake = () => {
    this.timer = setInterval(() => {
      //   if(this.state.showTip) this.setState({showTip: false})
      let { direction, activeGrid, foodAxis } = this.state;
      let leadGrid = activeGrid[0].slice();
      console.log(leadGrid, "leadGridleadGridleadGridleadGrid");
      switch (direction) {
        case "up":
          leadGrid = [leadGrid[0] - 1, leadGrid[1]];
          break;
        case "down":
          leadGrid = [leadGrid[0] + 1, leadGrid[1]];
          break;
        case "left":
          leadGrid = [leadGrid[0], leadGrid[1] - 1];
          break;
        case "right":
          leadGrid = [leadGrid[0], leadGrid[1] + 1];
          break;
        default:
          break;
      }

      // 检查是否游戏结束
      this.checkFailed(leadGrid);

      if (
        foodAxis.length &&
        JSON.stringify(foodAxis) == JSON.stringify(leadGrid)
      ) {
        activeGrid = [leadGrid, ...activeGrid];

        // 需要在更新完 activeGrid 重新生成food
        const { hasEaten, initialLoop } = this.state;
        this.setState(
          { showTip: true, hasEaten: hasEaten + 1, activeGrid },
          () => {
            this.generateFoodAxis();
            if (this.state.hasEaten % 3 == 0) {
              this.setState({ initialLoop: initialLoop - 100 });
              clearInterval(this.timer);
              this.movingSnake();
            }
          }
        );
        setTimeout(() => {
          this.setState({ showTip: false });
        }, 500);
      } else {
        for (let i = activeGrid.length - 1; i >= 0; i--) {
          if (!i) activeGrid[i] = leadGrid;
          else activeGrid[i] = activeGrid[i - 1];
        }
        this.setState({ activeGrid });
      }
    }, this.state.initialLoop);
  };

  checkFailed = leadGrid => {
    const [vertical, horizon] = this.props.renderLines;
    let { activeGrid } = this.state;
    if (
      leadGrid[0] > vertical - 1 ||
      leadGrid[0] < 0 ||
      leadGrid[1] < 0 ||
      leadGrid[1] > horizon - 1
    ) {
      this.endThisGame();
      return;
    }

    for (let i = 0; i < activeGrid.length - 1; i++) {
      if (leadGrid[0] == activeGrid[i][0] && leadGrid[1] == activeGrid[i][1]) {
        this.endThisGame();
        return;
      }
    }
  };

  endThisGame = () => {
    clearInterval(this.timer);
    this.timer = null;
    this.setState({ gameOver: true, showTip: true });
    setTimeout(() => {
      this.setState({ showTip: false });
    }, 1000);
  };

  changeDirection = e => {
    const { direction } = this.state;
    const newDirection = e.target.getAttribute("class");
    if (direction == "up" && newDirection == "down") return;
    if (direction == "down" && newDirection == "up") return;
    if (direction == "left" && newDirection == "right") return;
    if (direction == "right" && newDirection == "left") return;
    this.setState({ direction: newDirection });
  };

  isActiveGrid = (vertical, horizon) => {
    const { activeGrid } = this.state;
    return (
      activeGrid.length &&
      activeGrid.filter(item => item[0] == vertical && item[1] == horizon)
        .length
    );
  };

  renderContainer = () => {
    //const { activeGrid } = this.state;
    const [vertical, horizon] = this.props.renderLines;
    const width = (1 / horizon) * document.body.clientWidth;
    const style = { width, height: width, border: "1px solid yellow" };

    return Array.from({ length: vertical }).map((item, index) => {
      return Array.from({ length: horizon }).map((ele, order) =>
        this.isActiveGrid(index, order) ? (
          <div
            style={{
              ...style,
              background: "pink",
              border: "1px solid yellow"
            }} />
        ) : (
          <div style={style} />
        )
      );
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          {this.renderContainer()}
          {this.renderFood()}

          <CSSTransition
            in={this.state.showTip}
            classNames="showTip"
            timeout={1300}
            unmountOnExit>
            <div className="tip">{this.state.gameOver ? "GG" : "+1"}</div>
          </CSSTransition>
        </div>

        <div className="button-container">
          <div className="left" onClick={this.changeDirection}>
            左
          </div>
          <div className="up" onClick={this.changeDirection}>
            上
          </div>
          <div className="score">得分 {this.state.hasEaten}</div>
          <div className="right" onClick={this.changeDirection}>
            右
          </div>
          <div className="down" onClick={this.changeDirection}>
            下
          </div>
        </div>
        {this.state.gameOver ? <div onClick={this.replayGame}>重开</div> : null}
      </div>
    );
  }
}

export default Snake;
