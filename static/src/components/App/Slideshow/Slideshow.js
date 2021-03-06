import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import './Slideshow.css';
import SlideshowHeader from './SlideshowHeader/SlideshowHeader.js';
import SlideshowLikeGroup from './SlideshowLikeGroup/SlideshowLikeGroup.js';

import _ from 'lodash';

class Slideshow extends Component {
    render() {
        return (
            <div className={`row ${this.props.class}`}>
                {!this.props.wikiData && !this.props.loading && this.props.lastQuery &&
                    <div className="col-md-12 slideshowItem">
                        <SlideshowHeader title={`No results found for: "${this.props.lastQuery}"`} />
                    </div>
                }
                {this.props.wikiData && this.props.wikiData.length > 0 &&
                    <div className="col-md-12 slideshowItem">
                        <SlideshowHeader class={this.props.class} title={this.props.title} />
                        {this.props.map}
                        <Carousel interval={false} indicators={false} controls={this.props.wikiData.length > 4 ? true : false} >
                            {
                                _.chunk(_.uniqBy(this.props.wikiData, page => page.title), 4)
                                    .map((chunk, chunkIndex) => {
                                        return (
                                            <Carousel.Item key={chunkIndex}>
                                                <div className="row">
                                                    {
                                                        chunk.map((page, index) => {
                                                            return (
                                                                <div className="col-sm-3" key={index}>
                                                                    <div className="imgWrapper">
                                                                        <a href={"https://en.wikipedia.org/wiki/" + page.title} target="_blank">
                                                                            <img alt={page.title} src={page.thumbnail} />
                                                                        </a>
                                                                    </div>
                                                                    <h5>
                                                                        <b><span>{page.title}</span>{" "}</b>
                                                                        <SlideshowLikeGroup
                                                                        page = {page} />
                                                                    </h5>
                                                                    <h6>Recent Views: {page.pageviews}</h6>
                                                                    <p><i>{page.extract}</i></p>
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </div>
                                            </Carousel.Item>
                                        );
                                    })
                            }
                        </Carousel>
                    </div>
                }
            </div>
        );
    }
}

export default Slideshow;