import React from "react";
import './Header.scss'
import {Link} from "react-router-dom";
import {PATH} from "../../routes/paths";
import { Modal as AntdModal } from "antd";
import {connect} from "react-redux";
import {auth, toggleModal} from "../../store/actions";
import "antd/dist/antd.css"

class Header extends React.Component {

    renderButtons = () => {
        return (
            <div className="header">
                <div>
                    <Link to={PATH.MAIN_PAGE}>
                        Главная
                    </Link>
                </div>
                <div>
                    <Link to={PATH.NEWS_PAGE}>
                        Новости
                    </Link>
                </div>
                <div onClick={this.props.toggleModal}>Вход</div>
            </div>
        )
    };

    onConfirm = () => {
        this.props.auth(
            document.getElementById('Login').value,
            document.getElementById('Password').value
        );
        this.props.toggleModal();
    };

    renderModalContent = () => {
        return(
            <div className="modal_content">
                <div className="modal_content_login">
                    <label className="modal_label">Login:</label>
                    <input
                        id="Login"
                        type="text"
                        name="quantity"
                        placeholder="Логин"
                    />
                </div>
                <div className="modal_content_password">
                    <label>Password:</label>
                    <input
                        id="Password"
                        type="text"
                        name="quantity"
                        placeholder="Пароль"
                    />
                </div>
            </div>
        )
    };

    renderModal = () => {
        return(
            <AntdModal
                cancelText={"Отмена"}
                visible={this.props.isModalShown}
                title="Вход"
                onCancel={this.props.toggleModal}
                onOk={this.onConfirm}
            >
                {this.renderModalContent()}
            </AntdModal>
        )
    };

    render() {
        return (
            <div>
                {this.renderButtons()}
                {this.renderModal()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isModalShown: state.signModal.isModalShown,
        isAuth: state.signModal.isAuth,
        rights: state.signModal.rights
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleModal: () => dispatch(toggleModal()),
        auth: (login, pass) => dispatch(auth(login, pass)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);