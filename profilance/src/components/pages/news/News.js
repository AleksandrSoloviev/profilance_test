import React from "react";
import {connect} from "react-redux";
import {addNews, deleteNews} from "../../../store/actions";
import "./New.scss"

class News extends React.Component {
    state = {
        search: ""
    };

    onAddSubmit = () => {
        const news = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            data: new Date()
        };
        this.props.addNews(news);
    };

    renderAddNews = () => {
        if(this.props.rights === "none") {
            return null;
        }
        else return(
            <div className="add_news">
                <input
                    id="title"
                    type="text"
                    name="quantity"
                    placeholder="Заголовок"
                    className="add_news_title"
                />
                <input
                    id="description"
                    type="text"
                    name="quantity"
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
    };

    deleteNews = (position) => {
        let news = this.props.news;
        news.splice(position, 1);
        this.props.deleteNews(news);
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
        this.props.deleteNews(news);
        this.renderNews();
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

    onChange = e => {
        this.setState({ search: e.target.value });
    };

    searchInput = () => {
        const { search } = this.state;
        const news = this.props.news;
        if(news){
           const filteredNews = news.filter(item =>
                item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
        }
    };

    renderSearchInput = () => {
        this.searchInput();
        return(
            <>
                <input
                    className="search"
                    placeholder="Поиск..."
                    type="text"
                    onChange={this.onChange}
                />
            </>
        )
    };

    renderNews = () => {
        if(this.props.news) {
            return(
            this.props.news.map((item, key) => {
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
        }


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
        addNews: (data) => dispatch(addNews(data)),
        deleteNews: (data) => dispatch(deleteNews(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(News);