import React from 'react';
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {API} from 'aws-amplify';
import './Home.css';
import { render } from 'react-dom';

export default function Home() {

    function pullStuff() {
        return API.get("bcadmin", "/bcadmin")
    }

    async function onLoad() {
        try {
            const result = await pullStuff();
            alert(result);
        }
        catch (e) {
            alert(e);
        }
    }

    function renderList() {
        const classList = [
           "item 1",
           "thing",
           "testing"
        ];

        onLoad();

        return [{}].concat(classList).map((className, i) =>
            i !== 0 
            ? 
                <ListGroupItem key={className}>
                    {className}
                </ListGroupItem>
             : 
                <ListGroupItem key="new">
                    <h4>
                        <b>{"empty stuffs"}</b>
                    </h4>
                </ListGroupItem>
            
        );
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>BC Admin</h1>
                <p>test landing for bc admin</p>
            </div>
        )
    }

    function renderClasses() {
        return (
            <div className="classList">
                <ListGroup>
                    {renderList()}
                </ListGroup>
            </div>
        );
    }

    return (
        <div className="Home">
            <div className="landerZone">
                {renderLander()}
            </div>
            <div className="classZone">
                {renderClasses()}
            </div>
        </div>
    );
}