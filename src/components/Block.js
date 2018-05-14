import React, { Component } from 'react'
import {
    Card, CardImg
} from 'reactstrap';

class Block extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 1,
            y: 1,
            lightx: 40,
            lighty: -10,
            switch: false
        }

    }
    componentWillMount = () => {
        switch (true) {
            case this.props.index === 0:
                this.setState({ lightx: 88, lighty: -10 })
                break;
            case this.props.index <= 6:
                if (this.props.index === 6) this.setState({ lightx: -10, lighty: -10 });
                this.setState({ x: this.props.index * 100 })
                break;
            case this.props.index > 6 && this.props.index <= 12:
                this.props.index !== 12 ? this.setState({ lightx: -10, lighty: 25 }) : this.setState({ lightx: -10, lighty: 55 });
                this.setState({ x: 600, y: (this.props.index - 6) * 67 })
                break;
            case this.props.index > 12 && this.props.index <= 18:
                this.props.index !== 18 ? this.setState({ lightx: 40, lighty: 55 }) : this.setState({ lightx: 88, lighty: 55 });
                this.setState({ x: 600 - ((this.props.index - 12) * 100), y: 402 })
                break;
            case this.props.index > 18 && this.props.index <= 23:
                this.setState({ lightx: 88, lighty: 25 })
                this.setState({ x: 1, y: 402 - ((this.props.index - 18) * 67) })
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.start === this.props.index) {
            this.setState({ switch: !this.state.switch });
        }
    }
    render() {
        return (
            <div style={{ position: 'absolute', left: this.state.x, top: this.state.y }} >
                <Card style={{ backgroundColor: 'gray', width: '100px', padding: '5px', borderRadius: '0' }}>
                    <CardImg style={{ height: '55px', width: '90px' }} src={this.props.data.img} alt="Card image cap" />
                    <div style={{ width: '20px', position: 'absolute', bottom: `${this.state.lighty}px`, left: `${this.state.lightx}px`, zIndex: '1000' }}>
                        {
                            !this.state.switch ? <img style={{ width: '20px' }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Button_Icon_Red.svg/1000px-Button_Icon_Red.svg.png' alt="red-btn" /> : <img style={{ width: '20px' }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Button_Icon_Green.svg/2000px-Button_Icon_Green.svg.png' alt="green-btn" />
                        }
                    </div>
                </Card>
            </ div>
        );
    }
}

export default Block;