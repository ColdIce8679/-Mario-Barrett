import React, { Component } from 'react'
import {
    Card, CardImg, CardTitle, Input, InputGroup, InputGroupAddon
} from 'reactstrap';
import { updatelist } from '../actions/list';
import { connect } from 'react-redux';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            costpoint: 0,
            list: []
        }
        this.handle = this.handle.bind(this);
    }

    componentWillMount = () => {
        this.setState({ list: this.props.list })
    }

    handle(event) {
        if (event.target.value <= 0) {
            event.target.value = 0;
            this.props.updatelist(this.props.index, 0);
        } else {
            this.props.updatelist(this.props.index, event.target.value);
        }
    }

    render() {
        return (
            <div style={{ float: 'left', margin: '5px' }}>
                <Card style={{ backgroundColor: 'gray', borderColor: 'black', borderWidth: '5px', width: '120px', padding: '5px' }}>
                    <CardTitle style={{ color: 'white', textAlign: 'center' }}>{this.props.data.point}</CardTitle>
                    <CardImg style={{ height: '70px', width: '100px', marginBottom: '15px', }} src={this.props.data.img} alt="Card image cap" />
                    <InputGroup>
                        <InputGroupAddon style={{ fontSize: '5px' }} addonType="prepend">$</InputGroupAddon>
                        <Input style={{ fontSize: '5px' }} placeholder="數量" type="number" step="1" onChange={this.handle} value={this.props.list[this.props.index]}/>
                    </InputGroup>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updatelist: (key, data) => {
            dispatch(updatelist(key, data));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(List)