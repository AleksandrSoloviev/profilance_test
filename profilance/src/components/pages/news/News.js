import React from "react";
import {connect} from "react-redux";
import {updateNews} from "../../../store/actions";
import "./New.scss"

function searchingFor(term) {
    return function (x) {
        if(x.title) {
            return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
        }
    }
}

class News extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            term: ""
        };

        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event) {
        this.setState({term: event.target.value});

    }

    onAddSubmit = () => {
        const news = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            data: new Date()
        };
        this.props.updateNews(news);
        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
    };

    renderAddNews = () => {
        if(this.props.rights === "user") {
            return(
                <div className="add_news">
                    <input
                        id="title"
                        type="text"
                        name="quantity"
                        placeholder="Заголовок"
                        className="add_news_title"
                    />
                    <textarea
                        id="description"
                        name="quantity"
                        aria-multiline={"true"}
                        placeholder="Новость"
                        className="add_news_description"
                    />
                    <button
                        onClick={this.onAddSubmit}
                        className="add_news_btn"
                    >
                        Добавить
                    </button>
                </div>
            )
        }
        else return null;
    };

    deleteNews = (position) => {
        let news = this.props.news;
        news.splice(position, 1);
        this.props.updateNews(news);
        this.renderNews();
    };

    approveNews = (item, position) => {
        const {title, description, data} = item;
        const news = {
            title: title,
            description: description,
            data: data,
            approve: true
        };
        this.deleteNews(position);
        this.props.updateNews(news);

    };

    renderControlButton = (position, item) => {
        return(
            <>
                <button
                    onClick={()=>this.deleteNews(position)}
                    className="control_btn"
                >
                    Удалить
                </button>
                {!item.approve ?
                        <button
                    onClick={()=>this.approveNews(item,position)}
                    className="control_btn"
                >
                    Одобрить
                </button> : null}
            </>
        )
    };

    renderSearchInput = () => {
        return(
            <>
                <input
                    className="search"
                    placeholder="Поиск..."
                    type="text"
                    onChange={this.searchHandler}
                />
            </>
        )
    };

    renderNews = () => {
        if(this.props.rights === "none") {
            return(
                this.props.news.filter(searchingFor(this.state.term)).map((item, key) => {
                    if(item.approve) {
                        return (
                            <div key={key} className="news">
                                <div className="news_title">{item.title}</div>
                                <div className="news_description">{item.description}</div>
                                <div>{item.data.toString()}</div>
                            </div>
                        )
                    }
                    return null;
                })
            )
        }
        else return (

            this.props.news.filter(searchingFor(this.state.term)).map((item, key) => {
                if (item.title) {
                    return (
                        <div key={key} className="news">
                            <div className="news_title">{item.title}</div>
                            <div className="news_description">{item.description}</div>
                            <div>{item.data.toString()}</div>
                            {this.props.rights === "admin" ? this.renderControlButton(key, item) : null}
                        </div>
                    )
                }
                return null;
            })
        )
    };

    render() {
        return (
            <div>
                {this.renderSearchInput()}
                {this.renderAddNews()}
                {this.renderNews()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: state.signModal.isAuth,
        news: state.news.news,
        rights: state.signModal.rights,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateNews: (data) => dispatch(updateNews(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);