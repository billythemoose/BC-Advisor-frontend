import React, {useState, useEffect} from 'react';
import {ListGroup, ListGroupItem, Grid, Row, Col}  from 'react-bootstrap';
import {API, Auth} from 'aws-amplify';
import './Home.css';
import { render } from 'react-dom';
import { Comprehend } from 'aws-sdk/clients/all';
import {useForm} from 'react-hook-form';

export default function Home(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [slugList, setSlugList] = useState([]);
    const [classList, setClassList] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        getClasses(data.Title);
    }

    const listGroupClick = (data, e) => {
        if (selectedClasses.includes(e.target.value)) {
            var udpatedList = selectedClasses.filter(item => item !== e.target.value);
            console.log("Removed");
            console.log(udpatedList);
            setSelectedClasses(udpatedList);
        }
        else {
            var udpatedList = selectedClasses;
            udpatedList.push(e.target.value);
            console.log(udpatedList);
            setSelectedClasses(udpatedList);
        }
    }

    async function getClasses(slug) {
        try {
            const returnedClasses =  await loadClasses(slug);
            returnedClasses.sort(function(itemOne, itemTwo){
                if (itemOne.id > itemTwo.id){
                    return 1
                }
                return -1;
            });

            setClassList(returnedClasses);
            console.log(returnedClasses);
        }
        catch (e){
            console.log(e);
        }
    }


    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            try {
                const returnedSlugs = await loadSlugs();
                returnedSlugs.sort(function(itemOne, itemTwo){
                    if (itemOne.slug > itemTwo.slug){
                        return 1
                    }
                    return -1;
                });
                console.log(returnedSlugs);
                setSlugList(returnedSlugs);
            }
            catch (e) {
                console.log(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);


    function renderClassList() {
        return [{}].concat(classList).map((classes, i) => 
            i !== 0 
            ? (
                <ListGroupItem key={i} onClick={handleSubmit(listGroupClick)} value={classes.id + " " + classes.title} ref={register}>
                    {classes.slug + " " + classes.id +  " " + classes.title +  " " + classes.quarter } 
                </ListGroupItem>
            ) : ( 
                <ListGroupItem>
                    {"Classes for " + classList[0].quarter}
                </ListGroupItem>
            )
        );
    }

    function renderSelectedList() {
        return [{}].concat(selectedClasses).map((classes, i) => 
            i !== 0 
            ? (
                <ListGroupItem key={i} value={classes}>
                    {classes} 
                </ListGroupItem>
            ) : ( 
                <ListGroupItem>
                    {"Classes for " + classList[0].quarter}
                </ListGroupItem>
            )
        );
    }

    function renderSlugList() {
        return [{}].concat(slugList).map((slugs, i) =>
            i !== 0 
            ? (
                <option key={i} value={slugs.slug}>
                    {slugs.slug + " " + slugs.title } 
                </option>
            ) : ( 
                <option>Select a Subject</option>
            )
        );
    }


    function loadClasses(slug) {
        return API.get("bcadmin", `/class/${slug}`, {
            body: slug
        });
    }

    function loadSlugs() {
        return API.get("bcadmin", "/slug")
    }

    function renderLander() {
        return (
            <div className="lander">
                <h1>BC Admin</h1>
                <p>test landing for bc admin</p>
            </div>
        );
    }

    function renderSlugs() {
        return( 
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="Title"  onChange={handleSubmit(onSubmit)} ref={register({ required: true })}>
                    {renderSlugList()}
                </select>
                <input type="submit" />
            </form>
        );
    }

    function renderClasses() {
        return( 
            <form onSubmit={handleSubmit(onSubmit)}>
                <select name="Title"  onChange={handleSubmit(onSubmit)} ref={register({ required: true })}>
                    {renderSlugList()}
                </select>
                <input type="submit" />
            </form>
        );
    }

    return (
        <div className="Home">
            <div className="landerZone">
                {renderLander()}
            </div>
            <div className="slugZone">
                {renderSlugs()}
            </div>
            {classList.length > 0 
            ?
                <div className="classZone">
                    <Grid>
                        <Row>
                            <Col md={6}>{renderClassList()}</Col>
                            <Col md={6}>{renderSelectedList()}</Col>
                        </Row>
                    </Grid>
                </div>
            :
                <div />
            }
        </div>
    );
}