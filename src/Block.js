import React, {Component} from 'react';
import Form from "./Form";
import Image from "./Image";
import DBManager from "./DBManager";
import plantumlEncoder from "plantuml-encoder";

import './Block.css'

class Block extends Component {
    plantuml_url = "http://plantuml.com/plantuml";

    blockId: number;
    text: string;
    dbManager: DBManager;
    destroyMe: () => null;

    constructor(props) {
        super(props);

        this.state = {
            url: this.urlFromText(props.text),
        };
    }

    render() {
        return (
            <div className="Block">
                <Form
                    onSubmit={text => this.onFormSubmit(text)}
                    blockId={this.props.blockId}
                    dbManager={this.props.dbManager}
                    text={this.props.text}
                    destroy={e => this.destroy(e)}
                />
                <a href={this.state.url} target="_blank">
                    <Image url={this.state.url}/>
                </a>
            </div>
        )
    }

    onFormSubmit(text: string) {
        this.setState({
            url: this.urlFromText(text),
        })
    }

    urlFromText(text) {
        const encoded = plantumlEncoder.encode(text);
        return this.plantuml_url + '/uml/' + encoded;
    }

    destroy(e: Event) {
        e.preventDefault();

        this.props.destroyMe();
    }
}

export default Block;