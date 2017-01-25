import React, { Component, PropTypes } from 'react';
import './App.css';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

export default class BulletChart extends Component {


renderRange(ranges){
    let x=0;
    let rects = [];
    let height = 25;
    ranges = ranges.sort(function(a, b){return b-a});
    this.max = Math.max(...ranges);
    ranges.forEach((range,index) => {
      let className = 'range s'+index;
      rects.push(<rect key={index} className={className} width={this.calculateRatio(this.max,range)} height={height} x={x} />);
    });
    return rects;
  }

  calculateRatio(max, val){
    return (val * (800))/max;
  }

  renderMeasure(measure){
    let x=0,y=8.3,height=8.3,rects=[];
    measure = measure.sort(function(a, b){return b-a});
    measure.forEach((measure,index) => {
      let className = 'measure s'+index;
      rects.push(<rect key={index} className={className} width={this.calculateRatio(this.max,measure)} height={height} x={x} y={y}/>);
    });
    return rects;
  }

  renderMarker(marker){
    let y1=4.16, y2=20.83;
    let markerText = this.calculateRatio(this.max,marker);
    return <line className="marker" x1={markerText} x2={markerText} y1={y1} y2={y2} />;
  }

  xpoints(range){
      let numArrays = [0];
      let maxRange = range, maxSequence = 6;
      let startRange;
      function sequence(arg1, counter) {
        if (numArrays.length === maxSequence || maxSequence > 10) {
          numArrays.push(maxRange);
          return;
        }
        if (numArrays.length === 1) {
          startRange = Math.floor(arg1 / maxSequence);
        }
        counter++;
        numArrays.push(startRange * counter);
        sequence(startRange * counter, counter);
      }
      sequence(maxRange,0);
      return numArrays;
}

  renderTick(datum){
    let lineY1=25, y=29.16,x=0, y1=0;
    let point = this.xpoints(Math.max.apply(null,datum.ranges));
    let g=[];
    point.forEach((xpoint, index) => {
      let translate = 'translate('+x+','+y1+')';
      g.push(<g key={index} transform={translate} className='tick'><line y1={lineY1} y2={y} /><text textAnchor='middle' dy='1em' y={y}>{xpoint}</text> </g>);
      x += 133;
    });

    return g;

  }

  renderTitle(datum, index){
let titles;
let  x=-6,y=12.5;

let translate = 'translate('+x+','+y+')';

      titles = <g key={index} style={{textAnchor:'end'}} transform={translate} >
            <text className="title">{datum.title}</text>
            <text className="subtitle" dy="1em">{datum.subtitle}</text>
          </g>;
     x += 50;
     return titles;
  }

  renderGroup(){
    const {orientation} = this.props;
    console.log("orientation :"+orientation);

    let groupElements = [];
    let  x=120,y=5;
    if(orientation === VERTICAL){
       y= 850;
    }
    this.props.data.forEach((datum, index) => {
      let translate = 'translate('+x+','+y+')';
      if(orientation === VERTICAL){
        translate = translate.concat(' rotate(-90)');
      }
      groupElements.push(<g key={index} transform={translate}>
        {this.renderRange(datum.ranges)}
        {this.renderMeasure(datum.measures)}
        {this.renderMarker(datum.markers)}
        {this.renderTick(datum)}
        {this.renderTitle(datum, index)}
        </g>);
        if(orientation === VERTICAL){
          x += 50;
        }else{
          y += 50;
        }

    });
    return groupElements;
  }

  render() {
    let group = this.renderGroup();
    return (
      <div>
        <h3>{this.props.label}</h3>
        <svg viewBox="0 0 1500 1000" className='bullet'>
          {group}
        </svg>
</div>
    );
  }
};



BulletChart.defaultProps = {
  orientation : HORIZONTAL
};

BulletChart.propTypes = {
  label: PropTypes.string,
  orientation: PropTypes.oneOf([HORIZONTAL, VERTICAL])
};
