import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getblockdata } from '../actions/block';
import { updatepoint } from '../actions/point';
import { setlist } from '../actions/list';
import _ from 'lodash';
import Block from '../components/Block';
import List from '../components/List';
import {
    Card, CardBody, Button
} from 'reactstrap';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockdata: [],
            point: 500,
            switch: false,
            bingo: 0,
        };
        this.clear = this.clear.bind(this);
        this.start = this.start.bind(this);
    }

    componentWillMount = () => {
        this.props.getdata();
    }

    componentWillReceiveProps = (nextProps) => {
        if ((nextProps.blockdata.length !== this.state.blockdata.length) || (!_.isEqual(nextProps.blockdata, this.state.blockdata))) {
            this.setState({ blockdata: nextProps.blockdata })
            console.log(_.uniqBy(nextProps.blockdata, 'type'));
            this.props.setlist(_.uniqBy(nextProps.blockdata, 'type').length);
        } else if (nextProps.point !== this.state.point) {
            this.setState({ point: nextProps.point })
        }
    }
    clear() {
        this.props.setlist(_.uniqBy(this.state.blockdata, 'type').length);
    }
    start() {
        let correct = false;
        let cost = 0;
        let price = [100, 40, 30, 20, 20, 15, 10, 5, 1];
        this.props.list.forEach((element, index) => {
            if (element !== 0) {
                correct = true;
                cost += price[index] * parseInt(element, 10);
            }
        });
        if (correct) {
            if (this.props.point - cost >= 0) {
                this.props.updatepoint(this.props.point - cost);
                let key = Math.floor((Math.random() * 24));
                this.setState({ bingo: key });

                for (let x = 0; x < 5; x++) {
                    let finishtime = [0, 2500, 5100, 7300, 10500];
                    setTimeout(() => {
                        for (let index = 0; index < 24; index++) {
                            if (x === 3) {
                                setTimeout(() => {
                                    this.setState({ switch: index });
                                }, (100 * index) + (100 * (index + 5)));
                                setTimeout(() => {
                                    this.setState({ switch: index });
                                }, (105 * index) + (100 * (index + 5)));
                                finishtime = 105 * index + 100 * index;
                            }
                            else if (x === 4) {
                                setTimeout(() => {
                                    this.setState({ switch: index });
                                }, (100 * index) + (400 * (index + 5)));
                                setTimeout(() => {
                                    if (key === index) {
                                        console.log('finish');
                                        if (this.props.list[this.state.blockdata[key].type] !== 0) {
                                            let gift = this.props.list[this.state.blockdata[key].type] * this.state.blockdata[key].point;
                                            alert(`恭喜中獎，獲得${gift}點數`);
                                            this.props.updatepoint(gift + this.props.point);
                                            this.setState({ switch: index });
                                        }
                                    } else {
                                        this.setState({ switch: index });
                                    }
                                }, (125 * index) + (400 * (index + 5)));
                                if (key === index) {
                                    break;
                                }
                            } else {
                                setTimeout(() => {
                                    this.setState({ switch: index });
                                }, 100 * (index + 5));
                                setTimeout(() => {
                                    this.setState({ switch: index });
                                }, 105 * (index + 5));
                                finishtime = 105 * index;
                            }
                        }
                    }, finishtime[x]);
                }
            } else {
                alert('點數不足');
            }
        } else {
            alert('你沒有下注');
        }

    }
    render() {
        return (
            <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'orange' }}>
                <div>
                    {
                        _.map(this.state.blockdata, (data, index) => (
                            <Block key={index} index={index} data={data} start={this.state.switch} />
                        ))
                    }
                </div>
                <div style={{ position: 'absolute', top: '480px' }}>
                    {
                        _.map(_.sortBy(_.uniqBy(this.state.blockdata, 'type'), ['type']), (data, index) => (
                            <List key={index} index={index} data={data} />
                        ))
                    }
                    <div style={{ float: 'left' }}>
                        <Card style={{ backgroundColor: 'gray', borderColor: 'black', borderWidth: '5px', width: '120px', height: '179px', margin: '5px' }}>
                            <CardBody style={{ textAlign: 'center' }}><Button color='primary' onClick={this.start}>開始</Button></CardBody>
                            <CardBody style={{ textAlign: 'center' }}><Button color='primary' onClick={this.clear}>清除</Button></CardBody>
                        </Card>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '440px', left: '720px', color: 'white', fontSize: '20px' }}>
                    剩餘點數：{this.state.point} 點
                </div>
                <div style={{ position: 'absolute', top: '400px', left: '720px', color: 'white', fontSize: '20px' }}>
                    中獎號碼：{this.state.bingo}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        blockdata: state.blockdata,
        point: state.point,
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getdata: () => {
            dispatch(getblockdata());
        },
        setlist: (data) => {
            dispatch(setlist(data));
        },
        updatepoint: (data) => {
            dispatch(updatepoint(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);